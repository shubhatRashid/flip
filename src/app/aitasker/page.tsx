'use client'
import { useState } from "react"
import { Check, Clipboard, Cross, LoaderCircle, RotateCcw } from "lucide-react"
import { Loader, SignInPage } from "@/components"
import { useSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"
import { TaskType } from "@/types"

const aitasker = () => {
  const [prompt,setPrompt] = useState('')
  const [result,setResult] = useState(null)
  const [dataLoading,setDataLoading] = useState(false)
  const {toast} = useToast()

  const handleForm = async (e) => {
    e.preventDefault()
    setDataLoading(true)
    const response = await fetch('/api/aitasker',{
      method : 'POST',
      body : JSON.stringify({prompt:prompt})
    })
    const jsonData = await response.json()
    const parsedData = JSON.parse(jsonData.tasks.choices[0].message.content)
    setResult(parsedData.tasks)
    setDataLoading(false)
    
    const toastBody = {
      title : 'Tasks generated' ,
      description : "Your work has been broken down sucessfully",
    }
    toast(toastBody)

  }
  const handleApprove = () => {
    const toastBody = {
      title : 'Tasks approved' ,
      description : "check your tasks section for the approved tasks",
    }
    toast(toastBody)
    setResult(false)
    setPrompt('')
  }
  const { data: session,status } = useSession();

  if (status === 'loading'){
    return <Loader/>
  }

  if (status === 'unauthenticated') {
    return <SignInPage/>
  }
  return (
    <div className="w-full flex flex-col justify-center items-center gap-5 bg-gray-50 min-h-screen">
    
      {!result && 
      <div className="w-full h-full flex flex-col justify-center items-center gap-5">
        <h1 className="text-4xl font-bold ">AI Task Breakdown</h1>
        <p className="text-gray-600">Enter your work item and let AI break it down into actionable tasks</p>
        <div className="flex flex-col w-[80%] h-1/2 border p-10 rounded-lg bg-white gap-5 border-sky-300 shadow-md">
            <h2 className="font-medium">What are you working on?</h2>
            <form 
              className="w-full h-full flex flex-col justify-between items-center gap-5"
              onSubmit={(e) => handleForm(e)}>
              <textarea 
                className="border w-full h-full p-4 rounded-xl" 
                placeholder="e.g create a marketting campaign for our new product launch"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button
                type="submit" 
                className={`p-2 border rounded-lg w-[200px] ml-auto ${prompt?"bg-blue-500":'bg-blue-300'} text-white`}
                >
                  Generate Tasks
              </button>
            </form>
        </div>
      </div>
      }

      {dataLoading && <LoaderCircle className="animate-spin" size={32}/>}

      {
        result &&
        <div className="flex flex-col justify-center items-start w-[80%] border rounded-lg border-sky-300 shadow-md bg-white">
          <div className="flex justify-start gap-2 items-center border-b w-full bg-green-100 p-5 text-green-800">
            <Clipboard/> 
            <h1 className="text-2xl font-bold">Generated Tasks</h1>
          </div>
          
          <div className="flex flex-col justify-center items-start w-full p-5">
            <h1 className="text-lg font-medium">Tasks</h1>
            <ul className="p-5 w-full flex flex-col gap-2">
              
              {
                result.map((eachTask:TaskType,index:number) => (
                  <li key={index} className="bg-gray-100 rounded-lg w-full flex gap-3 justify-start items-center p-2">
                    <span className="rounded-full bg-green-200 p-1 w-[35px] flex justify-center items-center">{index+1}</span>
                    <span>{eachTask.task}</span>
                  </li>
                ))
              }
        
            </ul>
            
            <div className="flex justify-between items-center w-full">
              
              <button 
                className="text-black flex justify-center items-center  bg-gray-100 p-2 rounded-lg border"
                onClick={() => setResult(null)}
              > 
                <RotateCcw  className="mx-2" size={20}/>
                regenerate
              </button>

              <button 
                className="text-white flex justify-center items-center bg-green-500 p-2 rounded-lg"
                onClick={handleApprove}
              > 
                <Check className="mx-2" size={20}/>
                Approve
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default aitasker
