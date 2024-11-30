'use client'
import { Digit,Loader,SignInPage } from "@/components";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Page(
  { params }: { params: Promise<{ countTime: number }> }
) {
  const {data:session,status} = useSession()
  // Resolve the params Promise inside useEffect
  const [time, setTime] = useState<number | null>(null);
  
  
  // Resolve params only once when the component mounts
  useEffect(() => {
    const resolveParams = async () => {
      const { countTime } = await params;  // Wait for params to resolve
      setTime(countTime);  // Set the initial time value
    };
    resolveParams();
  }, [params]);

  // Ensure timer logic is run only when 'time' is set
  useEffect(() => {
    if (time !== null) {
      const interval = setInterval(() => {
        setTime((prevTime) => (prevTime !== null && prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [time]);

  if (time === null || status === 'loading') {
    return <Loader/>;
  }

  if (status === 'unauthenticated'){
    return <SignInPage/>
  }
  
  // Calculate hours, minutes, and seconds
  let hours = Math.floor(time / 3600).toString().padStart(2, '0');
  let minutes = Math.floor((time - Number(hours) * 3600) / 60).toString().padStart(2, '0');
  let seconds = (time % 60).toString().padStart(2, '0');

  return (
    <div className="flex w-full h-[20%] sm:h-[30%] md:h-[40%] lg:h-[50%] xl:h-[60%] justify-evenly items-center px-[10%] gap-3">
      <div className="flex flex-col w-full h-full justify-center items-center gap-3">
        <div className="flex w-full h-[90%] justify-center items-center gap-1">
          <Digit value={hours[0]} width={1} />
          <Digit value={hours[1]} width={1} />
        </div>
        <div className="flex w-full h-[10%] justify-center items-center">
          <h1 className="font-mono">HOURS</h1>
        </div>
      </div>

      <div className="flex flex-col w-full h-full justify-center items-center gap-3">
        <div className="flex w-full h-[90%] justify-center items-center gap-1">
          <Digit value={minutes[0]} width={1} />
          <Digit value={minutes[1]} width={1} />
        </div>
        <div className="flex w-full h-[10%] justify-center items-center">
          <h1 className="font-mono">MINUTES</h1>
        </div>
      </div>

      <div className="flex flex-col w-full h-full justify-center items-center gap-3">
        <div className="flex w-full h-[90%] justify-center items-center gap-1">
          <Digit value={seconds[0]} width={1} />
          <Digit value={seconds[1]} width={1} />
        </div>
        <div className="flex w-full h-[10%] justify-center items-center">
          <h1 className="font-mono">SECONDS</h1>
        </div>
      </div>
    </div>
  );
}
