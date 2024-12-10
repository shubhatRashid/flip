import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function AddNoteDialogBox(
  {submitFunction,defaultTitle,defaultDescription,defaultTextColor,defaultBgColor,icon,dialogTitle,dialogDescription}
  :
  {submitFunction:Function,defaultTitle:string,defaultDescription:string,defaultTextColor:string,defaultBgColor:string,icon:React.ReactElement,dialogTitle:string,dialogDescription:string}) 
  
  {
  const [title,setTitle] = useState(defaultTitle)
  const [description,setDescription] = useState(defaultDescription)
  const [color,setColor] = useState<string>(defaultBgColor)
  const [textColor,setTextColor] = useState(defaultTextColor)
  const [open,setOpen] = useState(false)

  const handleSubmit = () => {
    submitFunction(title,description,color,textColor)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div onClick={() => setOpen(true)} className="rounded-full p-1 border hover:scale-110 bg-gray-200">
            {icon}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input id="name" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Input id="username" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="color" className="text-right">
              Background Color
            </Label>
            <Input id="color" type="color" value={color} onChange={(e) => setColor(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="textcolor" className="text-right">
              Text Color
            </Label>
            <Input id="textcolor" type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
