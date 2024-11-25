// app/auth/signin/page.tsx
"use client";
import { signIn } from "next-auth/react";


const SignInPage = () => {


  return (
    <div  className="flex gap-10 w-full h-full items-center justify-center border">

      <div id="signin" className="hidden md:flex flex-col h-full w-full">
      </div>

      <div className="relative flex flex-col w-full h-full font-serif justify-center items-center gap-10">
        <div className="flex flex-col gap-3 ">
          <p className="flex text-9xl">Flip</p>
          <p className="text-sm font-italic pl-2 capitalize text-gray-400">An all in one productivity app ... </p>
        </div>

        <div className="border border-4 animate-bounce hover:animate-none rounded-full">
          <button
            onClick={() => signIn("google")}
            className="flex h-[100px] w-[100px] justify-center items-center bg-blue-500 text-white px-4 py-2 
                      rounded-full"
          >
            Google Sign In 
          </button>
        </div>

        <p className="absolute bottom-1 right-2 text-xs animate-pulse">Developer : Shubhat Rashid</p>
      </div>
      
        
    </div>
  );
};

export default SignInPage;
