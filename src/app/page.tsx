"use client";
import { useSession, signOut } from "next-auth/react";
import { time,todo,stopwatch,countdown } from "../../assets";
import SignInPage from "@/components/SignInPage";
import CountDownModel from "@/components/CountDownModel";
import { useState } from "react";
import HomeCard from "@/components/HomeCard";
import { useRouter } from "next/navigation";

const ProtectedPage = () => {
  const router = useRouter()
  const { data: session } = useSession();
  const [showCountDown,setShowCountDown] = useState(false)

  if (!session) {
    return <SignInPage/>
  }

  return (
    <div className="flex flex-wrap justify-center items-center w-full h-full gap-5 text-teal-500">
      <HomeCard  currImage={time} name='CLOCK'   property="/clock" /> 
      <HomeCard currImage={stopwatch} name='STOP WATCH' property = '/stopwatch' />
      <HomeCard currImage={countdown} name = 'COUNT DOWN' property={setShowCountDown}/>
      <HomeCard currImage={todo} name='TODO LIST' property = '/todolist'/>

        {
          showCountDown && <CountDownModel setShowCountDown={setShowCountDown}/>
        }
      

    </div>
  );
};

export default ProtectedPage;
