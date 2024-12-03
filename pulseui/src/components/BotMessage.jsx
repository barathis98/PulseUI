import React, { useEffect, useState } from 'react';

export default function BotMessage({ text, fetchMessage, key }) {
  const [message, setMessage] = useState("Loading...");
  const [loading, setLoading] = useState(true);
  const [dots, setDots] = useState(""); // For loading animation

  // Set up loading dots animation
  useEffect(() => {
    let dotInterval;
    if (loading) {
      dotInterval = setInterval(() => {
        setDots((prev) => (prev.length === 3 ? "." : prev + "."));
      }, 500); // Update every 500ms
    }

    return () => clearInterval(dotInterval); // Clean up interval on unmount
  }, [loading]);

  // Fetch message when component mounts
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await fetchMessage();
        setMessage(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching message:", error);
        setMessage("Sorry, an error occurred.");
        setLoading(false);
      }
    };

    getMessage();
  }, [fetchMessage]);

  // Determine what to display
  const displayContent = loading 
    ? `Loading${dots}` 
    : message;

  return (
    <div className="message-container">
      <div className="bot-message">
        {displayContent}
      </div>
    </div>
  );
}