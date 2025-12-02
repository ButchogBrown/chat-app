import {React, useState, createContext, useEffect} from 'react'
import  {jwtDecode}  from 'jwt-decode'
export const UserContext =  createContext()

function UserProvider({ children }) {
  const [userData, setUserData] = useState(null)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      const decoded = jwtDecode(token)
      setUserData({userId: decoded.userId, userName: decoded.userName})
    }
  }, [])
  return ( 
    <UserContext.Provider value={{ userData, setUserData }}>
      {children} 
    </UserContext.Provider>
  )
}

export default UserProvider
