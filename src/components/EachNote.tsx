import { EllipsisVertical, GripHorizontal, GripVertical, SquarePen, Trash, } from "lucide-react";
import { Permanent_Marker,Caveat } from 'next/font/google'; 
import AddNoteDialogBox from "./AddNoteDialogbox";
import {useEffect, useState } from "react";
import { useAppContext } from "@/utils/context/AppContext";
import { useToast } from "@/hooks/use-toast";
import { NoteCategoryType, NoteType } from "@/types";
const EditNoteDialogBox = AddNoteDialogBox
const permanent_Marker = Permanent_Marker({weight:'400', subsets: ['latin'] })
const caveat = Caveat({weight:'700', subsets: ['latin'] })

export default function EachNote(
    {eachnote,noteCategory,index,minHeight,minWidth,textSize,maximise} 
    : 
    {
        eachnote:NoteType,
        noteCategory:NoteCategoryType,
        index:number,
        minHeight:string,
        minWidth:string,
        textSize:number,
        maximise:boolean
    }
) {
    const {notes,setNotes} = useAppContext()
    const {toast} = useToast()
    const [options,setOptions] = useState(false)

    const handleEditNote = async (
        title: string,
        description: string,
        color: string,
        textColor: string
      ) => {
      
        const newNotes = notes.map((category) => {
          if (category._id === noteCategory._id) {
            const updatedNotes = category.notes.map((note) => {
              if (note._id === eachnote._id) {
                return {
                  ...note,
                  notetitle: title,
                  notedescription: description,
                  backgroundColor: color,
                  textColor: textColor,
                };
              }
              return note; 
            });
            return {
              ...category, 
              notes: updatedNotes,
            };
          }
          return category; 
        });
        setNotes(JSON.parse(JSON.stringify(newNotes)))

        const body = JSON.stringify({
          category_id : noteCategory._id,
          note_id : eachnote._id,
          updatedNote : {
            ...eachnote,
            notetitle: title,
            notedescription: description,
            backgroundColor: color,
            textColor: textColor,
          }
        })
        
        try {
          const response = await fetch('/api/stickynotes/editnote',{method:'PUT',body:body})
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
      };

    const handleDeleteNote = async () => {
      
        const newNotes = notes.map((category) => {
          if (category._id === noteCategory._id) {
            const updatedNotes = category.notes.filter((note) => note._id !== eachnote._id);
            return {
              ...category, 
              notes: updatedNotes,
            };
          }
          return category; 
        });
        setNotes(JSON.parse(JSON.stringify(newNotes)))

        const body = JSON.stringify({
          category_id : noteCategory._id,
          note_id : eachnote._id,
        })
        
        try {
          const response = await fetch('/api/stickynotes/deletenote',{method:'POST',body:body})
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
      };
      
      useEffect(()=> {
        console.log(notes)
      },[notes])

    return (
        <div
            className={`relative flex flex-col border p-1 shadow-md hover:shadow-lg
                        hover:scale-110 hover:cursor-pointer transition ease-in-out delay-50
                        ${!maximise ? 'max-w-[100px]' : 'max-w-[300px]'} `}
            style={
                {
                    backgroundColor: eachnote.backgroundColor,
                    rotate: index % 2 === 0 ? `${-index*3 -2}deg` : `${index*3 + 2}deg`,
                    minHeight:minHeight,
                    minWidth:minWidth
                }
            }
        >
            <div className="flex justify-between items-center gap-5">
              <h1 className={` ${permanent_Marker.className} ${textSize===1?'text-sm':'text-xl'} font-serif font-bold border-b`}>{eachnote.notetitle}</h1>
               {maximise && <button title='options'><EllipsisVertical className="scale-75" onClick={() => setOptions(!options)} /></button> }
            </div>
            
            <p 
                className={` ${caveat.className} flex 
                             ${textSize===1?'text-sm':'text-xl'} capitalize p-3
                             whitespace-pre-wrap`}
                style={{color:eachnote.textColor}}
            >
                {
                !maximise && eachnote.notedescription.length > 50 ? 
                  eachnote.notedescription.slice(0,50) + ' ...' 
                : 
                  eachnote.notedescription}
            </p>

          
            {
                options && 
                <div className="absolute bottom-2  px-2 flex w-[50%] justify-evenly items-center ml-auto border border-black rounded-lg">
                    <button title="edit note">
                      <EditNoteDialogBox 
                          dialogTitle="Edit Note"
                          dialogDescription="Edit the contents to update the note"
                          submitFunction={handleEditNote}
                          defaultTitle={eachnote.notetitle}
                          defaultDescription={eachnote.notedescription}
                          defaultBgColor={eachnote.backgroundColor}
                          defaultTextColor={eachnote.textColor}
                          icon = {<div className="scale-75"><SquarePen/></div>}
                      />
                    </button>
                    <button title="delete" onClick={handleDeleteNote}>
                      <Trash className="scale-75 hover:scale-100"/>
                    </button>
                </div>
            }

        </div>
    );
}