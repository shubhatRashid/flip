type TaskType = {
<<<<<<< HEAD
    task : string,
    completed : boolean,
    _id : string
=======
    id : number,
    task : string,
    completed : boolean
>>>>>>> main
}

type TodoType = {
    category:string,
<<<<<<< HEAD
    tasks : TaskType[],
    _id : string
=======
    tasks : TaskType[]
    lastId : number
>>>>>>> main
}

interface CountDownModelProps {
    setShowCountDown: React.Dispatch<React.SetStateAction<boolean>>;
  }

export type {TaskType,TodoType,CountDownModelProps}