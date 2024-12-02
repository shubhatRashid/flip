'use client';
import { FormEvent, useEffect, useState } from "react";
import {edit,add} from "../../../assets"
import {TaskType, TodoType} from "../../types"
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { SignInPage,Loader,Eachtask} from "@/components";
import { useSession } from "next-auth/react";
import { CirclePlus, FolderPen } from "lucide-react";
import { Permanent_Marker} from 'next/font/google'; 
const permanent_Marker = Permanent_Marker({weight:'400', subsets: ['latin'] })

export default function Page() {
    const {data:session,status} = useSession()
    const {toast} = useToast()
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [editingTask, setEditingTask] = useState<TaskType | null>(null);
    const [newTask, setNewTask] = useState<string>('');
    const [editingCategory,setEditingCategory] = useState<string>('')
    const [newCategory,setNewCategory] = useState<string>('')
    const [showCardOptions,setShowCardOptions] = useState<string>('')
    const [deleteCategory,setDeleteCategory] = useState('')

    const addNewTask = async (category: string) => {
    
        try {
            const body = {
                categoryName : category,
                newTask : newTask
            }

            const response = await fetch('/api/todolist/addNewTask',{
                method : 'POST',
                body : JSON.stringify(body)
            })

            if (!response.ok){
                const error = new Error()
                error.name = 'Error'
                error.cause = response.status
                error.message = response.statusText
                throw error
            }
            
            let incommingData = await response.json()
            setTodos(() => JSON.parse(incommingData))
            setNewTask(() => '')
            document.getElementById(category)?.blur()

        } catch (error:any) {
            const errorBody = {
                title : `${error.name} : ${error.cause}`,
                description : error.message
            }
            toast(errorBody)
        }
    };

    const handleDeleteCategory = async (category: string) => {
        setShowCardOptions('')
        try {
            const body = {
                categoryName : category,
            }
            const response = await fetch('/api/todolist/deleteCategory',{
                method:'DELETE',
                body : JSON.stringify(body)
            })

            if (!response.ok){
                const error = new Error()
                error.name = 'Error'
                error.cause = response.status
                error.message = response.statusText
                throw error
            }

            let newData = todos.filter((todo) => todo.category !== category);
            setTodos(newData);
            toast({
                title : 'Sucess',
                description : 'category deleted sucessfully'
            })
    
        } catch (error:any) {
            const errorBody = {
                title : `${error.name} : ${error.cause}`,
                description : error.message
            }
            toast(errorBody)
        }

    };

    const handleRenameCategory = async (e:FormEvent,category:string) => {
        e.preventDefault()
        try {
            const body = {
                categoryName : category,
                newCategoryName : newCategory
            }
            const response = await fetch('/api/todolist/renameCategory',{
                method:'PUT',
                body : JSON.stringify(body)
            })

            if (!response.ok){
                const error = new Error()
                error.name = 'Error'
                error.cause = response.status
                error.message = response.statusText
                throw error
            }

            let newData = todos.map(todo => {
                if (todo.category === category){
                    todo.category = newCategory
                }
                return todo 
            })
            setTodos(newData)

        } catch (error:any) {
            const errorBody = {
                title : `${error.name} : ${error.cause}`,
                description : error.message
            }
            toast(errorBody)
        }
    }

    const handleAddNewCategory = async () => {
        try {
            const response = await fetch('/api/todolist/addNewCategory',{
                method:'POST'
            })
            if (!response.ok){
                const error = new Error()
                error.name = 'Error'
                error.cause = response.status
                error.message = response.statusText
                throw error
            }

            const incommingData = await response.json()
            setTodos(() => incommingData)
            console.log(todos)
            setEditingCategory('new category...')
            setNewCategory('new category...')
        } catch (error:any) {
            const errorBody = {
                title : `${error.name} : ${error.cause}`,
                description : error.message
            }
            toast(errorBody)
        }
    }

    const getAllData = async () => {
        try {
            let response = await fetch('/api/todolist/data');
            
            if (response.ok) {
                let data = await response.json(); // Parse the response body as JSON
    
                setTodos(() =>JSON.parse(data)); // Assuming data is an array/object of todos
            } else {
                toast({title:`${response.status}`,description:response.statusText})
            }
        } catch (error:any) {
            const errorBody = {
                title : `${error.name} : ${error.cause}`,
                description : error.message
            }
            toast(errorBody)
        }
    };
    

    useEffect(() => {
        getAllData()
    },[])

    if (status === 'loading' || !todos) return <Loader/>
    if (status === 'unauthenticated') return <SignInPage/> 

    return (
        <div className="relative z-0 flex flex-wrap gap-5 w-full h-full justify-center items-center pt-5">
            {todos.length == 0 && <div className="text-gray-300">Please Add your first Category and todos ...</div>}
            {todos.map((todo, index) => (
                <div key={index} 
                    className="relative border p-3 rounded-xl min-w-[200px] 
                                flex flex-col justify-center gap-3
                                shadow-md bg-gray-50 hover:shadow-xl hover:bg-gray-100 
                                "
                >

                    <div className='flex justify-between items-center'>
                        {
                            editingCategory === todo.category ?
                            <form typeof="submit" onSubmit={(e) => handleRenameCategory(e,todo.category)}>
                                <input 
                                    id="todocategoryinput"
                                    value={newCategory} 
                                    className="flex w-[90%] rounded-xl text-black p-1 outline-none"
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    autoFocus />
                            </form>
                            :
                            <h1 
                                className={`text-2xl flex justify-center items-center p-1 capitalize ${permanent_Marker.className}`}
                                style={{
                                    opacity:todo.category === 'new category...'? '50%' : '100%',
                                    textTransform:todo.category === 'new category...'? 'none':'capitalize'}}>
                                {todo.category}
                            </h1>
                        }
                    </div>

                    <button 
                        className="absolute top-3 right-3 font-bold"
                        onClick={() => showCardOptions === "" ? setShowCardOptions(todo.category) : setShowCardOptions("")}
                    >
                            <FolderPen/>
                    </button>

                    {
                        showCardOptions === todo.category &&
                        <div 
                            className="absolute right-[10%] top-[10%] flex flex-col text-sm border
                            justify-start items-start gap-1 p-3 rounded-xl bg-white z-10"> 

                            <button  className="border p-2 rounded w-full bg-gray-200" 
                                    onClick={() =>handleDeleteCategory(todo.category)}
                            >🗑️ delete</button>
                            <button className="border p-2 rounded bg-gray-200" 
                                    onClick={() => {
                                        setEditingCategory(todo.category)
                                        setNewCategory(todo.category)
                                        setShowCardOptions('')}}
                            >✒️ rename</button>

                        </div>
                    }
                    
                    {
                    todo.tasks.map((task, i) => (
                        <Eachtask 
                            key = {i}
                            todos={todos}
                            setTodos={setTodos}
                            todo = {todo}
                            task = {task}
                            newTask = {newTask}
                            editingTask = {editingTask}
                            setNewTask = {setNewTask}
                            setEditingTask = {setEditingTask}
                            />
                    ))
                    }

                    <div id='taskInput' className="flex w-full border rounded-xl flex justify-between items-center gap-5 p-1 self-baseline mt-auto">
                        <form  
                            className="w-full"
                            typeof="submit" 
                            onSubmit={
                                (e) => {
                                    e.preventDefault()
                                    addNewTask(todo.category)
                                    }}>
                            <input 
                                id={todo.category}
                                className="flex w-full rounded p-1 outline-none" 
                                placeholder="add new task..."
                                onChange={(e) => setNewTask(e.target.value)}
                                onFocus={(e) => e.currentTarget.value = newTask}
                                onBlur={(e) => e.currentTarget.value = ''}
                            />
                        </form>
                        <button 
                            className="flex justify-center items-center"
                            onClick={() => addNewTask(todo.category)}
                        >
                            <Image alt='image not found' width={20} height={20} src={add.src}/>
                        </button>       
                    </div>
                </div>
            ))}

            <div className="relative flex w-full justify-end items-center pr-3 mt-auto">
                <button onClick = {handleAddNewCategory} className="border rounded-full p-5"><CirclePlus/>    </button>
            </div>
        </div>
    );
}