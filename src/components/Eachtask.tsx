import { deleteIcon,edit } from "../../assets";
import {TodoType,TaskType} from "../types"
import Image from "next/image";

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
        setEditingTask(null)
    };

    return (
        <div className="flex" >
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