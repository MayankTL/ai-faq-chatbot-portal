import React from "react";
import { User, Bot } from "lucide-react";

/**
 * Message component to display individual user or AI messages.
 */
const Message = ({ type, content, timestamp }) => {
  const isUser = type === "user";

  return (
    <div className={`message-container ${isUser ? "user" : "ai"}`}>
      <div className="message-icon">
        {isUser ? <User size={20} /> : <Bot size={20} />}
      </div>
      <div className="message-content">
        <div className="message-text">{content}</div>
        {timestamp && (
          <div className="message-timestamp">
            {new Date(timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
