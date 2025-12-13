import React, { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { AuthContext } from './AuthProvider'
export const SocketContext = createContext()

function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null)
  const { userData, setUserData } = useContext(AuthContext)

    useEffect(() => {
      const temp = io("http://localhost:3000", {
        withCredentials: true
      });
      setSocket(temp)
      
      return () =>{
        temp.disconnect()
      }
    }, [])

    useEffect(() => {
      if(socket && userData?._id) {
        socket.emit("connected_user", {userData})
      }
    }, [socket, userData])

  return (
    <SocketContext.Provider value={socket}>
      { children }
    </SocketContext.Provider>
  )
}

export default SocketProvider
