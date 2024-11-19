import { Note } from "@/utils/data";

export default function EachNote(
    {eachnote} : {eachnote:Note}
) {
    return (
        <div className="flex flex-col border rounded-lg p-2">
            <h1 className="text-sm font-serif font-bold border-b">{eachnote.notetitle}</h1>
            <span className="flex flex-wrap max-w-[100px] text-xs">{eachnote.notedescription}</span>
        </div>
    );
}