import { Note } from "@/utils/data";
import { Permanent_Marker,Caveat } from 'next/font/google'; 
const permanent_Marker = Permanent_Marker({weight:'400', subsets: ['latin'] })
const caveat = Caveat({weight:'700', subsets: ['latin'] })

export default function EachNote(
    {eachnote,index,minHeight,minWidth,textSize} : {eachnote:Note,index:number,minHeight:string,minWidth:string,textSize:number}
) {
   
    return (
        <div
            className="relative flex flex-col border p-2 
                        hover:scale-125 hover:cursor-pointer transition ease-in-out delay-50"
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
        </div>
    );
}