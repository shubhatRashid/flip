import mongoose from "mongoose";
import { todoSchema } from "./todoSchema";

export const userSchema = new  mongoose.Schema({
    name:String,
    email:String,
    todos : [todoSchema]
})
