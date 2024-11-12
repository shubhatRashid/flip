'use client';
<<<<<<< HEAD
import { FormEvent, useEffect, useState } from "react";
import {edit,add} from "../../../assets"
=======
import { useEffect, useState } from "react";
import {dots,add} from "../../../assets"
>>>>>>> main
import Eachtask from "@/components/Eachtask";
import {TaskType, TodoType} from "../../types"
import Image from "next/image";
import { useSession } from "next-auth/react";
import SignInPage from "@/components/SignInPage";
<<<<<<< HEAD
import { useToast } from "@/hooks/use-toast";

export default function Page() {
    const {toast} = useToast()

=======

export default function Page() {
>>>>>>> main
    const {data:session} = useSession()
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [editingTask, setEditingTask] = useState<TaskType | null>(null);
    const [newTask, setNewTask] = useState<string>('');
    const [editingCategory,setEditingCategory] = useState<string>('')
    const [newCategory,setNewCategory] = useState<string>('')
    const [showCardOptions,setShowCardOptions] = useState<string>('')

<<<<<<< HEAD
    const addNewTask = async (category: string) => {
    
        try {
            const body = {
                categoryName : category,
                newTask : newTask
            }

            const response = await fetch('/api/addNewTask',{
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

            let newData = todos.map((todo) => {
                if (todo.category === category) {
                    todo.tasks.push({task: newTask, completed: false,_id:'auniqueid'+`${Math.random()*20}` });
                }
                return todo;
            });

            setTodos(newData);
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
        try {
            const body = {
                categoryName : category,
            }
            const response = await fetch('/api/deleteCategory',{
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
            const response = await fetch('/api/renameCategory',{
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
            const response = await fetch('/api/addNewCategory',{
                method:'POST'
            })
            if (!response.ok){
                const error = new Error()
                error.name = 'Error'
                error.cause = response.status
                error.message = response.statusText
                throw error
            }
            setTodos((todos) => [...todos,
                {
                    category: "new category...",
                    tasks: [],
                    _id:'auniqueid'+`${Math.random()*20}`
                }
            ])
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
            let response = await fetch('/api/data');
            
            if (response.ok) {
                let data = await response.json(); // Parse the response body as JSON
    
                setTodos(() =>JSON.parse(data)); // Assuming data is an array/object of todos
            } else {
                console.error("Failed to fetch data:", response.status);
            }
        } catch (error) {
            
            console.error("Error fetching data:", error);
        }
    };
    

    useEffect(() => {
        getAllData()
    },[])

=======
    const addNewTask = (category: string, lastId: number) => {
        let newData = todos.map((todo) => {
            if (todo.category === category) {
                todo.tasks.push({ id: lastId + 1, task: newTask, completed: false });
                todo.lastId += 1
            }
            return todo;
        });
        setTodos(newData);
        setNewTask(() => '')
        document.getElementById(category)?.blur()
    };

    const handleDeleteCategory = (category: string) => {
        let newData = todos.filter((todo) => todo.category !== category);
        setTodos(newData);
    };

    const handleRenameCategory = (category:string) => {
        let newData = todos.map(todo => {
            if (todo.category === category){
                todo.category = newCategory
            }
            return todo 
        })
        setTodos(newData)
    }

    const handleAddNewCategory = () => {
        setTodos((todos) => [...todos,
            {
                category: "new category...",
                tasks: [],
                lastId: todos.length > 0 ? todos[todos.length-1].lastId + 1 : 0
            }
        ])
        setEditingCategory('new category...')
        setNewCategory('new category...')
    }

    useEffect(() => {
        let data = localStorage.getItem('todolist')
        if (data){
            setTodos(JSON.parse(data))
        }
    },[])

    useEffect(() => {
        let data = JSON.stringify(todos)
        if (todos.length > 0){
            localStorage.setItem('todolist',data)
        }
    },[newCategory,newTask,todos])

>>>>>>> main
    if (!session){
        return <SignInPage />
    }
    
    return (
        <div className="flex flex-wrap gap-5 w-full h-full justify-center items-center">

            <div className="relative border p-3 rounded-xl min-w-[200px] min-h-[200px] flex justify-center gap-3 items-center">
                <button onClick = {handleAddNewCategory} className="border rounded-xl p-5">Add New</button>
            </div>

            {todos.map((todo, index) => (
                <div key={index} className="relative border p-3 rounded-xl min-w-[200px] flex flex-col justify-center gap-3">

                    <div className='flex justify-between items-center'>
                        {
                            editingCategory === todo.category ?
<<<<<<< HEAD
                            <form typeof="submit" onSubmit={(e) => handleRenameCategory(e,todo.category)}>
=======
                            <form typeof="submit" onSubmit={() => handleRenameCategory(todo.category)}>
>>>>>>> main
                                <input 
                                    value={newCategory} 
                                    className="flex w-[90%] rounded-xl bg-black text-white p-1 outline-none"
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    autoFocus />
                            </form>
                            :
                            <h1 
                                className="text-3xl flex justify-center items-center p-1 capitalize"
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
<<<<<<< HEAD
                            <Image alt='image not found' width={20} height={20} src={edit.src}/>
=======
                            <Image alt='image not found' width={20} height={20} src={dots.src}/>
>>>>>>> main
                    </button>

                    {
                        showCardOptions === todo.category &&
                        <div 
                            className="absolute right-[10%] top-[10%] flex flex-col text-sm
                            justify-start items-start gap-1 p-3 rounded-xl bg-neutral-800 z-10"> 
                            <button  className="border p-1 rounded-xl w-full" onClick={() => handleDeleteCategory(todo.category)}>🗑️ delete</button>
                            <button className="border p-1 rounded-xl" 
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
<<<<<<< HEAD
                            key = {i}
=======
                            key = {index}
>>>>>>> main
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
<<<<<<< HEAD
                                    addNewTask(todo.category)
=======
                                    addNewTask(todo.category, todo.lastId)
>>>>>>> main
                                    }}>
                            <input 
                                id={todo.category}
                                className="flex w-full rounded-xl bg-transparent text-white p-1 outline-none" 
                                placeholder="add new task..."
                                onChange={(e) => setNewTask(e.target.value)}
                                onFocus={(e) => e.currentTarget.value = newTask}
                                onBlur={(e) => e.currentTarget.value = ''}
                            />
                        </form>
                        <button 
                            className="flex justify-center items-center"
<<<<<<< HEAD
                            onClick={() => addNewTask(todo.category)}
=======
                            onClick={() => addNewTask(todo.category, todo.lastId)}
>>>>>>> main
                        >
                            <Image alt='image not found' width={20} height={20} src={add.src}/>
                        </button>       
                    </div>
                </div>
            ))}
        </div>
    );
}