'use client'
import { Digit,SignInPage,Loader} from "@/components";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Pause, Play, TimerReset } from "lucide-react";

export default function Page() {
    const {data:session,status} = useSession()
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
    
    if (status === 'loading') return <Loader/>
    if (status === 'unauthenticated') return <SignInPage/>

    return (
        <div className="flex flex-col sm:flex-row  w-full h-screen justify-evenly items-center px-[10%] gap-5 pt-5">

            <div className="flex flex-col w-full h-[50%] justify-center items-center gap-3">
                <div  className="flex w-full h-[90%] justify-center items-center gap-1">
                    <Digit value = {hours[0]} width={1}/>
                    <Digit value = {hours[1]} width={1}/>
                </div>
                <div className="flex w-full h-[10%] justify-center items-center">
                    <h1 className="font-mono">HOURS</h1>
                </div>
            </div>

            <div className="flex flex-col w-full h-[50%] justify-center items-center gap-3">
                <div  className="flex w-full h-[90%] justify-center items-center gap-1">
                    <Digit value = {minutes[0]} width={1}/>
                    <Digit value = {minutes[1]} width={1}/>
                </div>
                <div className="flex w-full h-[10%] justify-center items-center">
                    <h1 className="font-mono">MINUTES</h1>
                </div>
            </div>

            <div className="flex flex-col w-full h-[50%] justify-center items-center gap-3">
                <div  className="flex w-full h-[90%] justify-center items-center gap-1">
                    <Digit value = {seconds[0]} width={1}/>
                    <Digit value = {seconds[1]} width={1}/>
                </div>
                <div className="flex w-full h-[10%] justify-center items-center">
                    <h1 className="font-mono">SECONDS</h1>
                </div>
            </div>

             <div className=" absolute bottom-5 flex justify-between items-center w-full p-10 sm:p-20">
                    <button 
                        className="border rounded-xl p-2 font-bold font-serif hover:bg-gray-100 hover:scale-110" 
                        title="reset"
                        onClick={reset}
                    >
                        <TimerReset />
                    </button>

                    <button 
                        className="border rounded-xl p-2 font-bold font-serif hover:bg-gray-100 hover:scale-110" 
                        onClick={() => !start? setStart(true):setStart(false)}
                        title= {start? 'pause' : 'play' }
                    >   
                        {start? <Pause/> : <Play/> }
                    </button>
                    
            </div>

        </div>
    );
}