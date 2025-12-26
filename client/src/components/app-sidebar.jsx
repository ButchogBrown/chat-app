import { Calendar, Home, Inbox, Search, Settings, MessageCircle } from "lucide-react"
import { io } from "socket.io-client"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Input } from "./ui/input"
import React, { useContext, useEffect, useState} from "react"
import { Link, useLocation } from "react-router-dom"
import { OnlineUserContext } from "@/context/OnlineUserProvider"
import { AuthContext } from "@/context/AuthProvider"


export function AppSidebar() {
  const location = useLocation()
  const {onlineUsers, setOnlineUsers, currentOnlineUser} = useContext(OnlineUserContext)
  const [offlineUser, setOfflineUser] = useState()
  const [filteredOnlineUser, setFilteredOnlineUser] = useState()
  const {userData} = useContext(AuthContext)


  useEffect(() => {
    if(!onlineUsers.length || !Object.keys(currentOnlineUser).length) return 
    const offlineUser = onlineUsers.filter(user => 
      !Object.keys(currentOnlineUser).includes(user._id)
    ) 
    const filteredOnlineUser = Object.fromEntries(
      Object.entries(currentOnlineUser).filter(
        ([key, user]) => key !== userData._id
      )
    );
    setOfflineUser(offlineUser)
    setFilteredOnlineUser(filteredOnlineUser)
    
  }, [onlineUsers, currentOnlineUser, userData])

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mt-8 border-b border-gray-300 pb-8">
            <div className="mb-3 flex items-center gap-1" > 
              <div className="bg-blue-600 p-2 rounded-xl inline-flex items-center justify-center ">
                <MessageCircle className="w-6 h-6 text-white"  />
              </div>
              <h1>ChatApp</h1>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <div className="mt-3 mb-3 border-b border-gray-300 pb-3">
                <div className="relative w-full">
                  {/* Icon inside input */}
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-gray-400" />
                  </div>

                  {/* Input field */}
                  <Input
                    type="text"
                    placeholder="Search conversation..."
                    className="pl-10 rounded border-none bg-gray-100 text-gray-400 h-10 w-full"
                  />
                </div>
              </div>
              <p className="pl-3  text-base text-gray-500 pb-2">Online</p>
              {filteredOnlineUser &&  Object.values(filteredOnlineUser).map((user) => (
                <SidebarMenuItem key={user.userId}>
                  <SidebarMenuButton asChild>
                    <Link to={`/chat/${user.userId}`} className={`flex items-center mb-2 rounded-2xl  h-auto justify-between hover:bg-blue-500 transition duration-300 ${
                        location.pathname === `/chat/${user.userId}` ? "bg-blue-200 " : "bg-gray-50"
                      }`}>
                      <div className="flex gap-2 items-center">
                        <div className="bg-blue-400 rounded-full p-1 flex items-center ">
                          <Inbox className="text-white" size={24} />
                        </div>
                        <div>
                          <span className="font-normal text-black">{user.userName}</span>
                        </div>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}


              <p className="pl-3  text-base text-gray-500 pb-2 pt-5">Offline</p>
              {offlineUser &&  offlineUser.map((user) => (
                <SidebarMenuItem key={user._id}>
                  <SidebarMenuButton asChild>
                    <Link to={`/chat/${user._id}`} className={`flex items-center mb-2 rounded h-auto justify-between hover:bg-blue-500 transition duration-300 ${
                        location.pathname === `/chat/${user._id}` ? "bg-blue-200" : "bg-gray-50 "
                      }`}>
                      <div className="flex gap-2 items-center">
                        <div className="bg-blue-400 rounded-full p-1 flex items-center ">
                          <Inbox className="text-white" size={24} />
                        </div>
                        <div>
                          <span className="text-gray-500">{user.name}</span>
                        </div>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}