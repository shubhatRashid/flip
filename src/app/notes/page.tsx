'use client'
import { useSession } from "next-auth/react";
import { SignInPage,Loader } from "@/components";

export default function Page() {
    const {data:session,status} = useSession()
    if (status === 'loading') return <Loader/>
    if (status === 'unauthenticated') return <SignInPage/>
    
    return (
        <div>
            Coming soon
        </div>
    );
}