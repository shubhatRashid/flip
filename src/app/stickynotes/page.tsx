'use client'
import { useSession } from "next-auth/react";
import { SignInPage,Loader } from "@/components";
import { useEffect, useState } from "react";
import {EachNoteCategory} from "@/components";
import {data} from "@/utils/data";
import { generateHex24 } from "@/utils/functions";
import { CirclePlus } from "lucide-react";
import { todo } from "node:test";

export default function Page() {
    const {data:session,status} = useSession()
    const [notes,setNotes] = useState(data)

    const handleAddNewCategory = () => {
        const newCategory = {
            _id : generateHex24(),
            category : 'new category...',
            notes : []
        }

        setNotes((prevNotes) => [...prevNotes,newCategory])
        document.getElementById('new category...')?.focus()

    }

    if (status === 'loading') return <Loader/>
    if (status === 'unauthenticated') return <SignInPage/>
    
    return (
        <div className='flex flex-wrap justify-evenly items-center gap-10 w-full h-full pt-5 '>

            {notes.map((eachCategory,index) => (
                <EachNoteCategory key={index} eachCategory={eachCategory} notes={notes} setNotes={setNotes}/>
            ))}

            <div className="flex  w-full justify-end items-center mt-auto py-2">
                <button 
                    className='flex flex-col justify-center items-center border rounded-full p-5 mr-5'
                    onClick={() => handleAddNewCategory()}>
                    <CirclePlus/>
                </button>
            </div>
        </div>
    );
}