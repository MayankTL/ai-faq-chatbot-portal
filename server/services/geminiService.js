import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load env vars
dotenv.config();

/**
 * Generates a response from the Gemini AI based on the user's question.
 * @param {string} question - The user's input question.
 * @returns {Promise<string>} - The AI-generated response text.
 */
async function generateResponse(question) {
  // Re-initialize client inside the function to ensure process.env is fully populated
  // and to rule out initialization timing issues.
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
  });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: question,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error details:", error);
    
    if (error.message.includes("credentials") || error.message.includes("API key")) {
      throw new Error(`Authentication failed. Ensure your API Key is valid and starts with 'AIza'. Current key starts with: '${process.env.GEMINI_API_KEY?.substring(0, 4)}'`);
    }
    
    throw new Error("Failed to generate AI response: " + (error.message || "Unknown Error"));
  }
}

export default generateResponse;
