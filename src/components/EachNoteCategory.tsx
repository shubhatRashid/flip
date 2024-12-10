import EachNote from "./EachNote";
import { CirclePlus, FolderPen, Maximize } from "lucide-react";
import { FormEvent, useState,useEffect } from "react";
import AddNoteDialogBox from "./AddNoteDialogbox"
import { generateHex24 } from "@/utils/functions";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/utils/context/AppContext";
import { useToast } from "@/hooks/use-toast";
import { error } from "console";
import { NoteCategoryType } from "@/types";

export default function EachNoteCategory(
    {eachCategory}:{eachCategory:NoteCategoryType}) {
    const {notes,setNotes} = useAppContext()
    const [selectedCategory,setSelectedCategory] = useState('')
    const [renameCategory,setRenameCategory] = useState('')
    const [newCategoryName,setNewCategoryName] = useState('')
    const router = useRouter()
    const {toast} = useToast()

    const handleRenameCategory = async (e:FormEvent) => {
        e.preventDefault()
        let newNotesCategories = notes.map((noteCategory) => {
            if (noteCategory._id === eachCategory._id){
                noteCategory.category = newCategoryName
            }
            return noteCategory
        })

        setNotes(newNotesCategories)

        const body = JSON.stringify(
            {
                categoryId : eachCategory._id,
                newCategoryName:newCategoryName
            }
        )

        try {
            const response = await fetch('/api/stickynotes/renamecategory',{method:'PUT',body:body})
            console.log(response)
            if (!response.ok){
                throw new Error(`${response.status}`,{cause:response.statusText})
                
            }
            const data = await response.json()
            setNotes(data)
        } catch (error:any) {
            const errorBody = {
                title : error.message,
                description : `${error.name} : ${error.cause}`
            }
            toast(errorBody)
            setTimeout(() => window.location.reload(),2000)
        }
    }

    const handleDeleteCategory = async (id:string) => {
        let newNotesCategories = notes.filter((noteCategory) => {
            return noteCategory._id != id
        })

        setNotes(() => newNotesCategories)

        const body = JSON.stringify({
            categoryId : id
        })
        try {
            const response = await fetch('/api/stickynotes/deletecategory',{method:'POST',body:body})
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
            setTimeout(() => window.location.reload(),2000)
        }
    }

    return (
        <div 
            id={`${eachCategory.category}`}
            className=" relative z-10 border p-1 rounded-lg flex flex-col gap-3 flex-wrap 
                        max-w-[300px] max-h-[500px] min-h-[200px] min-w-[200px]
                        shadow-md bg-gray-50 
                        hover:scale-110 hover:shadow-xl hover:bg-gray-100 transition ease-in-out delay-50
                    "
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

                <button className=" scale-75 hover:scale-100" title="options"
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

                        <button  className="border p-2 rounded w-full bg-gray-200" title="delete"
                                onClick={() => handleDeleteCategory(eachCategory._id) }
                        >🗑️ delete</button>
                        <button className="border p-2 rounded bg-gray-200" title="rename"
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

            <div 
                className={`flex flex-wrap justify-evenly items-center gap-5`}
            >
                {
                    eachCategory.notes.map((eachnote,index) => {
                        if (index < 3){
                            return (
                            <EachNote 
                                key={index} 
                                eachnote={eachnote} 
                                noteCategory = {eachCategory}
                                index={index} 
                                minHeight="150px" 
                                minWidth="100px" 
                                textSize={1}
                                maximise={false}
                            />
                        )
                        }
                    })
                    
                }
            </div>
                
            <div className='absolute w-full bottom-2 z-100 flex justify-between items-center mt-auto '>  
                <button className="hover:scale-125 rounded-full  border bg-gray-200 p-1 border border-gray-500"
                     onClick =  {() => {
                                        router.push(`stickynotes/${eachCategory._id}`)
                                    } 
                                }
                    title="maximise" 
                >
                    <Maximize className="scale-75"/>  
                </button>   
            </div>
            
        </div>
    );
}