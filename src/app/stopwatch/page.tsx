'use client'
import { Digit } from "@/components";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SignInPage from "@/components/SignInPage";

export default function Page() {
    const {data:session} = useSession()
    const [start,setStart] = useState(false)
    const [time,setTime] = useState(0)
    let hours = Math.floor(time/3600).toString().padStart(2,'0')
    let minutes = Math.floor((time - Number(hours)*3600 )/60).toString().padStart(2,'0')
    let seconds = (time%60).toString().padStart(2,'0')
    
    const reset = () => {
        setTime(0)
        setStart(false)
    }

    useEffect(()=>{
        var interval = setInterval(() => { 
            if (start){
                setTime((time) => time+1)
            }else{
                clearInterval(interval)
            }
        },1000)

        return () => clearInterval(interval)
    },[start])
    
    if (!session){
        return <SignInPage />
    }
    
    return (
        <div className="flex  w-full h-[20%] sm:h-[30%] md:h-[40%] lg:h-[50%] xl:h-[60%] justify-evenly items-center px-[10%] gap-3">

            <div className="flex flex-col w-full h-full justify-center items-center gap-3">
                <div  className="flex w-full h-[90%] justify-center items-center gap-1">
                    <Digit value = {hours[0]} width={1}/>
                    <Digit value = {hours[1]} width={1}/>
                </div>
                <div className="flex w-full h-[10%] justify-center items-center">
                    <h1 className="font-mono">HOURS</h1>
                </div>
            </div>

            <Digit value = {':'} width={0.5}/>

            <div className="flex flex-col w-full h-full justify-center items-center gap-3">
                <div  className="flex w-full h-[90%] justify-center items-center gap-1">
                    <Digit value = {minutes[0]} width={1}/>
                    <Digit value = {minutes[1]} width={1}/>
                </div>
                <div className="flex w-full h-[10%] justify-center items-center">
                    <h1 className="font-mono">MINUTES</h1>
                </div>
            </div>

            <Digit value = {":"} width={0.5}/>

            <div className="flex flex-col w-full h-full justify-center items-center gap-3">
                <div  className="flex w-full h-[90%] justify-center items-center gap-1">
                    <Digit value = {seconds[0]} width={1}/>
                    <Digit value = {seconds[1]} width={1}/>
                </div>
                <div className="flex w-full h-[10%] justify-center items-center">
                    <h1 className="font-mono">SECONDS</h1>
                </div>
            </div>

             <div className=" absolute bottom-[5%] flex justify-center items-center">
                <div  className="flex p-2 w-full h-full justify-evenly items-center gap-5 bg-gray-100 rounded-xl">
                    <button 
                        className="border rounded-xl p-2 font-bold font-serif" 
                        onClick={() => !start? setStart(true):setStart(false)}
                    >   {start? 'STOP' : 'START'}</button>
                    <button 
                        className="border rounded-xl p-2 font-bold font-serif" 
                        onClick={reset}>Reset</button>
                </div>
            </div>

        </div>
    );
}