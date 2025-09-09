import mongoose from "mongoose";

const EntrySchema = new mongoose.Schema(
  {
    date: { type: Date, default: Date.now }, //6 most important metrics for volleyball players
    squat: { type: Number, required: true },
    bench: { type: Number, required: true },
    clean: { type: Number, required: true },
    vertical: { type: Number, required: true },
    bodyweight: { type: Number, required: true },
    note: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model("Entry", EntrySchema); //mongoose.model(name,schema)
