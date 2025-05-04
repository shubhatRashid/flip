'use client'
import { Digit,SignInPage,Loader} from "@/components";
import { useEffect, useState } from "react";
import { BotMessageSquare,Pause, Play, TimerReset } from "lucide-react";
import AlertDialogBox from "@/components/AlertDialog";
import { playSound } from "@/utils/functions";
import { useAppContext } from "@/utils/context/AppContext";

export default function Page() {
    const [currStatus,setCurrStatus] = useState('work')
    const [cycle,setCycle] = useState(0)
    const stages = [[1500,300],[1500,300],[1500,300],[1500,1800]]

    const {authStatus} = useAppContext()
    const [start,setStart] = useState(false)
    const [time,setTime] = useState(stages[cycle][0])
    const [openDialog,setOpenDialog] = useState(false)

    const workPhrases = [
        "Start strong, every second counts.",
        "Stay focused — distractions can wait.",
        "Discipline turns goals into daily habits.",
        "Consistency compounds faster than you think."
      ]

    const breakPharases =  [
        "Breathe deeply, you've earned this pause.",
        "Relax now, results are building quietly.",
        "Small rests fuel big comebacks ahead.",
        "Great job — take a real break.",
      ]
      
      

    let hours = Math.floor(time/3600).toString().padStart(2,'0')
    let minutes = Math.floor((time - Number(hours)*3600 )/60).toString().padStart(2,'0')
    let seconds = (time%60).toString().padStart(2,'0')
    
    const reset = () => {
        setCycle(() => 0)
        setTime(stages[cycle][0])
        setStart(false)
        setCurrStatus('work')
    }

    useEffect(()=>{
        var interval = setInterval(() => { 
            if (start){
                if (time === 0 && currStatus === 'work'){
                    setCurrStatus('break')
                    setTime(stages[cycle][1])
                    setStart(false)
                    setOpenDialog(true)
                    playSound('/sounds/alertSound.wav')
                }
                else if (time === 0 && currStatus === 'break'){
                    const nextCycle = cycle + 1 >= stages.length ? 0 : cycle + 1;
                    setCurrStatus('work')
                    setCycle(nextCycle)
                    setTime(stages[cycle][0])
                    setStart(false)
                    setOpenDialog(true)
                    playSound('/sounds/alertSound.wav')
                }else{
                    setTime((time) => time - 1)
                }
            }else{
                clearInterval(interval)
            }
        },1000)

        return () => clearInterval(interval)
    },[time,start])
    
    if (authStatus === 'loading') return <Loader/>
    if (authStatus === 'unauthenticated') return <SignInPage/>

    return (
        <div className="relative flex flex-col w-full h-[90dvh] justify-evenly items-center px-[10%]">
            <AlertDialogBox 
                title={currStatus == 'work'? 'Start Pomodoro / Work session': cycle < 3 ? 'Take a short Break' : 'Take a long Break. You deserve it.'} 
                description={currStatus === 'break'? breakPharases[cycle] :workPhrases[cycle]} 
                open={openDialog} 
                setOpen={setOpenDialog}
                continueAction={() => setStart(true)}
                buttonName = {`Start ${currStatus}`} />
            <div 
                className="flex flex-col mr-auto justify-start items-start text-sm sm:text-md
                            border rounded-md p-2 capitalize shadow-md bg-gray-50 font-mono
                             bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
                <span className="flex justify-center items-center gap-2">
                   <p className="font-bold">Cycle</p>: 0{cycle + 1}
                </span>
                <span className="flex">
                   <p className="font-bold">Status</p> : {currStatus === 'work' ? 'pomodoro / work session' : cycle < 3? 'short break':'long break'}
                </span>
                <span className="font-bold mt-5 border-t flex flex gap-1 justify-center items-center">  
                    <BotMessageSquare className="bg-white text-black" size={20}/> {currStatus === 'work' ? workPhrases[cycle] : breakPharases[cycle]}
                </span>
                        
            </div>
            <div className="flex sm:flex-row w-full h-[50%] justify-evenly items-start flex-col ">  

                <div className="flex flex-col w-full h-full justify-center items-center gap-3">
                    <div  className="flex w-full h-[90%] justify-center items-center gap-1">
                        <Digit value = {minutes[0]} width={1}/>
                        <Digit value = {minutes[1]} width={1}/>
                    </div>
                    <div className="flex w-full h-[10%] justify-center items-center">
                        <h1 className="font-mono">MINUTES</h1>
                    </div>
                </div>

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

            <div className="absolute bottom-0 flex justify-between items-center w-full px-10 sm:px-20 ">
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