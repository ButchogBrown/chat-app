import { Calendar, Home, Inbox, Search, Settings, MessageCircle } from "lucide-react"

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

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
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
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center mb-2 bg-gray-100 rounded h-24 justify-between">
                      <div className="flex gap-2 items-center">
                        <div className="bg-blue-400 rounded-full p-1 flex items-center ">
                          <item.icon className="text-white" size={24} />
                        </div>
                        <div>
                          <span className="font-medium">{item.title}</span>
                          <p className="text-gray-500">Hey! How are you doing?</p>
                        </div>
                      </div>

                      <p className="items-end text-gray-500">2m ago</p>
                    </a>
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