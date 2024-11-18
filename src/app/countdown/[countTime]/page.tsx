'use client'
import { Digit } from "@/components";
import { useEffect, useState } from "react";

export default function Page(
    {params}:{params:{countTime:number}}
    ) {
   
    const [time,setTime] = useState(params.countTime)
    let hours = Math.floor(time/3600).toString().padStart(2,'0')
    let minutes = Math.floor((time - Number(hours)*3600 )/60).toString().padStart(2,'0')
    let seconds = (time%60).toString().padStart(2,'0')
    
    useEffect(()=>{
        var interval = setInterval(() => { 
            if (time > 0){
                setTime((time) => time-1)
            }else{
                clearInterval(interval)
            }
        },1000)

        return () => clearInterval(interval)
    },[time])
    
    return (
        <div className="flex w-full h-[20%] sm:h-[30%] md:h-[40%] lg:h-[50%] xl:h-[60%] justify-evenly items-center px-[10%] gap-3">

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

        </div>
    );
}