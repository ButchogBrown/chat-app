import React, { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { AuthContext } from './AuthProvider'
export const SocketContext = createContext()

function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null)
  const { userData, setUserData } = useContext(AuthContext)

    useEffect(() => {
      if(!userData) return
      const temp = io("http://localhost:3000", {
        withCredentials: true
      });
      setSocket(temp)
      temp.emit("connected_user", {userData})
      return () =>{
        temp.disconnect()
      }
    }, [userData])

    // useEffect(() => {
    //   if(socket && userData?._id) {
    //     socket.emit("connected_user", {userData})
    //   }
    // }, [socket, userData])

  return (
    <SocketContext.Provider value={socket}>
      { children }
    </SocketContext.Provider>
  )
}

export default SocketProvider
