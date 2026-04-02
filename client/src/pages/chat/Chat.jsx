
import ChatLayout from '@/components/chat-layout'
import MessageForm from '@/components/message-form'
import React, { useEffect, useState, useContext, useRef, useId } from 'react'
import { useParams } from 'react-router-dom'
import { SocketContext } from '@/context/SocketProvider'
import { AuthContext } from '@/context/AuthProvider'
import axios from 'axios'
import { OnlineUserContext } from '@/context/OnlineUserProvider'

const Chat = ({children }) => {
  const socket = useContext(SocketContext)
  const {userData, setUserData} = useContext(AuthContext)
  const {currentOnlineUser} = useContext(OnlineUserContext)

  const [message, setMessage] = useState([])
  const [latestMessage, setLatestMessage] = useState()
  const [groupMessage, setGroupMessage] = useState({})
  const [typing, isTyping] = useState(false)

  const { userId } = useParams()
  const chatEndRef = useRef(null)
  useEffect(() => {
    if(socket) {
      fetchMessages(userId)
      socket.on('private message', (data) => {
        setMessage(prev => {
          if (prev.some(msg => msg._id === data._id)) return prev
          return [...prev, data]
        })
      })
    }
  }, [socket, userData, userId])

  const sendMessage = (sendMessage) => {

    socket.emit('private message',{content: sendMessage, to: userId, from: userData._id})
  }

  const showStatus = (msg) => {
    if(!latestMessage || !Object.keys(latestMessage).length ) return false
    return msg._id === latestMessage._id && msg.senderId === userData._id
  }

  const fetchMessages = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/chat/${userId}`, {
        withCredentials: true
      })
      setMessage(res.data.messages)
      if(res.data.result.modifiedCount > 0) {
        socket.emit("read receipt", res.data.messages[res.data.messages.length - 1])
      }
      }catch(error) {
        console.log(error)
      }
    }

  useEffect(() => {
    if(!message || message.length === 0 ) return
    // if(!userData || userData.length === 0) return 

    /*if the current user is the reciever of the this message 
      call the messageStatus event listener
    */
    const recentMessage = message[message.length - 1]
    
    if(userData._id === recentMessage.receiverId && recentMessage.isSeen !== 'seen' && recentMessage.senderId === userId) {
      socket.emit('messageStatus', message[message.length - 1]);
    }


    chatEndRef.current?.scrollIntoView({behavior: "smooth"})
    setLatestMessage(message[message.length - 1])
    if(message.length){
      socket.on("read receipt", (data) => {
        if(message[message.length - 1]._id === data._id) {
          setMessage(prev => {
            const lastIndex = prev.length - 1
            const lstMsg = prev[lastIndex]

            const newMessages = [...prev]
            newMessages[lastIndex] = {...lstMsg, isSeen: "seen"}

            return newMessages
          })
        }
      })
    }
    message.filter(msg => 
      (msg.senderIdv === userId && msg.receiverId === userData?._id) ||
      (msg.senderId === userData?._id && msg.receiverId === userId)
    ).map(msg => {
      const dayKey =  new Date(msg.createdAt).toDateString
      setGroupMessage(prev => {
        const newGourp  = {...prev}

        if(!newGourp[dayKey]) newGourp[dayKey] = []
        newGourp[dayKey].push(msg)
        return newGourp
      })
    })
    
  }, [message, userData])
  useEffect(() => {
    socket.on('messageStatus', msgId => {
      setMessage(prev => {
        return prev.map(msg => 
          msg._id === msgId ? {...msg, isSeen: 'seen'} : msg
        )
      })
    
    })
  }, [socket])

  const handleTyping = (value) => {
    console.log("this is the value: ", value)
    if (value.trim() !== "") {
      socket.emit('typing', {sendTo: userId, from: userData._id})
    } else {
      socket.emit('stopTyping', {sendTo: userId, from: userData._id})
    }
  }
  socket.on('typing', ({typing, from}) => {
    console.log("from: ", from)
    console.log("userid: ", userId)
    if(userId === from) {
      console.log('other party was typing')
      isTyping(typing)
    }  
  })

  
  return (

    <ChatLayout>
      
      <div className='flex flex-col justify-between items-start flex-1 '>
        <section className='w-full flex flex-col'>
          {message.filter(msg => 
            (msg.senderId === userId && msg.receiverId === userData._id) || (msg.senderId === userData._id && msg.receiverId === userId)
          ).map(msg => (
            <div key={msg._id} className={`w-96 mt-7 space-y-2 bg self-end ${msg.senderId === userId ? "mr-auto" : "ml-auto" } ml-5 mr-5`}>
                <div key={msg._id} className={`${msg.senderId === userId ? " rounded-t-2xl rounded-br-2xl" : " rounded-t-2xl rounded-bl-2xl "} bg-blue-600 text-white border p-4`} >
                  <p>{msg.content}</p>
                  <span className='text-white/70'>{new Date(msg.createdAt).toLocaleTimeString()}</span>
                </div>
                {showStatus(msg) && <p>{msg.isSeen}</p>}
            </div>

          ))}
          {typing && (
              <div className="typing-indicator flex space-x-1 mt-1 mb-5 ml-5 p-2 ">
                <span className="dot animate-bounce bg-gray-500 rounded-full w-2 h-2"></span>
                <span className="dot animate-bounce bg-gray-500 rounded-full w-2 h-2 delay-150"></span>
                <span className="dot animate-bounce bg-gray-500 rounded-full w-2 h-2 delay-300"></span>
              </div>
          )}
        </section >
        <section className='bg-yellow-50 w-full border-t border-gray-300 h-20 flex flex-col justify-center p-2' ref={chatEndRef}>
          <MessageForm onSend={sendMessage} onType={handleTyping} />
        </section>  
      </div>
    </ChatLayout>
  )
}

export default Chat