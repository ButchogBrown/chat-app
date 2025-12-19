import ChatLayout from '@/components/chat-layout'
import React, { useContext, useEffect } from 'react'
import { MessageCircle } from 'lucide-react';
import { ErrorContext } from '@/context/ErrorProvider';
import { useNavigate } from 'react-router-dom';

function Default() {
	// const {serverError, setServerError} = useContext(ErrorContext)
	// const navigate = useNavigate()
	// useEffect(() => {
	// 	if(serverError?.status === 401) {
	// 		console.log(serverError.status)
	// 		navigate('/login', {replace: true})
	// 		setServerError(null)
	// 	}
	// }, [serverError])
  return (
	<ChatLayout>
		<div className='flex flex-col justify-center items-center  flex-1  w-fll'>
			<div className='rounded-full p-5 bg-blue-100 mb-5'>
				<MessageCircle size={60} className="text-blue-500" />
			</div>
			<p>Start Chatting Now</p>
			<span className='text-gray-400 mt-3'>Select a friend from the sidebar to begin messaging.</span>
		</div>
	</ChatLayout>
  )
}

export default Default
