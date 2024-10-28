'use client';

import { useSession, signOut } from "next-auth/react";
import { logout } from "../../assets";
import Image from "next/image";
import { useState } from "react";
import { setting } from "../../assets";

export default function Footer() {
    const [showProfile, setShowProfile] = useState(false);
    const { data: session } = useSession();

    return (
        <div className="relative flex w-full justify-between px-[2%] py-[1%] sm:h-[10%] bg-neutral-800  ">
            <div className=" rounded-lg px-[2%] py-[1%] font-serif h-[]">
                <h1>FLIP</h1>
            </div>

            {
                !showProfile && session && 
                <button onClick={() => setShowProfile(!showProfile)}>
                    <Image
                        src={setting.src}
                        alt="profile"
                        width={25}
                        height={25}
                        style={{ borderRadius: '100%' }}
                    />
                </button>
            }

            {
                showProfile && session && 
                <div
                    className="absolute z-10 right-5 top-5 flex p-2 rounded-xl gap-5 border bg-black"
                >
                    <div className={`${showProfile ? 'flex' : 'hidden'} flex-col items-start font-serif capitalize`}>
                        <div className="flex gap-2 p-2">
                            <div className="flex flex-col gap-1">
                                <Image
                                    src={session.user?.image}
                                    alt="profile"
                                    width={25}
                                    height={25}
                                    style={{ borderRadius: '50%' }}
                                />
                                <p>{session.user?.name}</p>
                            </div>
                            <div className="flex justify-center items-start">
                                <button className=" border rounded-xl p-1 px-2" onClick={() => setShowProfile(!showProfile)}>{">"}</button>
                            </div>
                            
                        </div>
                       
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
                </div>
            }
        </div>
    );
}
