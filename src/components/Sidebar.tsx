import { Clock, Home,Timer,ListTodo,Settings,ChevronUp,User2,Laptop} from "lucide-react"
import { DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem} from "@radix-ui/react-dropdown-menu"
import { useSession,signOut } from "next-auth/react"
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
    url: "countdown",
    icon: Timer,
  },
]

export default function AppSidebar() {
  const {data:session} = useSession()
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="flex justify-center items-center">
        <SidebarGroup>
          <SidebarGroupLabel>Productivety Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
                  <User2/> <p className="capitalize">{session?.user?.name}</p>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className=" w-[--radix-popper-anchor-width] flex flex-col bg-white shadow-md rounded text-black gap-3 p-2"
              >
                <DropdownMenuItem className="hover:bg-gray-200 rounded-md pl-1 p-1">
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-200 rounded-md pl-1 p-1">
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-200 rounded-md pl-1 p-1" onClick={() => signOut()}>
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
