'use client'
import { useSession } from "next-auth/react";
import SignInPage from "@/components/SignInPage";
export default function Page() {
    const { data: session } = useSession();

    if (!session){
        return <SignInPage />
    }

    return (
        <div>
            Coming soon
        </div>
    );
}