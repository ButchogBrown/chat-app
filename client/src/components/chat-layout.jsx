import { AppSidebar } from '@/components/app-sidebar'
import { Sidebar, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { EllipsisVertical } from 'lucide-react';
const handleClick = () => {
  console.log("hello")
}
const ChatLayout = ({ children }) => {
  return (
    <SidebarProvider className="flex" >
          <AppSidebar />
         <main className='flex flex-col flex-1'>
              <div className='fixed w-full border-b border-gray-300 bg-white flex justify-between items-center z-50'>
                  <SidebarTrigger />
                  <EllipsisVertical onClick={handleClick} />
              </div>
              {children}
          </main> 
    </SidebarProvider>
  )
}
export default ChatLayout;

