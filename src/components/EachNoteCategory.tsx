import { NoteCategory } from "@/utils/data";
import EachNote from "./EachNote";
import { CirclePlus, FolderPen } from "lucide-react";
import { FormEvent, useState,useEffect } from "react";
import Dialogbox from "./Dialogbox"
import { generateHex24 } from "@/utils/functions";

export default function EachNoteCategory(
    {eachCategory,notes,setNotes}:{eachCategory:NoteCategory,notes:NoteCategory[],setNotes:React.Dispatch<React.SetStateAction<NoteCategory[]>>}) {
    const [selectedCategory,setSelectedCategory] = useState('')
    const [renameCategory,setRenameCategory] = useState('')
    const [newCategoryName,setNewCategoryName] = useState('')

    const handleRenameCategory = (e:FormEvent) => {
        e.preventDefault()
        let newNotesCategories = notes.map((noteCategory) => {
            if (noteCategory._id === eachCategory._id){
                noteCategory.category = newCategoryName
            }
            return noteCategory
        })

        setNotes(newNotesCategories)
    }

    const handleDeleteCategory = (id:string) => {
        let newNotesCategories = notes.filter((noteCategory) => {
            return noteCategory._id != id
        })

        setNotes(() => newNotesCategories)
    }

    const handleAddNewNote = (title:string,description:string,color:string) => {
        let newNotesCategories = notes.map((noteCategory) => {
            if (noteCategory._id === eachCategory._id){
                noteCategory.notes.push({
                    _id: generateHex24(),
                    notetitle: title,
                    notedescription: description,
                    noteDate: "2024-11-24",
                    noteTime: "11:00 AM",
                    color:  color
                })

                return noteCategory
            }
            return noteCategory
        })

        setNotes(newNotesCategories)
    }

    return (
        <div 
            id={`${eachCategory.category}`}
            className=" relative border p-1 rounded-lg flex flex-col gap-3 flex-wrap hover:scale-110
                        max-w-[300px] max-h-[500px] min-h-[200px] min-w-[200px]
                        shadow-md bg-gray-50 hover:shadow-xl hover:bg-gray-100 transition ease-in-out delay-50"
        >
            
            <div className="flex justify-between border-b border-dashed">
                {
                    renameCategory == eachCategory.category 
                ?   
                    <form onSubmit={(e) => handleRenameCategory(e)}>
                        <input 
                            className="outline-none p-2 rounded-xl bg-transparent"
                            value={newCategoryName} 
                            autoFocus 
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            onBlur={() => setRenameCategory('')}
                        />
                    </form>
                :
                    <h1 
                        className='flex font-mono font-bold text-xl capitalize'
                        style={{opacity:eachCategory.category==='new category...' ? '50%': '100%'}}
                    >
                        {eachCategory.category}
                    </h1>
                }

                <button className="" 
                        onClick={() => 
                            selectedCategory != eachCategory.category
                            ? 
                                setSelectedCategory(eachCategory.category) 
                            :
                                setSelectedCategory("")}
                >
                    <FolderPen/>
                </button>

                {
                selectedCategory === eachCategory.category &&
                    <div 
                        className="absolute right-[10%] top-[10%] flex flex-col text-sm border
                        justify-start items-start gap-1 p-3 rounded-xl bg-white z-10"> 

                        <button  className="border p-2 rounded w-full bg-gray-200" 
                                onClick={() => handleDeleteCategory(eachCategory._id) }
                        >🗑️ delete</button>
                        <button className="border p-2 rounded bg-gray-200" 
                                onClick={() => 
                                            {
                                                setRenameCategory(eachCategory.category) 
                                                setSelectedCategory('')
                                                setNewCategoryName(eachCategory.category)
                                            }
                                        }
                        >✒️ rename</button>

                    </div>
                }

            </div>

            <div className="flex flex-wrap justify-evenly items-center gap-5">
                {
                    eachCategory.notes.map((eachnote,index) => (
                        <EachNote key={index} eachnote={eachnote} index={index}/>
                    ))
                }
            </div>
                
            <div 
                className='flex justify-end items-center'
            >       
                <Dialogbox submitFunction={handleAddNewNote}/>
            </div>
        </div>
    );
}