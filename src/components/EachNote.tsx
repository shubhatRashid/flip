import { Note } from "@/utils/data";
import { Permanent_Marker,Caveat } from 'next/font/google'; 
const permanent_Marker = Permanent_Marker({weight:'400', subsets: ['latin'] })
const caveat = Caveat({weight:'700', subsets: ['latin'] })

export default function EachNote(
    {eachnote,index} : {eachnote:Note,index:number}
) {
    const color = ['#D2FF72','#9EDF9C','#FFE31A','#7ED4AD','#A5B68D']
    return (
        <div 
            className='relative flex flex-col border p-2'
            style={
                {
                    backgroundColor: eachnote.color,
                    rotate: index % 2 === 0 ? `${-index*3 -2}deg` : `${index*3 + 2}deg`
                }
            }
        >   
            <h1 className={` ${permanent_Marker.className} text-sm font-serif font-bold border-b`}>{eachnote.notetitle}</h1>
            <span className={` ${caveat.className} flex flex-wrap max-w-[100px] text-xs`}>{eachnote.notedescription}</span>
        </div>
    );
}