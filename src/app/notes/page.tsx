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
        <div className='flex flex-wrap justify-evenly items-center gap-5'>
            <div className="flex border rounded-lg min-w-[200px] min-h-[300px] 
                            justify-center items-center">
                <button className="flex flex-col justify-center items-center border rounded min-w-[100px] min-h-[150px]">
                    <CirclePlus/>
                    <p className="font-sans text-gray-400">Add New</p>
                </button>
            </div>
            {notes.map((eachCategory,index) => (
                <EachNoteCategory key={index} eachCategory={eachCategory}/>
            ))}
        </div>
    );
}