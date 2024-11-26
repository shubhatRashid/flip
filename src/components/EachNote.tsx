import { Note } from "@/utils/data";
import { SquarePen } from "lucide-react";
import { Permanent_Marker,Caveat } from 'next/font/google'; 
import AddNoteDialogBox from "./AddNoteDialogbox";
const EditNoteDialogBox = AddNoteDialogBox
const permanent_Marker = Permanent_Marker({weight:'400', subsets: ['latin'] })
const caveat = Caveat({weight:'700', subsets: ['latin'] })

export default function EachNote(
    {eachnote,index,minHeight,minWidth,textSize,maximise} : {eachnote:Note,index:number,minHeight:string,minWidth:string,textSize:number,maximise:boolean}
) {
   const handleEditNote = (title:string,description:string,color:string,textColor:string) => {
    console.log(title,description,color,textColor)
   }
   
    return (
        <div
            className="relative flex flex-col border p-2
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