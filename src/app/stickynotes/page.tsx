'use client'
import { useSession } from "next-auth/react";
import { SignInPage,Loader } from "@/components";
import { useState } from "react";
import {EachNoteCategory} from "@/components";
import data from "@/utils/data";
import { CirclePlus } from "lucide-react";

export default function Page() {
    const {data:session,status} = useSession()
    const [notes,setNotes] = useState(data)

    if (status === 'loading') return <Loader/>
    if (status === 'unauthenticated') return <SignInPage/>
    
    return (
        <div className='flex flex-wrap justify-evenly items-center gap-10 w-full h-full pt-5 '>

            {notes.map((eachCategory,index) => (
                <EachNoteCategory key={index} eachCategory={eachCategory}/>
            ))}

            <div className="flex  min-w-[200px] min-h-[200px] 
                            justify-center items-center">
                <button className='flex flex-col justify-center items-center border rounded-lg min-w-[50px] min-h-[100px]'>
                    <CirclePlus/>
                    <p className="font-sans text-gray-400 p-2">Add New</p>
                </button>
            </div>
        </div>
    );
}