// app/auth/signin/page.tsx
"use client";
import { signIn } from "next-auth/react";

const SignInPage = () => {
  return (
    <div id = 'signin' className="flex flex-1 gap-10 w-full h-full items-end pb-2 justify-center rounded-xl">
        
      <button
        onClick={() => signIn("google")}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sign in with Google
      </button>
        
    </div>
  );
};

export default SignInPage;
