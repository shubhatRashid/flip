'use client'
import "../global.css"
import { Header} from "../components"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "@/components/ui/toaster"
import { AppProvider } from "@/utils/context/AppContext"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className="relative flex flex-col w-[100dvw] justify-between items-center">
        <SessionProvider>
          <Toaster/>
          <Header/>
          <AppProvider>
            <div className="flex w-full min-h-[100dvh] justify-center items-center px-5 py-7 overflow-scroll"> {children}</div>
          </AppProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
