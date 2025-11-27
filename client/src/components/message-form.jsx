import { Input } from '@/components/ui/input'
import { Paperclip, Smile, Send } from 'lucide-react';
import React from 'react'

const MessageForm = () => {
return (
<form action="" className=''>
    <div className='flex justify-between items-center gap-3 ml-5 mr-5'>
        <Paperclip size={30} color='gray' />
        <Input type="text" className="rounded-2xl text-gray-400 border-gray-300 bg-gray-100"
            placeholder="Type a message..." />
        <Smile size={30} color='gray' />
        <div className='bg-gray-300 rounded p-1'>
            <Send size={20} color='gray' />
        </div>
    </div>

</form>
)
}

export default MessageForm
