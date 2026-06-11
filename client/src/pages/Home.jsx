import React, { useState, useEffect } from "react";
import { Trash2, History as HistoryIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import ChatInput from "../components/ChatInput";
import { getHistory, sendQuestion, clearHistory } from "../services/api";

/**
 * Home page - Main application logic and layout.
 */
const Home = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load chat history on initial render
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await getHistory();
      // History is sorted by createdAt desc in backend, 
      // but we want to display it chronologically in the chat box
      // We only show current session or recent history in home
      setMessages(data.reverse()); 
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const currentQuestion = question;
      setQuestion(""); // Clear input

      const response = await sendQuestion(currentQuestion);
      
      // Update local state with new message
      setMessages((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    if (window.confirm("Are you sure you want to clear the entire chat history?")) {
      try {
        setLoading(true);
        await clearHistory();
        setMessages([]);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="home-container">
      <header className="app-header">
        <h1>AI FAQ CHATBOT</h1>
        <div className="header-actions">
          <button className="nav-btn" onClick={() => navigate("/history")} title="View History">
            <HistoryIcon size={18} />
            <span>View History</span>
          </button>
          <button className="clear-btn" onClick={handleClear} title="Clear History">
            <Trash2 size={18} />
            <span>Clear History</span>
          </button>
        </div>
      </header>

      {error && <div className="error-banner">{error}</div>}

      <main className="chat-main">
        <ChatBox messages={messages} loading={loading} />
      </main>

      <footer className="chat-footer">
        <ChatInput
          question={question}
          setQuestion={setQuestion}
          onSend={handleSend}
          loading={loading}
        />
      </footer>
    </div>
  );
};

export default Home;
