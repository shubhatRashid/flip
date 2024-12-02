import mongoose from "mongoose";

export const eachNoteSchema = new mongoose.Schema({
  notetitle: String,
  notedescription: String,
  noteDate: String,
  noteTime: String,
  backgroundColor: String, 
  textColor: String, 
})