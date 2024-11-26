'use client'
import data from "@/utils/data";
import { useEffect, useState } from "react";
import { EachNote } from "@/components";

export default function Page({params}:{params:Promise<{categoryid:string}>}) {
    const [categoryid,setCategoryid] = useState('')
    const [allnotes,setAllNotes] = useState(data)

    useEffect(() => {
        const resolveParams = async () => {
            const {categoryid} = await params
            setCategoryid(categoryid)
        }
        resolveParams()
    },[params])

    const currCategory = allnotes.filter((note) => note._id === categoryid)[0]

    return (
        <div className={`flex w-full h-full flex-wrap justify-evenly items-center gap-5`}>
            { 
                currCategory?.notes.map((eachnote,index) => (
                    <EachNote 
                    key={index} 
                    eachnote={eachnote} 
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