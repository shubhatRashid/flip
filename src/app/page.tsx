"use client";
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
  const [showCountDown,setShowCountDown] = useState(false)

  if (!session) {
    return <SignInPage/>
  }

  return (
    <div className="flex gap-10">
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
        }
      

    </div>
  );
};

export default ProtectedPage;
