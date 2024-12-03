import React from "react";

export default function UserMessage({ text }) {
  console.log("UserMessage: Rendering message...");
  return (
    <div className="message-container">
      <div className="user-message">{text}</div>
    </div>
  );
}
