import React, { createContext, useContext, useEffect } from 'react'
import { io } from 'socket.io-client'
import { UserContext } from './user-provider'

export const SocketContext = createContext()

const socket = io('http://localhost:3000')

function SocketProvider({ children }) {
	// const {userData, setUserData} = useContext(UserContext)
	const userData = {
		userId: 'sdfsdfsdfsdfsf',
		userName: 'chug'
	}
	useEffect(() => {
		socket.on('connection')
		if(userData) {
			console.log(userData)
			socket.emit('join', {userData: userData})
		}
	}, [userData])
  return (
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
