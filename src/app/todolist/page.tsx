'use client';
import { useEffect, useState } from "react";
import {dots,add} from "../../../assets"
import Eachtask from "@/components/Eachtask";
import {TaskType, TodoType} from "../../types"
import Image from "next/image";
import { useSession } from "next-auth/react";
import SignInPage from "@/components/SignInPage";

export default function Page() {
    const {data:session} = useSession()
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [editingTask, setEditingTask] = useState<TaskType | null>(null);
    const [newTask, setNewTask] = useState<string>('');
    const [editingCategory,setEditingCategory] = useState<string>('')
    const [newCategory,setNewCategory] = useState<string>('')
    const [showCardOptions,setShowCardOptions] = useState<string>('')

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
                            <form typeof="submit" onSubmit={() => handleRenameCategory(todo.category)}>
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
                            <Image alt='image not found' width={20} height={20} src={dots.src}/>
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
                            key = {index}
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
                                    addNewTask(todo.category, todo.lastId)
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
                            onClick={() => addNewTask(todo.category, todo.lastId)}
                        >
                            <Image alt='image not found' width={20} height={20} src={add.src}/>
                        </button>       
                    </div>
                </div>
            ))}
        </div>
    );
}