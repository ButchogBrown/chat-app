import { AppSidebar } from '@/components/app-sidebar'
import { Sidebar, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React, { useContext, useEffect, useState } from 'react'
import { EllipsisVertical } from 'lucide-react';
import axios from 'axios';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthProvider';
import { SocketContext } from '@/context/SocketProvider';

const ChatLayout = ({ children }) => {
  const navigate = useNavigate()
  const socket = useContext(SocketContext)
  const [isLogOut, setLogOut] = useState()
  const {setUserData} = useContext(AuthContext)
  const [showMenu, setShowMenu] = useState()

  const handleClick = () =>{
    setShowMenu(prev => !prev)
  }
  const handleSumbit = async () => {
    try {
      if(socket) socket.disconnect() 

      const res = await axios.post("http://localhost:3000/api/v1/auth/logout", {}, {withCredentials: true})
      setUserData({})
      navigate('/login')
    }catch (error) {
      console.log(error)
    }
  }
 
  return (
    <SidebarProvider className="flex" >
        <AppSidebar />
          <main className='flex flex-col flex-1'>
              <div className='fixed w-full border-b border-gray-300 bg-white flex justify-between items-center z-50'>
                  <SidebarTrigger />
                  <div>
                    <EllipsisVertical onClick={handleClick} />
                    {showMenu && (
                       <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md">
                        <button
                          onClick={handleSumbit}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                  
              </div>

              {children}
          </main> 
    </SidebarProvider>
  )
}
export default ChatLayout;

