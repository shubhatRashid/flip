type TaskType = {
    task : string,
    completed : boolean,
    _id : string
}

type TodoType = {
    category:string,
    tasks : TaskType[],
    _id : string
}

interface CountDownModelProps {
    setShowCountDown: React.Dispatch<React.SetStateAction<boolean>>;
  }

export type {TaskType,TodoType,CountDownModelProps}