
import ChatLayout from '@/components/chat-layout'
import MessageForm from '@/components/message-form'
import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '@/context/AuthProvider' 
import { useParams } from 'react-router-dom'
import { SocketContext } from '@/components/socket-provider'


const Chat = ({children }) => {
  const {userData, setUserData} = useContext(AuthContext)
  const [message, setMessage] = useState()
  const { userId } = useParams()
  const socket = useContext(SocketContext)

  useEffect(() => {
    if(!userData) return;
    socket.on('private message', (data) => {
      setMessage(data) //set the display data to be this value
    })  
    socket.on('message', (data) => {
      setMessage(data)
    })

  }, [userData])
  useEffect(() => {
    console.log(socket)
  }, [socket])
  const sendMessage = (sendMessage) => {
    console.log('socket from server: ', socket.id)
    socket.emit('private message',{content: sendMessage, to: userId})
  }

  return (

    <ChatLayout>
      
      <div className='flex flex-col justify-between items-start flex-1 '>
        <section className='w-full flex flex-col'>
          {message && 
            <ul className='w-96 self-end mt-7 space-y-2'>
              <li className='bg-blue-600 text-white rounded-t-2xl rounded-bl-2xl border p-4'>
                <p>{message.content}</p>
                <span className='text-white/70'>{message.date}</span>
              </li>
            </ul>
          }
          {/* <ul className='w-96 self-start m-7 space-y-1'>
            
            <li className='bg-blue-50  rounded-t-2xl rounded-br-2xl border border-gray-50 shadow-sm p-4'>
              <p>Hey! How are you doing?</p>
              <span className='text-gray-400'>10:30 AM</span>
            </li>
            
          </ul> */}
        </section>
        <section className='bg-yellow-50 w-full border-t border-gray-300 h-20 flex flex-col justify-center p-2'>
          <MessageForm onSend={sendMessage} />
        </section>  
      </div>
    </ChatLayout>
  )
}

export default Chat
