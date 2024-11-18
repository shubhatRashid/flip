import { MouseEventHandler, useState,Dispatch,SetStateAction } from "react";
var openDialog :boolean;
var setOpenDialog: Dispatch<SetStateAction<boolean>>;

function handleDialog(){
    setOpenDialog(!openDialog)
}

function Dialog(
    {
        title,
        description,
        proceedFunc
    } : {
        title : string,
        description : string,
        proceedFunc : Function
    }) {
    
    [openDialog,setOpenDialog] = useState(false)
    return (
         openDialog && 
        <div 
            className="fixed top-[30%] bottom-[30%] 
                        left-[15%]  right-[15%] sm: left-[20%]  right-[20%] md: left-[25%]  right-[25%]  lg : left-[30%]  right-[30%]
                        font-mono p-5 z-10 bg-gray-100  
                        flex flex-col justify-between  max-w-[75%] items-start gap-5 rounded-lg ">
            <h2 className="font-bold text-xl capitalize">{title}</h2>
            <span className="text-md font-sans text-gray-500 w-[90%]">{description}</span>
            <div className="flex w-full justify-end gap-5">
                <button className="border p-2 rounded-lg bg-gray-200" onClick={() => setOpenDialog(false)}>Cancel</button>
                <button className="border p-2 rounded-lg bg-black text-white" onClick={() => proceedFunc()}>Proceed</button>
            </div>
        </div>
    );
}

export {Dialog,handleDialog}