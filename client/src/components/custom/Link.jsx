import React from 'react'

const Link = ({children, className, href}) => {
  return (
    <a href={href} className={`text-blue-500 text-sm transition duration-300 hover:text-blue-600  ${className}`}>{children}</a>
  )
}

export default Link
