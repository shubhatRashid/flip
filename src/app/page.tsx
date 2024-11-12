"use client";
import { useSession} from "next-auth/react";
import { time,todo,stopwatch,countdown,notes } from "../../assets";
import SignInPage from "@/components/SignInPage";
import CountDownModel from "@/components/CountDownModel";
import { useState } from "react";
import HomeCard from "@/components/HomeCard";

const ProtectedPage = () => {
  const { data: session } = useSession();
  const [showCountDown,setShowCountDown] = useState(false)

  if (!session) {
    return <SignInPage/>
  }

  return (
    <div className="flex flex-wrap justify-evenly items-center  w-full gap-5">
      <HomeCard  currImage={time} name='CLOCK'   property="/clock" /> 
      <HomeCard currImage={stopwatch} name='STOP WATCH' property = '/stopwatch' />
      <HomeCard currImage={countdown} name = 'COUNT DOWN' property={setShowCountDown}/>
      <HomeCard currImage={todo} name='TODO LIST' property = '/todolist'/>
      <HomeCard currImage={notes} name='NOTES' property = '/notes'/>

        {
          showCountDown && <CountDownModel setShowCountDown={setShowCountDown}/>
        }
      

    </div>
  );
};

export default ProtectedPage;
