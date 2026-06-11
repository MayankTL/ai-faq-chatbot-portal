import React from "react";
import { Loader2 } from "lucide-react";

/**
 * Loading component to show a spinner when the AI is generating a response.
 */
const Loading = () => {
  return (
    <div className="loading-container">
      <Loader2 className="spinner" size={20} />
      <span>Thinking...</span>
    </div>
  );
};

export default Loading;
