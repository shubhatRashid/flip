import "../global.css"
import { Header,Footer } from "../components"

export const metadata = {
  title: 'Flip Clock',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col w-[100%] h-screen justify-center items-center bg-black text-white ">
        <Header/>
          <div className="flex flex-1 w-full justify-center items-center"> {children}</div>
        <Footer/>
      </body>
    </html>
  )
}
