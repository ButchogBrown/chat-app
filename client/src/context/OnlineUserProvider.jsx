import React, { createContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')
export const OnlineUserContext = createContext()

const OnlineUserProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([])

	useEffect(() => {
		socket.on('online users', (user) => {
			setOnlineUsers(user)
		})
		return () => {
		socket.off('online users');
	};
	}, [])
  return (
		<OnlineUserContext.Provider value={{onlineUsers, setOnlineUsers}}>
			{children}
		</OnlineUserContext.Provider>
  )
}

export default OnlineUserProvider
