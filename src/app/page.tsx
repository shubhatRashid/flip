"use client";
import { time,todo,stopwatch,countdown,notes as notesImage ,aitasker, pomodoro} from "../../assets";
import SignInPage from "@/components/SignInPage";
import CountDownModel from "@/components/CountDownModel";
import { useState,useEffect } from "react";
import HomeCard from "@/components/HomeCard";
import { Loader } from "@/components";
import { useAppContext } from "@/utils/context/AppContext";

const ProtectedPage = () => {
  const { authStatus } = useAppContext()
  const [showCountDown,setShowCountDown] = useState(false)

  if (authStatus === 'loading'){
    return <Loader/>
  }

  if (authStatus === 'unauthenticated') {
    return <SignInPage/>
  }

  return (
    <div className="flex flex-wrap justify-evenly items-center  w-full gap-5">
      <HomeCard currImage={aitasker} name='AI TASKER' property = '/aitasker'/>
      <HomeCard currImage={pomodoro} name='POMODORO' property = '/pomodoro'/>
      <HomeCard currImage={todo} name='TODO LIST' property = '/todolist'/>
      <HomeCard currImage={notesImage} name='STICKY NOTES' property = '/stickynotes'/>
      <HomeCard currImage={stopwatch} name='STOP WATCH' property = '/stopwatch' />
      <HomeCard currImage={countdown} name = 'COUNT DOWN' property={setShowCountDown}/>
      <HomeCard  currImage={time} name='CLOCK'   property="/clock" /> 
      
      

        {
          showCountDown && <CountDownModel setShowCountDown={setShowCountDown}/>
        }
      

    </div>
  );
};

export default ProtectedPage;
