import axios from "axios";

// Base URL for the backend API from environment variables
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/chat";

/**
 * Sends a user question to the backend and returns the AI response.
 * @param {string} question - The user's input question.
 * @returns {Promise<object>} - The API response data.
 */
export const sendQuestion = async (question) => {
  try {
    const response = await axios.post(API_URL, { question });
    return response.data;
  } catch (error) {
    console.error("API Error (sendQuestion):", error);
    throw error.response?.data?.error || "Failed to get AI response.";
  }
};

/**
 * Fetches the entire chat history from the backend.
 * @returns {Promise<Array>} - List of previous chat messages.
 */
export const getHistory = async () => {
  try {
    const response = await axios.get(`${API_URL}/history`);
    return response.data.data;
  } catch (error) {
    console.error("API Error (getHistory):", error);
    throw error.response?.data?.error || "Failed to fetch history.";
  }
};

/**
 * Deletes all chat history from the backend.
 * @returns {Promise<object>} - Success message.
 */
export const clearHistory = async () => {
  try {
    const response = await axios.delete(`${API_URL}/history`);
    return response.data;
  } catch (error) {
    console.error("API Error (clearHistory):", error);
    throw error.response?.data?.error || "Failed to clear history.";
  }
};
