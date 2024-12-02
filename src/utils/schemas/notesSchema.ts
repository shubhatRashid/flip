import { eachNoteSchema } from "./eachNoteSchema";
import mongoose from "mongoose";

export const notesSchema = new mongoose.Schema({
  category: String,
  notes: [eachNoteSchema]
})