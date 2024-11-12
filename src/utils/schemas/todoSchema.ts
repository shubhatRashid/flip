import mongoose from "mongoose";
import { taskSchema } from "./taskSchema";

export const todoSchema = new mongoose.Schema({
    category: String,
    tasks : [taskSchema]
})
