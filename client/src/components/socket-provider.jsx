import React, { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { AuthContext } from '@/context/AuthProvider'
import { X } from 'lucide-react'

export const SocketContext = createContext()

function SocketProvider({ children }) {
	const {userData, setUserData} = useContext(AuthContext)
	const [socket, setSocket] = useState(null)

	useEffect(() => {
		console.log('from socket provider')
		if(!userData) return

		console.log("hello from hell")
		const newSocket = io('http://localhost:3000', {
			withCredentials: true
		})

		setSocket(newSocket)
		return () =>{
			newSocket.disconnect()
		}
	}, [])
	// useEffect(() => {
	// 	if(!socket || !userData) return

	// 	const joinServer = () => {
	// 		console.log('sever in connected', socket.id)
	// 		socket.emit('join', {userData: userData.user})
	// 	}
	// 	if(socket.connected) {
	// 		joinServer()
	// 	} else {
	// 		socket.once('connect', joinServer)
	// 	}
	// 	return () => {
	// 		socket.off("connect", joinServer);
	// 	};
	// }, [socket, userData])
	
  return (
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
