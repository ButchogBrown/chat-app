import React, { createContext, useContext, useEffect, useState } from 'react'
import { SocketContext } from './SocketProvider'
export const OnlineUserContext = createContext()
import { AuthContext } from './AuthProvider'
import axios from 'axios'

function OnlineUserProvider({children}) {
  const {userData, setUserData} = useContext(AuthContext)
  const socket = useContext(SocketContext)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [currentOnlineUser, setCurrentOnlineUser] = useState({})
  useEffect(() => {
    if(!userData) return  
    if (socket && userData._id) {
      socket.on("online_users", async (data) => {
        // const filterUser = Object.fromEntries(Object.entries(data).filter(([key, user]) => key != userData._id ))
      
        setCurrentOnlineUser(data)
        const res = await getRecentChat()
        setOnlineUsers(res)
      })
    }
  }, [socket, userData])


  const getRecentChat = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/chat/recent', {
        withCredentials: true
      })
      
      return res.data
    }catch(error) {
      console.log(error)
    }
  }

  return (
    <OnlineUserContext.Provider value={{ onlineUsers, setOnlineUsers, currentOnlineUser }}>
      {children}
    </OnlineUserContext.Provider>
  )
}

export default OnlineUserProvider
