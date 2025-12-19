import React, { createContext, useState } from 'react'

export const ErrorContext = createContext()
function ErrorProvider({ children }) {
    const [serverError, setServerError] = useState()
  return (
    <ErrorContext.Provider value={{ serverError, setServerError}}>
        {children}
    </ErrorContext.Provider>
  )
}

export default ErrorProvider
