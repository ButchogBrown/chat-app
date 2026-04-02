import { Input } from '@/components/ui/input'
import { Paperclip, Smile, Send } from 'lucide-react';
import React, { useState } from 'react'

const MessageForm = ({ onSend, onType }) => {
    const messageInput = document.getElementById('message-input')
    const [formData, setFormData] = useState({
        message: ''
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        onSend(formData.message)
        messageInput.value = ''
        onType(messageInput.value = '')
    }

return (
<form onSubmit={handleSubmit}>
    <div className='flex justify-between items-center gap-3 ml-5 mr-5'>
        <Paperclip size={30} color='gray' />
        <Input type="text" id="message-input" className="rounded-2xl text-gray-400 border-gray-300 bg-gray-100"
            placeholder="Type a message..." 
            onChange={(e) =>{ 
                setFormData({...formData, message: e.target.value})
                onType(e.target.value)}
            }
            />
        <Smile size={30} color='gray' />
        <button type='submit' className='bg-gray-300 rounded p-1'>
            <Send size={20} color='gray' />
        </button>
    </div>

</form>
)
}

export default MessageForm
