"use client";
import { useSession} from "next-auth/react";
import { time,todo,stopwatch,countdown,notes as notesImage } from "../../assets";
import SignInPage from "@/components/SignInPage";
import CountDownModel from "@/components/CountDownModel";
import { useState,useEffect } from "react";
import HomeCard from "@/components/HomeCard";
import { Loader } from "@/components";

const ProtectedPage = () => {
  const { data: session,status } = useSession();
  const [showCountDown,setShowCountDown] = useState(false)

  if (status === 'loading'){
    return <Loader/>
  }

  if (status === 'unauthenticated') {
    return <SignInPage/>
  }

  return (
    <div className="flex flex-wrap justify-evenly items-center  w-full gap-5">
      <HomeCard  currImage={time} name='CLOCK'   property="/clock" /> 
      <HomeCard currImage={stopwatch} name='STOP WATCH' property = '/stopwatch' />
      <HomeCard currImage={countdown} name = 'COUNT DOWN' property={setShowCountDown}/>
      <HomeCard currImage={todo} name='TODO LIST' property = '/todolist'/>
      <HomeCard currImage={notesImage} name='STICKY NOTES' property = '/stickynotes'/>

        {
          showCountDown && <CountDownModel setShowCountDown={setShowCountDown}/>
        }
      

    </div>
  );
};

export default ProtectedPage;
