'use client';

import { useSession, signOut } from "next-auth/react";
<<<<<<< HEAD
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
=======
import { logout } from "../../assets";
import Image from "next/image";
import { useState } from "react";

export default function Footer() {
    const [showProfile, setShowProfile] = useState(false);
    const { data: session } = useSession();

    return (
        <div className="relative flex w-full justify-between px-[2%] py-[1%]">
            <div className="bg-neutral-800 rounded-xl px-[2%] py-[1%] font-serif">
                <h1>FLIP</h1>
            </div>
            
            {session && (
                <button
                    className="absolute right-5 flex p-2 rounded-xl gap-5 border"
                    onClick={() => setShowProfile(!showProfile)}
                >
                    <div className={`${showProfile ? 'flex' : 'hidden'} flex-col items-start font-serif capitalize`}>
                        <p>{session.user?.name}</p>
                        <button 
                            className="flex gap-5 border rounded-xl p-2 w-full"
                            onClick={() => signOut()}
                        >
                            <p>logout</p>
                            {logout?.src && (
                                <Image src={logout.src} alt="logout" width={25} height={25} />
                            )}
                        </button>
                    </div>
                    {session.user?.image && (
                        <Image
                            src={session.user.image}
                            alt="profile"
                            width={50}
                            height={50}
                            style={{ borderRadius: '100%' }}
                        />
                    )}
                </button>
            )}
>>>>>>> main
        </div>
    );
}
