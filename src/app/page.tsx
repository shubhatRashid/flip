"use client";
<<<<<<< HEAD
import { useSession} from "next-auth/react";
import { time,todo,stopwatch,countdown,notes } from "../../assets";
import SignInPage from "@/components/SignInPage";
import CountDownModel from "@/components/CountDownModel";
import { useState } from "react";
import HomeCard from "@/components/HomeCard";

const ProtectedPage = () => {
  const { data: session } = useSession();
=======
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { time,todo,stopwatch,countdown } from "../../assets";
import SignInPage from "@/components/SignInPage";
import CountDownModel from "@/components/CountDownModel";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ProtectedPage = () => {
  const { data: session } = useSession();
  const router = useRouter()
>>>>>>> main
  const [showCountDown,setShowCountDown] = useState(false)

  if (!session) {
    return <SignInPage/>
  }

  return (
<<<<<<< HEAD
    <div className="flex flex-wrap justify-evenly items-center  w-full gap-5">
      <HomeCard  currImage={time} name='CLOCK'   property="/clock" /> 
      <HomeCard currImage={stopwatch} name='STOP WATCH' property = '/stopwatch' />
      <HomeCard currImage={countdown} name = 'COUNT DOWN' property={setShowCountDown}/>
      <HomeCard currImage={todo} name='TODO LIST' property = '/todolist'/>
      <HomeCard currImage={notes} name='NOTES' property = '/notes'/>

        {
          showCountDown && <CountDownModel setShowCountDown={setShowCountDown}/>
=======
    <div className="flex flex-wrap justify-center items-center gap-10">
      <button 
        className="flex flex-col gap-5 justify-center items-center border p-5 rounded-xl font-bold font-serif"
        onClick={() => router.push('/clock')}>
        <h2>CLOCK</h2>
        <Image src={time.src} alt="time" width={100} height={100} />
      </button>


      <button 
        className="flex flex-col gap-5 justify-center items-center border p-5 rounded-xl font-bold font-serif"
        onClick={() => router.push('/stopwatch')}>
        <h2>STOPWATCH</h2>
        <Image src={stopwatch.src} alt="time" width={100} height={100} />
      </button>


      <button 
        className="flex flex-col gap-5 justify-center items-center border p-5 rounded-xl font-bold font-serif"
        onClick={() => setShowCountDown(true)}>
        <h2>COUNTDOWN</h2>
        <Image src={countdown.src} alt="time" width={100} height={100} />
      </button>


      <button 
        className="flex flex-col gap-5 justify-center items-center border p-5 rounded-xl font-bold font-serif"
        onClick={() => router.push('/todolist')}>
        <h2>TODO</h2>
        <Image src={todo.src} alt="time" width={100} height={100} />
      </button>

        {
            showCountDown && <CountDownModel setShowCountDown={setShowCountDown}/>
>>>>>>> main
        }
      

    </div>
  );
};

export default ProtectedPage;
