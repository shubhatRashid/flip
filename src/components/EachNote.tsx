import { Note,NoteCategory } from "@/utils/data";
import { SquarePen } from "lucide-react";
import { Permanent_Marker,Caveat } from 'next/font/google'; 
import AddNoteDialogBox from "./AddNoteDialogbox";
import {useEffect } from "react";
import { useAppContext } from "@/utils/context/AppContext";
import { json } from "stream/consumers";
const EditNoteDialogBox = AddNoteDialogBox
const permanent_Marker = Permanent_Marker({weight:'400', subsets: ['latin'] })
const caveat = Caveat({weight:'700', subsets: ['latin'] })

export default function EachNote(
    {eachnote,noteCategory,index,minHeight,minWidth,textSize,maximise} 
    : 
    {
        eachnote:Note,
        noteCategory:NoteCategory,
        index:number,
        minHeight:string,
        minWidth:string,
        textSize:number,
        maximise:boolean
    }
) {
    const {notes,setNotes} = useAppContext()

    const handleEditNote = (
        title: string,
        description: string,
        color: string,
        textColor: string
      ) => {
        
        // Ensure a new array and objects are returned to trigger a rerender
        const newNotes = notes.map((category) => {
          if (category._id === noteCategory._id) {
            // Map over the notes array and update the specific note
            const updatedNotes = category.notes.map((note) => {
              if (note._id === eachnote._id) {
                return {
                  ...note, // Create a new object for the note
                  notetitle: title,
                  notedescription: description,
                  backgroundColor: color,
                  textColor: textColor,
                };
              }
              return note; // Return the original note if it doesn't match
            });
      
            // Return a new category object with updated notes
            return {
              ...category, // Spread the category to ensure we don't mutate it
              notes: updatedNotes, // Replace the notes array with the updated one
            };
          }
          return category; // Return the original category if it doesn't match
        });
      
        // Update the state with a completely new reference
        setNotes(JSON.parse(JSON.stringify(newNotes)))
      };
      
      useEffect(()=> {
        console.log(notes)
      },[notes])

    return (
        <div
            className="relative flex flex-col border p-2 shadow-md hover:shadow-lg
                        hover:scale-110 hover:cursor-pointer transition ease-in-out delay-50"
            style={
                {
                    backgroundColor: eachnote.backgroundColor,
                    rotate: index % 2 === 0 ? `${-index*3 -2}deg` : `${index*3 + 2}deg`,
                    minHeight:minHeight,
                    minWidth:minWidth
                }
            }
        >   
            <h1 className={` ${permanent_Marker.className} ${textSize===1?'text-sm':'text-xl'} font-serif font-bold border-b`}>{eachnote.notetitle}</h1>
            <span 
                className={` ${caveat.className} flex flex-wrap max-w-[100px] 
                             ${textSize===1?'text-sm':'text-xl'} capitalize my-auto mx-auto`}
                style={{color:eachnote.textColor}}
            >
                {eachnote.notedescription}
            </span>

            <div className="flex w-full gap-5">
                {
                    maximise && 
                    <button className=" ml-auto">
                        <EditNoteDialogBox 
                            dialogTitle="Edit Note"
                            dialogDescription="Edit the contents to update the note"
                            submitFunction={handleEditNote}
                            defaultTitle={eachnote.notetitle}
                            defaultDescription={eachnote.notedescription}
                            defaultBgColor={eachnote.backgroundColor}
                            defaultTextColor={eachnote.textColor}
                            icon = {<div><SquarePen/></div>}
                            />
                    </button>
                }
            </div>

        </div>
    );
}