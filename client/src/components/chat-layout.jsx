import { AppSidebar } from '@/components/app-sidebar'
import { Sidebar, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

const ChatLayout = ({ children }) => {
  return (
    <SidebarProvider className="flex" >
        <AppSidebar />
        <main className='flex flex-col flex-1'>
            <div className='border-b border-gray-300'>
                <SidebarTrigger className="justify-start " />
            </div>
            
            {children}
        </main>
    </SidebarProvider>
  )
}
export default ChatLayout;

