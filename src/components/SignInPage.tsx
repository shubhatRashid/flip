// app/auth/signin/page.tsx
"use client";
import { signIn } from "next-auth/react";

const SignInPage = () => {
  return (
    <div id = 'signin' className="flex gap-10 w-full min-h-[500px] items-end pb-2 justify-center rounded-xl">
        
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
