import { Clock, Home,Timer,ListTodo,ChevronUp,Laptop,StickyNote} from "lucide-react"
import { useEffect, useState } from "react"
import { DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem} from "@radix-ui/react-dropdown-menu"
import { useSession,signOut } from "next-auth/react"
import { useSidebar } from "@/components/ui/sidebar"
import CountDownModel from "./CountDownModel"
import { Dialog,handleDialog } from "./Dialog"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

var count;
// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Clock",
    url: "clock",
    icon: Clock,
  },
  {
    title: "Stopwatch",
    url: "stopwatch",
    icon: Timer,
  },
  {
    title: "Todo list",
    url: "todolist",
    icon: ListTodo,
  },
  {
    title: "CountDown",
    url: '#',
    icon: Timer,
  },
  {
    title: "Sticky Notes",
    url: '/stickynotes',
    icon: StickyNote,
  },
]

export default function AppSidebar() {
  const {data:session} = useSession()
  const {setOpen} = useSidebar()
  const [showCountDown,setShowCountDown] = useState(false)

  useEffect(() => {
    setOpen(false)
  },[])

  return (
    <Sidebar collapsible="icon">
      {showCountDown && <CountDownModel setShowCountDown={setShowCountDown}/>}
      <Dialog 
        title={`SignOut ${session?.user?.name} ?`}
        description="This action will sign out your account and end your session. Your data will be saved in the database . You can sigin
                      anytime and excess your data. "
        proceedFunc={() => signOut()}/>
      <SidebarHeader>
        <SidebarGroup>
         <SidebarGroupLabel className="flex font-bold font-serif text-xl mt-[50px] text-black">Flip</SidebarGroupLabel>
         <SidebarGroupLabel className="flex text-xs">An All In One Productivity App...</SidebarGroupLabel>
        </SidebarGroup>
      </SidebarHeader>

      <SidebarContent className="flex justify-center items-center">
        <SidebarGroup>
          <SidebarGroupLabel>Productivety Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} title={item.title}>
                  <SidebarMenuButton asChild>
                    {
                      item.title != 'CountDown' ? 
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                    :
                    <button onClick={() => setShowCountDown(!showCountDown)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
                    }
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Developer</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href={process.env.NEXT_PUBLIC_DEVELOPER_PORTFOLIO}>
                      <Laptop/>
                      <span>Shubhat Rashid</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>


      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <img src={`${session?.user?.image}`} className="flex rounded-full w-[20px] h-[20px]"/>
                  <p className="capitalize">{session?.user?.name}</p>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="flex flex-col bg-white shadow-md rounded text-black gap-3 p-2"
              >
                <DropdownMenuItem className="hover:bg-gray-200 rounded-md pl-1 p-1">
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-200 rounded-md pl-1 p-1">
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-200 rounded-md pl-1 p-1" 
                  onClick={() =>{handleDialog()}}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>


    </Sidebar>
  )
}
