import { AuthContext } from '@/context/AuthProvider'
import { ErrorContext } from '@/context/ErrorProvider'
import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

function AuthRoute({children}) {
	const {serverError, setServerError} = useContext(ErrorContext)
	const {userData, setUserData} = useContext(AuthContext)
	if(!userData?._id) {
		return <Navigate to="/login" replace />
	}
	
	return children

}

export default AuthRoute
