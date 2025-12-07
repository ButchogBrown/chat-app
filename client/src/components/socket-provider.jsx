import React, { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { AuthContext } from '@/context/AuthProvider'
import { X } from 'lucide-react'

export const SocketContext = createContext()

function SocketProvider({ children }) {
	const {userData, setUserData} = useContext(AuthContext)
	const [socket, setSocket] = useState(null)

	useEffect(() => {
		const newSocket = io('http://localhost:3000', {
			withCredentials: true
		})

		setSocket(newSocket)
		return () =>{
			newSocket.disconnect()
		}
	}, [])
	useEffect(() => {

		if(socket && userData) {
			socket.on("connect", () => {
				console.log('sever in connected', socket.id)
				socket.emit('join', {userData: userData.user})
			})
			
		}
		
	}, [socket, userData])
  return (
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
