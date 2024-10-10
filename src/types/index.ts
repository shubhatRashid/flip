type TaskType = {
    id : number,
    task : string,
    completed : boolean
}

type TodoType = {
    category:string,
    tasks : TaskType[]
    lastId : number
}

export type {TaskType,TodoType}