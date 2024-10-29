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
      <body className="bg-black text-white relative flex flex-col w-[100dvw] h-[100dvh] justify-between items-center">
        <SessionProvider>
          <Header/>
            <div className="flex w-full h-full justify-center items-center p-10"> {children}</div>
        </SessionProvider>
      </body>
    </html>
  )
}
