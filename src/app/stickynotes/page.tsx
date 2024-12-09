'use client'
import { useSession } from "next-auth/react";
import { SignInPage,Loader } from "@/components";
import {EachNoteCategory} from "@/components";
import { generateHex24 } from "@/utils/functions";
import { CirclePlus } from "lucide-react";
import { useAppContext } from "@/utils/context/AppContext";
import { useToast } from "@/hooks/use-toast";

export default function Page() {
    const {data:session,status} = useSession()
    const {notes,setNotes} = useAppContext()
    const {toast} = useToast()

    const handleAddNewCategory = async() => {
        const newCategory = {
            _id : generateHex24(),
            category : 'new category...',
            notes : []
        }
        setNotes((prevNotes) => [...prevNotes,newCategory])
        document.getElementById('new category...')?.focus()
        
        try {
            const response = await fetch('/api/stickynotes/addnewcategory')
            if (!response.ok){
                throw new Error(`${response.status}`,{cause:response.statusText})
            }
            const data = await response.json()
            setNotes(data)
           
        } catch (error:any) {
            const errorBody = {
                title : error.message ,
                description : `${error.name} : ${error.cause}`
            }
            toast(errorBody)
            setTimeout(() => window.location.reload(),3000)
        }

    }


    if (status === 'loading') return <Loader/>
    if (status === 'unauthenticated') return <SignInPage/>
    
    return (
        <div className='flex flex-wrap justify-evenly items-center gap-10 w-full h-full pt-5 '>

            {notes.map((eachCategory,index) => (
                <EachNoteCategory key={index} eachCategory={eachCategory}/>
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