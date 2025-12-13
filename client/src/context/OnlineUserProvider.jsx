import React, { createContext, useContext, useEffect, useState } from 'react'
import { SocketContext } from './SocketProvider'
export const OnlineUserContext = createContext()
import { AuthContext } from './AuthProvider'

function OnlineUserProvider({children}) {
  const {userData, setUserData} = useContext(AuthContext)
  const socket = useContext(SocketContext)
  const [onlineUsers, setOnlineUsers] = useState({})

  useEffect(() => {
    if (socket && userData._id) {
      socket.on("online_users", (data) => {
        const filterUser = Object.fromEntries(Object.entries(data).filter(([key, user]) => key != userData._id ))
        setOnlineUsers(filterUser)
      })
    }
  }, [socket, userData])
  return (
    <OnlineUserContext.Provider value={{ onlineUsers, setOnlineUsers }}>
      {children}
    </OnlineUserContext.Provider>
  )
}

export default OnlineUserProvider
