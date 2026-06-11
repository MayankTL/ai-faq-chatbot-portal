import express from "express";
const router = express.Router();
import {
  askQuestion,
  getChatHistory,
  clearHistory,
} from "../controllers/chatController.js";

// Route for asking a question
router.post("/", askQuestion);

// Route for getting chat history and clearing it
router.route("/history").get(getChatHistory).delete(clearHistory);

export default router;
