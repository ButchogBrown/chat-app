import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { ErrorContext } from './ErrorProvider'


export const AuthContext = createContext()
function AuthProvider( { children } ) {
  const [isLogin, setIsLogin] = useState(null)
  const [userData, setUserData] = useState(null)
  const {serverError, setServerError} = useContext(ErrorContext)
  const fetchData = async () => {
    console.log("hello")
    try {
      const res = await axios.get('http://localhost:3000/api/v1/chat/home',{
        withCredentials: true
      })
      setUserData(res.data.user)
    }catch(error) {
      console.log(error)
      setServerError(error)
    }
  }
  useEffect(() => {
    // if(!isLogin) return
    fetchData()
  }, [])
	
  return (
    <AuthContext.Provider value={{userData, setUserData, isLogin, setIsLogin, refetchUser: fetchData}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
