import { NoteCategory } from "@/utils/data";
import EachNote from "./EachNote";
import { FolderPen } from "lucide-react";

export default function EachNoteCategory({eachCategory}:{eachCategory:NoteCategory}) {
    
    return (
        <div className=" relative border p-2 rounded-lg flex flex-col gap-5 flex-wrap max-w-[300px] max-h-[500px] 
                        shadow-md bg-gray-50 hover:shadow-xl hover:bg-gray-100">
            <button className="absolute right-2">
                <FolderPen/>
            </button>
            <h1 className='flex font-mono font-bold border-b text-xl'>{eachCategory.category}</h1>
            <div className="flex flex-wrap justify-evenly items-center gap-5" id="eachtaskparent">
                {
                    eachCategory.notes.map((eachnote,index) => (
                        <EachNote key={index} eachnote={eachnote} index={index}/>
                    ))
                }
            </div>
        </div>
    );
}