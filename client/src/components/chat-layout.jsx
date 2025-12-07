import { AppSidebar } from '@/components/app-sidebar'
import { Sidebar, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import OnlineUserProvider from '@/context/OnlineUserProvider'
import React from 'react'
import SocketProvider from './socket-provider'

const ChatLayout = ({ children }) => {
  return (
    <SidebarProvider className="flex" >
      <SocketProvider>
        <OnlineUserProvider>
          <AppSidebar />
        </OnlineUserProvider>
          <main className='flex flex-col flex-1'>
              <div className='border-b border-gray-300'>
                  <SidebarTrigger className="justify-start " />
              </div>
              {children}
          </main>
        </SocketProvider>
    </SidebarProvider>
  )
}
export default ChatLayout;

