
import ChatLayout from '@/components/chat-layout'
import MessageForm from '@/components/message-form'
import React, { useEffect, useState, useContext, useRef } from 'react'
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

  const { userId } = useParams()
  const chatEndRef = useRef(null)
  useEffect(() => {
    if(socket) {
      fetchMessages(userId)
      socket.on('private message', (data) => {
        // setMessage(data)
        setMessage(prev => {
          // if(data.onSend !== userId && data.receiverId !== userId ) return prev
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
  }, [message])
  
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
                  <span className='text-white/70'>{msg.createdAt}</span>
                </div>
                {showStatus(msg) && <p>{msg.isSeen}</p>}
            </div>

          ))}
        </section >
        <section className='bg-yellow-50 w-full border-t border-gray-300 h-20 flex flex-col justify-center p-2' ref={chatEndRef}>
          <MessageForm onSend={sendMessage} />
        </section>  
      </div>
    </ChatLayout>
  )
}

export default Chat
