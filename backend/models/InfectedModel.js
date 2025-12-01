import mongoose from "mongoose";

const infectedSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String,  required: true},
  description: { type: String, required: true },
  image: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Infected", infectedSchema);