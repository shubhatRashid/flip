// app/auth/signin/page.tsx
"use client";
import { signIn } from "next-auth/react";
import { Clock, Timer, AlarmClock, StickyNote, ListTodo, Lightbulb } from "lucide-react";
import Robot from "./Robot";
import Features from "./Features";
import Contact from "./Contact";

const features = [
  {
    icon: Clock,
    title: "Clock",
    description: "Keep track of time across different time zones",
  },
  {
    icon: AlarmClock,
    title: "Stopwatch",
    description: "Measure elapsed time for your tasks with precision",
  },
  {
    icon: Timer,
    title: "Countdown",
    description: "Set timers for focused work sessions",
  },
  {
    icon: StickyNote,
    title: "Sticky Notes",
    description: "Quick notes and reminders at your fingertips",
  },
  {
    icon: ListTodo,
    title: "Todo Lists",
    description: "Organize and track your tasks efficiently",
  },
  {
    icon: Lightbulb,
    title: "AI Task Breakdown",
    description: "Automatically break down complex tasks into manageable steps",
  },
];

const SignInPage = () => {



  return (
    
    <div className="flex flex-col  justify-center items-center gap-10 w-full mt-5">
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 h-full bg-gray-50">
            <div className="flex flex-col gap-10 w-full justify-center items-center h-full">
              <div className="flex flex-col md:flex-row  gap-5  w-full h-[30%] justify-center items-center">
                <p className="flex text-9xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Flip</p>
                <p className="text-sm font-italic pl-2 capitalize mt-auto text-gray-500">An all in one productivity app ... </p>
              </div>

              <div className="flex flex-wrap gap-5 justify-center items-center h-[40%] w-full">
                <div className="bg-white p-4 rounded-xl shadow-sm w-full md:w-[40%] h-[40%]">
                  <h3 className="font-bold text-purple-700">F – Focus</h3>
                  <p className="text-gray-600">Stay on track and eliminate distractions.</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm w-full md:w-[40%] h-[40%]">
                  <h3 className="font-bold text-purple-700">L – Leverage</h3>
                  <p className="text-gray-600">Maximize your time and tools effectively.</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm w-full md:w-[40%] h-[40%]">
                  <h3 className="font-bold text-purple-700">I – Intention</h3>
                  <p className="text-gray-600">Work with purpose and clarity.</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm w-full md:w-[40%] h-[40%]">
                  <h3 className="font-bold text-purple-700">P – Progress</h3>
                  <p className="text-gray-600">Track your achievements and grow consistently.</p>
                </div>
              </div>

            </div>
            <button className="w-full rounded-lg"
              onClick={() => signIn('google')}>  
              <Robot/>
            </button>
          </div>
          <Features/>
          <Contact/>
          <button 
              className="absolute flex justify-center items-center 
              w-[50px] md:w-[70px] h-[25px] md:h-[35px] 
              top-2 right-2 md:right-5 
              bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-2 py-1 
              rounded-md text-white font-bold"
              onClick={() => signIn('google')}>  
              Login
          </button>
    </div>
  );
};

export default SignInPage;
