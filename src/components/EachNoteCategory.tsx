import { NoteCategory } from "@/utils/data";
import EachNote from "./EachNote";

export default function EachNoteCategory({eachCategory}:{eachCategory:NoteCategory}) {
    return (
        <div className="border p-2 rounded-lg flex flex-col gap-5 flex-wrap max-w-[300px] max-h-[500px] 
                        shadow-md bg-gray-50 hover:shadow-xl hover:bg-gray-100">
            <h1 className="flex font-bold font-mono border-b text-xl">{eachCategory.category}</h1>
            <div className="flex flex-wrap justify-evenly items-center gap-5">
                {
                    eachCategory.notes.map((eachnote,index) => (
                        <EachNote key={index} eachnote={eachnote}/>
                    ))
                }
            </div>
        </div>
    );
}