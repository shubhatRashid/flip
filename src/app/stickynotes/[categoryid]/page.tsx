'use client'
import { useEffect, useState } from "react";
import { EachNote } from "@/components";
import { useAppContext } from "@/utils/context/AppContext";
import {AddNoteDialogBox} from "@/components";
import { generateHex24 } from "@/utils/functions";
import { CirclePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TodoType,NoteCategoryType } from "@/types";

export default function Page({params}:{params:Promise<{categoryid:string}>}) {
    const [categoryid,setCategoryid] = useState('')
    const {notes,setNotes} = useAppContext()

    const [currCategory,setCategoryCategory] = useState<NoteCategoryType>(notes.filter((noteCategory) => noteCategory._id === categoryid)[0])
    const {toast} = useToast()

    const handleAddNewNote = async (title:string,description:string,color:string,textColor:string) => {
        const newNote = {
            _id: generateHex24(),
            notetitle: title,
            notedescription: description,
            noteDate: "2024-11-24",
            noteTime: "11:00 AM",
            backgroundColor:  color,
            textColor:textColor
        }

        let newNotesCategories = notes.map((noteCategory) => {
            if (noteCategory._id === categoryid){
                noteCategory.notes.push(newNote)

                return noteCategory
            }
            return noteCategory
        })

        setNotes(newNotesCategories)
        const body = JSON.stringify({
            category_id : categoryid,
            newNote : newNote,
        })
        try {
            const response = await fetch('/api/stickynotes/addnewnote',{method:'POST',body:body})
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

    useEffect(() => {
        const resolveParams = async () => {
            const {categoryid} = await params
            setCategoryid(categoryid)
            setCategoryCategory(notes.filter((noteCategory) => noteCategory._id === categoryid)[0])
        }
        resolveParams()
    },[params,notes])

    return (
        <div className={`flex w-full h-full flex-wrap justify-evenly items-center gap-5 pt-10`}>
            <div className="flex w-full pl-20 ">
                <h1 
                    className="font-bold border shadow-md p-2 rounded-md
                        bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                >{currCategory?.category}</h1>
            </div>
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

            <div title="add new note" className="absolute bottom-10 right-10 scale-125 hover:scale-150 rounded-full">
                <AddNoteDialogBox 
                    dialogTitle="Add New Note"
                    dialogDescription="Enter the contents for a new note"
                    submitFunction={handleAddNewNote} 
                    defaultTitle="" defaultDescription="" defaultBgColor="#ff0000" defaultTextColor="#ff0000"
                    icon = {<div><CirclePlus/></div>}
                />
            </div>
        </div>
    );
}