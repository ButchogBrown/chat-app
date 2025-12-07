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
import { Link } from "react-router-dom"
import { OnlineUserContext } from "@/context/OnlineUserProvider"
import { AuthContext } from "@/context/AuthProvider"


// Menu items.

export function AppSidebar() {
  const {onlineUsers, setOnlineUsers} = useContext(OnlineUserContext)
  const {userData} = useContext(AuthContext)
  const [otherOnlineUser, setOtherOnlineUser] = useState({})
  const temp = onlineUsers

  useEffect(() => {
    const otherUser = Object.values(onlineUsers).filter( user => user.userId !== userData.user._id).reduce((acc, user) => {
      acc[user.userId] = {...user}
      return acc
    }, {})
    setOtherOnlineUser(otherUser)
    
  }, [onlineUsers, userData])
  useEffect(()=>{
    console.log(otherOnlineUser)
  }, [otherOnlineUser])
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
              {Object.values(otherOnlineUser).map((user) => (
                <SidebarMenuItem key={user.userId}>
                  <SidebarMenuButton asChild>
                    <Link to={`/chat/${user.userId}`} className="flex items-center mb-2 bg-gray-100 rounded h-auto justify-between">
                      <div className="flex gap-2 items-center">
                        <div className="bg-blue-400 rounded-full p-1 flex items-center ">
                          <Inbox className="text-white" size={24} />
                        </div>
                        <div>
                          <span className="font-medium">{user.userName}</span>
                          <p>{`userid: ${user.userId} socketId: ${user.userSocketId}, username: ${user.userName}`}</p>
                          <p className="text-gray-500">Hey! How are you doing?</p>
                        </div>
                      </div>

                      <p className="items-end text-gray-500">2m ago</p>
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