import mongoose from "mongoose";
import { todoSchema } from "./todoSchema";
import { notesSchema } from "./notesSchema";

export const userSchema = new  mongoose.Schema({
    name:String,
    email:String,
    todos : [todoSchema],
    notes : [notesSchema]
})
