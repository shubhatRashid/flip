'use client'
import "../global.css"
import { Header} from "../components"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className="relative flex flex-col w-[100dvw] h-[100dvh] justify-between items-center">
        <SessionProvider>
          <Toaster/>
          <Header/>
            <div className="flex w-full h-full justify-center items-center px-5 py-7 overflow-scroll"> {children}</div>
        </SessionProvider>
      </body>
    </html>
  )
}
