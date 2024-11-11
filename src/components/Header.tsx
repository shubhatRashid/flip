'use client';

import { useSession, signOut } from "next-auth/react";
import { logout } from "../../assets";
import Image from "next/image";
import { useState } from "react";
import { setting } from "../../assets";
import { SidebarTrigger,SidebarProvider,SidebarFooter,SidebarMenu,SidebarMenuItem} from "./ui/sidebar";
import {AppSidebar} from "../components"

export default function Footer() {
    const { data: session } = useSession();

    return (
        <div className="relative flex w-full justify-between">
                <div className="absolute flex justify-center items-center">
                    {
                        session ?
                        <SidebarProvider >
                            <AppSidebar/>
                            <SidebarTrigger/>
                            <h1 className="pt-0.5 ml-2 text-xl font-bold font-serif">FLIP</h1>
                        </SidebarProvider>
                        :
                        <h1 className="pt-0.5 ml-2 text-xl font-bold font-serif">FLIP</h1>
                    }
                   
                </div>
        </div>
    );
}
