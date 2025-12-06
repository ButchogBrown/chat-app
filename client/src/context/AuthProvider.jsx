import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

function AuthProvider( {children} ) {
	const [userData, setUserData] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/chat/home', {withCredentials: true})
        setUserData(res.data)
      } catch(error) {
        navigate('/login')
      }

    }
    fetchUser()
  }, [])
  return (
    <AuthContext.Provider value={{userData, setUserData}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
