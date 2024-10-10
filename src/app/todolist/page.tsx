'use client';
import { useState } from "react";
import data from "./-data";
import ThreeDots from "../../../assets/dots.png"

export default function Page() {
    const [todos, setTodos] = useState(data);
    const [editingTask, setEditingTask] = useState({});
    const [newTask, setNewTask] = useState('');
    const [editingCategory,setEditingCategory] = useState('')
    const [newCategory,setNewCategory] = useState('')
    const [showCardOptions,setShowCardOptions] = useState('')

    const addNewTask = (category: string, lastId: number) => {
        let newData = todos.map((todo) => {
            if (todo.category === category) {
                todo.tasks.push({ id: lastId + 1, task: newTask, completed: false });
            }
            return todo;
        });
        setTodos(newData);
        setNewTask("");
    };

    const deleteTask = (category: string, id: number) => {
        let newData = todos.map((todo) => {
            if (todo.category === category) {
                let newTasks = todo.tasks.filter((task) => task.id !== id);
                todo.tasks = newTasks;
            }
            return todo;
        });
        console.log(newData);
        setTodos(newData);
    };

    const handleCheckedChange = (category: string, id: number) => {
        let newData = todos.map((todo) => {
            if (todo.category === category) {
                todo.tasks.map((task) => {
                    if (task.id == id) {
                        task.completed = !task.completed;
                    }
                    return task;
                });
            }
            return todo;
        });
        setTodos(newData);
    };

    const handleEditTask = (category: string, id:number) => {
        let newData = todos.map((todo) => {
            if (todo.category === category) {
                todo.tasks.map((task) => {
                    if (task.id == id) {
                        task.task = newTask
                    }
                    return task;
                });
            }
            return todo;
        });
        setTodos(newData);
        setNewTask("")
        setEditingTask({})
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

    return (
        <div className="flex flex-wrap gap-5 w-full h-full justify-center items-center">
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
                            <h1 className="text-3xl flex justify-center items-center p-1 capitalize">
                                {todo.category}
                            </h1>
                        }
                    </div>

                    <button 
                        className="absolute top-3 right-3 font-bold"
                        onClick={() => showCardOptions === "" ? setShowCardOptions(todo.category) : setShowCardOptions("")}
                    >
                            <img className="w-[20px] object-cover" src={ThreeDots.src}/>
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

                    {todo.tasks.map((task, i) => (
                        <div key={i} className="flex" >
                            {
                                editingTask === task
                                ? 
                                <form 
                                    typeof='submit' 
                                    onSubmit={() => handleEditTask(todo.category, task.id)}
                                    className="flex w-full">
                                    <input 
                                        className="flex w-full rounded-xl bg-neutral-800 text-white p-1"
                                        value = {newTask} 
                                        onChange={(e) => setNewTask(e.target.value)}
                                        autoFocus
                                    />
                                </form> 
                                :
                                <div className="relative flex gap-1 px-1 text-xl"> 
                                    <input 
                                    type="checkbox" 
                                    checked={task.completed} 
                                    onChange={() => handleCheckedChange(todo.category, task.id)} 
                                    />
                                    <span 
                                        className="max-w-[300px]  capitalize"
                                        style={{
                                            textDecoration: task.completed ? 'line-through' : 'none',
                                            opacity: task.completed ? '50%' : '100%',
                                        }}
                                    >
                                        {task.task}
                                    </span>
                                </div>
                            }
                            <div className="flex gap-1 ml-auto">
                                {
                                    task.completed  && 
                                    <button  onClick={() => deleteTask(todo.category, task.id)}>
                                        ❌
                                    </button>
                                }
                                
                                {
                                    task.completed || editingTask !== task && 
                                    <button 
                                    onClick={() =>{
                                        setEditingTask(task)
                                        setNewTask(task.task)
                                        }}
                                    >
                                        ✏️
                                    </button>
                                }
                            </div>
                        </div>
                    ))}

                    <div id='taskInput' className="flex w-full border rounded-xl flex justify-between items-center gap-5 p-1 self-baseline mt-auto">
                        <input 
                            className="flex w-[90%] rounded-xl bg-black text-white p-1 outline-none" 
                            placeholder="add new task..."
                            onChange={(e) => setNewTask(e.target.value)}
                            onFocus={(e) => e.currentTarget.value = newTask}
                            onBlur={(e) => e.currentTarget.value = ''}
                        />
                        <button 
                            className="border rounded-full w-6 h-6 flex justify-center items-center"
                            onClick={() => addNewTask(todo.category, todo.lastId)}
                        >
                            +
                        </button>       
                    </div>
                </div>
            ))}
        </div>
    );
}