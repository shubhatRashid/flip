// app/auth/signin/page.tsx
"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import flipbg from "../../assets/flip.jpg"
import { Container } from "postcss";

const SignInPage = () => {
  return (
    <div className="flex flex-wrap gap-10 w-full h-full items-center justify-center">
      <div className="flex justify-start items-center">
        <button
          onClick={() => signIn("google")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
