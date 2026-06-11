import React from "react";
import { Send } from "lucide-react";

/**
 * ChatInput component for the user to type and send questions.
 */
const ChatInput = ({ question, setQuestion, onSend, loading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading && question.trim() !== "") {
      onSend();
    }
  };

  return (
    <form className="chat-input-container" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ask something..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={loading}
      />
      <button type="submit" disabled={loading || question.trim() === ""}>
        <Send size={20} />
      </button>
    </form>
  );
};

export default ChatInput;
