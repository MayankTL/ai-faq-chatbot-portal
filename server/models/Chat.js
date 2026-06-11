import mongoose from "mongoose";

/**
 * Chat schema for storing user questions and AI-generated answers.
 */
const chatSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Please add a question"],
    },
    answer: {
      type: String,
      required: [true, "Please add an answer"],
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
