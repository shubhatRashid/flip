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

interface CountDownModelProps {
    setShowCountDown: React.Dispatch<React.SetStateAction<boolean>>;
  }

export type {TaskType,TodoType,CountDownModelProps}