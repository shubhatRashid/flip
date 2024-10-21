'use client'
import "../global.css"
import { Header,Footer } from "../components"
import { SessionProvider } from "next-auth/react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className=" relative flex flex-col w-[100%] h-screen min-h-screen justify-between items-center bg-black text-white">
        <SessionProvider>
          <Header/>
            <div className="flex w-full h-full justify-center items-center p-10"> {children}</div>
          <Footer/>
        </SessionProvider>
      </body>
    </html>
  )
}
