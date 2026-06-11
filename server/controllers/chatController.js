import Chat from "../models/Chat.js";
import generateResponse from "../services/geminiService.js";

/**
 * @desc    Ask a question and get AI response
 * @route   POST /api/chat
 * @access  Public
 */
export const askQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    // 1. Validate input
    if (!question || question.trim() === "") {
      return res.status(400).json({ success: false, error: "Please provide a question." });
    }

    // 2. Call Gemini service to get answer
    const answer = await generateResponse(question);

    // 3. Save question and answer to MongoDB
    const chat = await Chat.create({
      question,
      answer,
    });

    // 4. Return the answer
    res.status(201).json({
      success: true,
      data: chat,
    });
  } catch (error) {
    console.error("Controller Error (askQuestion):", error.message);
    res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};

/**
 * @desc    Get all chat history
 * @route   GET /api/chat/history
 * @access  Public
 */
export const getChatHistory = async (req, res) => {
  try {
    const history = await Chat.find().sort({ createdAt: -1 }); // Get latest first
    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    console.error("Controller Error (getChatHistory):", error.message);
    res.status(500).json({
      success: false,
      error: "Could not fetch chat history.",
    });
  }
};

/**
 * @desc    Clear all chat history
 * @route   DELETE /api/chat/history
 * @access  Public
 */
export const clearHistory = async (req, res) => {
  try {
    await Chat.deleteMany({});
    res.status(200).json({
      success: true,
      message: "History cleared successfully.",
    });
  } catch (error) {
    console.error("Controller Error (clearHistory):", error.message);
    res.status(500).json({
      success: false,
      error: "Could not clear chat history.",
    });
  }
};
