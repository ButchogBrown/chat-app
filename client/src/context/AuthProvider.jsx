import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()
function AuthProvider( { children } ) {
  const [userData, setUserData] = useState({})

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/chat/home',{
        withCredentials: true
      })
      setUserData(res.data.user)
    }catch(error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
	
  return (
    <AuthContext.Provider value={{userData, setUserData}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
