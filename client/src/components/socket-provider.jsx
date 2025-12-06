import React, { createContext, useContext, useEffect } from 'react'
import { io } from 'socket.io-client'
import { AuthContext } from '@/context/AuthProvider'

export const SocketContext = createContext()

const socket = io('http://localhost:3000')

function SocketProvider({ children }) {
	const {userData, setUserData} = useContext(AuthContext)
	useEffect(() => {
		socket.on('connection')
		if(userData) {
			socket.emit('join', {userData: userData.user})
		}
	}, [userData])

  return (
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
