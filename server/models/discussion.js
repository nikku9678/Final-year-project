import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  examDate: { type: Date, required: true }, // Optional: Add exam date if applicable
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of users who liked the post
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // Array of comments
}, { timestamps: true });

export const Discussion =mongoose.model("Discussion", postSchema);