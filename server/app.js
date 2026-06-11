import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatRoutes.js";

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser

// Routes
app.use("/api/chat", chatRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("AI FAQ Chatbot API is running...");
});

export default app;
