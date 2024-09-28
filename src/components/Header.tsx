'use client'
import { useState } from "react";
import left from "../../assets/left.png"
import { useRouter } from "next/navigation";
export default function Header() {
    const router = useRouter()

    const [showNav,setShowNav] = useState(false)
    const [showCountDown,setShowCountDown] = useState(false)
    const [hours,setHours] = useState(0)
    const [minutes,setMinutes] = useState(0)
    const [seconds,setSeconds] = useState(0)
    const handleStart = () => {
        const time = hours*3600+minutes*60+seconds
        router.push(`/countdown/${time}`)
        setShowCountDown(false)
        setShowNav(false)
    }
    return (
        <div className="flex w-full justify-between h-[6%] my-3 px-5">
            <div className="flex justify-center items-center bg-neutral-800 rounded-xl w-[10%]">
                <h1>Flip Clock</h1>
            </div>
            <button 
                className="flex justify-center items-center bg-neutral-800 rounded-xl w-[3%]"
                onClick={() => setShowNav(true)}>
                <img  src={left.src} alt="Navbar" className="object-cover"/>
            </button>

            {
                showNav &&
                <div 
                    className="absolute right-0 top-[-0.5%] w-[10%] bg-neutral-800 h-screen flex 
                                flex-col justify-start items-start py-5 px-5 gap-5 font-serif">
                    <h1 className="font-bold text-3xl border-b-2">Navbar</h1>
                    <button 
                        className="p-1 border rounded-xl w-full "
                        onClick={() => setShowCountDown(!showCountDown)}>CountDown</button>
                    <button 
                        className="absolute bottom-0 left-0 flex justify-center items-center border rounded-xl p-1 w-full "
                        onClick={() => setShowNav(false)}
                    >Close</button>
                </div>
            }

            {
                showCountDown && 
                <div 
                    className="absolute top-[15%] left-[25%] w-[50%] h-[70%] 
                               bg-neutral-700 flex flex-col justify-around items-center gap-10 
                               p-10 rounded-xl"
                >   
                <div className="flex justify-center items-center w-full h-full gap-10">
                    <div className="flex flex-col h-full w-[30%] rounded-xl justify-center items-center">
                        <label for='hours'> HOURS</label>
                        <input 
                            name="hours"
                            type="number" min= {0} max ={60} 
                            className="flex w-full h-full rounded-xl justify-center items-center text-9xl
                                    bg-neutral-800"
                            value={hours}
                            onChange={(event) => setHours(event.target.value)}
                        />
                    </div>
                    <div className="flex flex-col h-full w-[30%] rounded-xl justify-center items-center">
                        <label for='hours'> MINUTES</label>
                        <input 
                            name="minutes"
                            type="number" min= {0} max ={60} 
                            className="flex w-full h-full rounded-xl justify-center items-center text-9xl
                                    bg-neutral-800"
                            value={minutes}
                            onChange={(event) => setMinutes(event.target.value)}
                        />
                    </div>
                    <div className="flex flex-col h-full w-[30%] rounded-xl justify-center items-center">
                        <label for='hours'> SECONDS</label>
                        <input 
                            name="seconds"
                            type="number" min= {0} max ={60} 
                            className="flex w-full h-full rounded-xl justify-center items-center text-9xl
                                    bg-neutral-800"
                            value={seconds}
                            onChange={(event) => setSeconds(event.target.value)}
                        />
                    </div>
                </div>
                <div className="flex w-full justify-center items-center rounded-xl border p-3 bg-neutral-800">
                    <button className="font-bold text-2xl font-serif" onClick={handleStart}>
                        Start 
                    </button>
                </div>
                </div>
            }
            
        </div>
    );
}