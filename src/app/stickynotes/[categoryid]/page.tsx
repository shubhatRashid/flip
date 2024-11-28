'use client'
import { useEffect, useState } from "react";
import { EachNote } from "@/components";
import { useAppContext } from "@/utils/context/AppContext";

export default function Page({params}:{params:Promise<{categoryid:string}>}) {
    const [categoryid,setCategoryid] = useState('')
    const {notes} = useAppContext()

    useEffect(() => {
        const resolveParams = async () => {
            const {categoryid} = await params
            setCategoryid(categoryid)
        }
        resolveParams()
    },[params])

    const currCategory = notes.filter((noteCategory) => noteCategory._id === categoryid)[0]

    return (
        <div className={`flex w-full h-full flex-wrap justify-evenly items-center gap-5`}>
            { 
                currCategory?.notes.map((eachnote,index) => (
                    <EachNote 
                    key={index} 
                    eachnote={eachnote} 
                    noteCategory={currCategory}
                    index={index} 
                    minHeight="300px" 
                    minWidth="200px" 
                    textSize={2}
                    maximise={true}/>
                ))
            }


         </div>
    );
}