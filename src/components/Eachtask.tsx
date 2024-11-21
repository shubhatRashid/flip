import { deleteIcon,edit } from "../../assets";
import {TodoType,TaskType} from "../types"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { FormEvent, useEffect } from "react";
import {Caveat } from 'next/font/google'; 
const caveat = Caveat({weight:'700', subsets: ['latin'] })

type EachtaskProps = {
    todos: TodoType[];
    setTodos: (todos: TodoType[]) => void;
    todo: TodoType;
    task: TaskType;
    newTask: string;
    editingTask: TaskType | null;
    setNewTask: (task: string) => void;
    setEditingTask: (task: TaskType | null) => void;
};

export default function Eachtask(
{
    todos,
    setTodos,
    todo,
    task,
    newTask,
    editingTask,
    setNewTask,
    setEditingTask,
} : EachtaskProps
) {
    const router = useRouter()
    const {toast} = useToast()

    const deleteTask = async (category: string, id: string) => {
        try {
            const response = await fetch('/api/deleteTask',{
                method:'DELETE',
                body : JSON.stringify({categoryName:category,id:id})
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
                    let newTasks = todo.tasks.filter((task) => task._id !== id);
                    todo.tasks = newTasks;
                }
                return todo;
            });
            setTodos(newData);
            
        } catch (error:any) {
            const errorBody = {
                title : `${error.name} : ${error.cause}`,
                description : error.message
            }
            toast(errorBody)
        }
    };

    const handleCheckedChange = async (category: string, id: string,bool:boolean) => {
        try {
            const response = await fetch('/api/completeTask',{
                method:'POST',
                body : JSON.stringify({categoryName:category,id:id,bool:!bool})
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
                    todo.tasks.map((task) => {
                        if (task._id == id) {
                            task.completed = !task.completed;
                        }
                        return task;
                    });
                }
                return todo;
            });
            setTodos(newData);
        } catch (error:any) {
            const errorBody = {
                title : `${error.name} : ${error.cause}`,
                description : error.message
            }
            toast(errorBody)
        }
    };

    const handleEditTask = async (e:FormEvent,category: string, id:string) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/updateTask',{
                method:'PUT',
                body : JSON.stringify({categoryName:category,id:id,newTask:newTask})
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
                    todo.tasks.map((task) => {
                        if (task._id == id) {
                            task.task = newTask
                        }
                        return task;
                    });
                }
                return todo;
            });
            setTodos(newData);
            setNewTask("")
            setEditingTask(null)
        } catch (error:any) {
            const errorBody = {
                title : `${error.name} : ${error.cause}`,
                description : error.message
            }
            toast(errorBody)
        }
    };

    return (
        <div className="flex p-1 rounded-lg hover:border hover:bg-white" >
            {
                editingTask === task
                ? 
                <form 
                    id="taskInput"
                    typeof='submit' 
                    onSubmit={(e) => handleEditTask(e,todo.category, task._id)}
                    className="flex w-full">
                    <input 
                        className="flex w-full rounded-xl outline-none p-1"
                        value = {newTask} 
                        onChange={(e) => setNewTask(e.target.value)}
                        autoFocus
                        onBlur={() => setEditingTask(null)} 
                    />
                </form> 
                :
                <div className="relative flex w-[90%] gap-1 px-1 text-xl"> 
                    <input 
                    type="checkbox" 
                    checked={task.completed} 
                    onChange={() => handleCheckedChange(todo.category, task._id,task.completed)} 
                    />
                    <span 
                        className={`max-w-[300px] min-w-full text-gray-600 capitalize ${caveat.className} border-dashed border-black border-b`}
                        style={{
                            textDecoration: task.completed ? 'line-through' : 'none',
                            opacity: task.completed ? '50%' : '100%',
                        }}
                        onDoubleClick={() =>{
                            setEditingTask(task)
                            setNewTask(task.task)
                        }}
                    >
                        {task.task}
                    </span>
                </div>
            }
            <div className="flex gap-1 ml-auto">
                {
                    task.completed  && 
                    <button  onClick={() => deleteTask(todo.category, task._id)}>
                            <Image width={20} height={20} alt="no image" src={deleteIcon.src}/>
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
                            <Image width={20} height={20} alt="no image" src={edit.src}/>
                    </button>
                }
            </div>
        </div>
    );
}