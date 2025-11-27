
import ChatLayout from '@/components/chat-layout'
import MessageForm from '@/components/message-form'
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')

const Chat = ({children}) => {
  const [message, setMessage] = useState()

  useEffect(() => {
    socket.on('connection')
  }, [])

  useEffect(() => {
    socket.on('message', (data) => {
      setMessage(data)
    })
  },[])

  const sendMessage = (sendMessage) => {
    socket.emit('message', sendMessage)
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
