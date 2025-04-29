'use client'
import "../global.css"
import { Header} from "../components"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "@/components/ui/toaster"
import { AppProvider } from "@/utils/context/AppContext"
import { BreadcrumbWithCustomSeparator } from "@/components/BreadCrumbWithCustomSeparator"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className="relative flex flex-col w-[99dvw]  justify-between items-center">
        <SessionProvider>
          <Toaster/>
          <Header/>
          <BreadcrumbWithCustomSeparator/>
          <AppProvider>
            <div className="flex w-full min-h-[90dvh] justify-center items-center px-5"> {children}</div>
          </AppProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
