import { ErrorContext } from '@/context/ErrorProvider'
import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

function AuthRoute({children}) {
	const {serverError, setServerError} = useContext(ErrorContext)
	
		console.log(serverError)
		if(serverError?.status === 401) {
			setServerError(null)
			return <Navigate to="/login" replace/>
		}
		return children

}

export default AuthRoute
