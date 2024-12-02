import React, { useState, useEffect } from "react";

export default function BotMessage({ fetchMessage }) {
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [dots, setDots] = useState(""); // State for loading dots animation

  useEffect(() => {
    // Function to load the message
    async function loadMessage() {
      const msg = await fetchMessage();
      setLoading(false);
      setMessage(msg);
    }
    
    loadMessage();

    // Loading animation with dots
    let dotInterval;
    if (isLoading) {
      dotInterval = setInterval(() => {
        setDots((prev) => (prev.length === 3 ? "." : prev + "."));
      }, 500); // Update every 500ms
    } else {
      clearInterval(dotInterval); // Stop animation once loading is complete
    }

    // Cleanup on unmount or when the component stops loading
    return () => clearInterval(dotInterval);
  }, [fetchMessage, isLoading]); // Effect will re-run on fetchMessage or isLoading change

  return (
    <div className="message-container">
      <div className="bot-message">
        {isLoading ? dots : message} {/* Show loading dots or the message */}
      </div>
    </div>
  );
}