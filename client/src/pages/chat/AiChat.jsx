import ChatLayout from '@/components/chat-layout'
import MessageForm from '@/components/message-form'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

function AiChat() {
  const chatEndRef = useRef(null)
  const [messages, setMessages] = useState([])

  const sendMessage = async (message) => {
    const currentMessages = [
      ...messages, 
      {role: "user", content: message}
    ]
    setMessages(currentMessages)
    
    try {
      const res = await axios.post('http://localhost:3000/api/v1/chat/ai', {message: currentMessages.slice(-5)}, {withCredentials: true})
      setMessages(prev => [
        ...prev,
        {role: res.data.role, content: res.data.content}
      ])
      console.log(res)
    }catch(error) {
      console.log(error)
    }
  }
useEffect(() => {
  chatEndRef.current?.scrollIntoView({behavior: "smooth"})
}, [messages])

  return (
   <ChatLayout >
      <div className='flex flex-col justify-between items-start flex-1 '>
        <section className='w-full flex flex-col'>
          {/* {messages.filter(msg => 
            (msg.senderId === userId && msg.receiverId === userData._id) || (msg.senderId === userData._id && msg.receiverId === userId)
          ).map(msg => (
            <div key={msg._id} className={`w-96 mt-7 space-y-2 bg self-end ${msg.senderId === userId ? "mr-auto" : "ml-auto" } ml-5 mr-5`}>
                <div key={msg._id} className={`${msg.senderId === userId ? " rounded-t-2xl rounded-br-2xl" : " rounded-t-2xl rounded-bl-2xl "} bg-blue-600 text-white border p-4`} >
                  <p>{msg.content}</p>
                  <span className='text-white/70'>{new Date(msg.createdAt).toLocaleTimeString()}</span>
                </div>
                {showStatus(msg) && <p>{msg.isSeen}</p>}
            </div>

          ))} */}
          {messages && messages.map(msg => (
            <div  className={`w-96 mt-7 space-y-2 bg self-end ${msg.role === "assistant" ? "mr-auto" : "ml-auto" } ml-5 mr-5`}>
                <div key={msg._id} className={`${msg.role === "assistant" ? " rounded-t-2xl rounded-br-2xl" : " rounded-t-2xl rounded-bl-2xl "} bg-blue-600 text-white border p-4`} >
                  <p>{msg.content}</p>
                  {/* <span className='text-white/70'>{new Date(msg.createdAt).toLocaleTimeString()}</span> */}
                </div>
                {/* {showStatus(msg) && <p>{msg.isSeen}</p>} */}
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

export default AiChat
