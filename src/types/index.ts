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

type NoteType = {
    _id: string;
    notetitle: string;
    notedescription: string;
    noteDate: string;
    noteTime: string;
    backgroundColor: string; // Renamed color to backgroundColor
    textColor: string;       // Added textColor
  };
  
  type NoteCategoryType = {
    _id: string;
    category: string;
    notes: NoteType[];
  };
interface CountDownModelProps {
    setShowCountDown: React.Dispatch<React.SetStateAction<boolean>>;
  }

export type {TaskType,TodoType,CountDownModelProps,NoteCategoryType,NoteType}