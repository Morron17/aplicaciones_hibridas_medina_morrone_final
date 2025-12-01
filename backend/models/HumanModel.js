import mongoose from "mongoose";

const humanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  description: { type: String, required: true},
  image: { type: String }
}, { timestamps: true });

export default mongoose.model("Humans", humanSchema);