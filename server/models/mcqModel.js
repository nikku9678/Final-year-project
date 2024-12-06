import mongoose from "mongoose";

const mcqSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  topic: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ["quantitative", "verbal", "logical", "pseudo code"], // Predefined types
    required: true,
  },
  companyTag: {
    type: String,
    trim: true,
  },
  level: {
    type: String,
    enum: ["easy", "medium", "hard"], // Predefined difficulty levels
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String], // Array of strings for multiple options
    required: true,
    validate: {
      validator: (v) => v.length >= 2,
      message: "A question must have at least 2 options.",
    },
  },
  correctOption: {
    type: String, // Correct option value
    required: true,
  },
  explanation: {
    type: String, // Detailed explanation of the solution
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const MCQ = mongoose.model("MCQ", mcqSchema);
