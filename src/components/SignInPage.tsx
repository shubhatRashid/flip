// app/auth/signin/page.tsx
"use client";
import { signIn } from "next-auth/react";

const SignInPage = () => {
  return (
<<<<<<< HEAD
    <div id="signin" className="flex gap-10 w-full h-full items-center justify-center border">

      <div  className="hidden md:flex flex-col h-full w-full">
      </div>

      <div className="relative flex flex-col w-full h-full font-serif justify-center items-center gap-10">
        <div className="flex flex-col gap-3 border rounded-xl p-3">
          <p className="flex text-9xl typewriter">Flip</p>
          <p className="text-sm typewriter font-italic pl-2 capitalize">An all in one productivity app ... </p>
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
      
=======
    <div id = 'signin' className="flex flex-1 gap-10 w-full h-full items-end pb-2 justify-center rounded-xl">
        
      <button
        onClick={() => signIn("google")}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sign in with Google
      </button>
>>>>>>> main
        
    </div>
  );
};

export default SignInPage;
