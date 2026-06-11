import React, { useState, useEffect } from "react";
import { ArrowLeft, Trash2, Calendar, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getHistory, clearHistory } from "../services/api";

/**
 * History page - Displays all previous chat conversations in a list format.
 */
const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await getHistory();
      setHistory(data);
      setError(null);
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
        setHistory([]);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="history-page">
      <header className="app-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate("/")}>
            <ArrowLeft size={20} />
          </button>
          <h1>Chat History</h1>
        </div>
        <button className="clear-btn" onClick={handleClear} disabled={history.length === 0}>
          <Trash2 size={18} />
          <span>Clear All</span>
        </button>
      </header>

      {error && <div className="error-banner">{error}</div>}

      <main className="history-main">
        {loading && <div className="loading-state">Loading history...</div>}
        
        {!loading && history.length === 0 && (
          <div className="empty-history">
            <MessageSquare size={48} />
            <p>No chat history found.</p>
            <button onClick={() => navigate("/")}>Start a conversation</button>
          </div>
        )}

        <div className="history-list">
          {history.map((item) => (
            <div key={item._id} className="history-item">
              <div className="history-item-header">
                <Calendar size={14} />
                <span>{new Date(item.createdAt).toLocaleString()}</span>
              </div>
              <div className="history-q">
                <strong>Q:</strong> {item.question}
              </div>
              <div className="history-a">
                <strong>AI:</strong> {item.answer}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default History;
