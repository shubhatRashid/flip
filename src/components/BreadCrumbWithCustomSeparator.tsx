import { Slash } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";

export function BreadcrumbWithCustomSeparator() {
  const pathName = usePathname()
  const [routes,setRoutes] = useState<string[]>([])

  useEffect(()=>{
    const parts = pathName.split('/').filter(Boolean); 
    setRoutes(parts)
  },[pathName])

  return (
    <Breadcrumb className="hidden sm:flex w-full justify-center items-center pt-10 pl-10 h-[20px] font-bold">
      <BreadcrumbList className="pl-10 pt-10">
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {
          routes.map((route,index) => (
            <BreadcrumbItem 
            key={index}
            className=""
            >
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbPage 
                className={`capitalize font-bold ${index === routes.length-1 && 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'}`}
              >
                {route}
              </BreadcrumbPage>
            </BreadcrumbItem>
          ))
        }

      </BreadcrumbList>
    </Breadcrumb>
  )
}
