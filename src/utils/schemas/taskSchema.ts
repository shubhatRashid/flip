import mongoose from "mongoose";
export const taskSchema = new mongoose.Schema({
    task:String,
    completed:Boolean
})
