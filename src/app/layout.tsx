'use client'
import "../global.css"
<<<<<<< HEAD
import { Header} from "../components"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "@/components/ui/toaster"
=======
import { Header,Footer } from "../components"
import { SessionProvider } from "next-auth/react"
>>>>>>> main

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
<<<<<<< HEAD
      <body className="relative flex flex-col w-[100dvw] h-[100dvh] justify-between items-center">
        <SessionProvider>
          <Toaster />
          <Header/>
            <div className="flex w-full h-full justify-center items-center p-10"> {children}</div>
=======
      <body className=" relative flex flex-col w-[100%] h-screen min-h-screen justify-between items-center bg-black text-white">
        <SessionProvider>
          <Header/>
            <div className="flex w-full h-full justify-center items-center p-10"> {children}</div>
          <Footer/>
>>>>>>> main
        </SessionProvider>
      </body>
    </html>
  )
}
