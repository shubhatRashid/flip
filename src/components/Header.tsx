'use client';

import { useSession, signOut } from "next-auth/react";
import { SidebarTrigger,SidebarProvider,SidebarFooter,SidebarMenu,SidebarMenuItem} from "./ui/sidebar";
import {AppSidebar} from "../components"

export default function Footer() {
    const { data: session } = useSession();

    return (
        <div className="relative flex w-full justify-between">
                <div className="absolute flex justify-center items-center">
                    {
                        session ?
                        <div className='relative'>
                            <SidebarProvider className="relative">
                                <AppSidebar/>
                                <SidebarTrigger className="relative md:absolute  z-10 left-2 "/>
                                <h1 className="pt-0.4 ml-2  text-lg font-bold font-serif typewriter h-full">FLIP</h1>
                            </SidebarProvider>
                        </div>
                        :
                        <h1 className="pt-0.5 ml-2 text-xl font-bold font-serif">FLIP</h1>
                    }
                   
                </div>
        </div>
    );
}
