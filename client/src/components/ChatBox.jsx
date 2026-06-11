import React, { useRef, useEffect } from "react";
import Message from "./Message";
import Loading from "./Loading";

/**
 * ChatBox component to display the list of messages.
 */
const ChatBox = ({ messages, loading }) => {
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div className="chat-box" ref={scrollRef}>
      {messages.length === 0 && !loading && (
        <div className="empty-chat">
          <p>Ask a question to start the conversation!</p>
        </div>
      )}

      {messages.map((msg, index) => (
        <React.Fragment key={msg._id || index}>
          {/* User Question */}
          <Message type="user" content={msg.question} timestamp={msg.createdAt} />
          {/* AI Answer */}
          <Message type="ai" content={msg.answer} timestamp={msg.createdAt} />
        </React.Fragment>
      ))}

      {loading && <Loading />}
    </div>
  );
};

export default ChatBox;
