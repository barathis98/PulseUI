import React, { useState, useEffect, useCallback, useRef } from "react";
import ReactDOM from "react-dom";

import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
import Messages from "./Messages";
import Input from "./Input";
import useFetchMessage from "../hooks/useFetchMessage";

// import dotenv from "dotenv";



import "./styles.css";
import Header from "./Header";

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const currentRequestRef = useRef(null);




    // useEffect(() => {
    //     async function loadWelcomeMessage() {
    //         setMessages([
    //             <BotMessage
    //                 key="0"
    //                 fetchMessage={async () => console.log("waiting")}
    //                 text ="Hello! I'm a chatbot. Ask me anything!"
    //                 loading={false}
    //                 message={message}
    //             />
    //         ]);
    //     }
    //     loadWelcomeMessage();
    // }, []);


const send = async (text) => {
        // Cancel any ongoing request
        if (currentRequestRef.current) {
            currentRequestRef.current.abort();
        }

        // Create a new AbortController for this request
        const controller = new AbortController();
        currentRequestRef.current = controller;

        console.log("main: Sending message...");
        const newMessages = messages.concat(
            <UserMessage key={messages.length + 1} text={text} />,
            <BotMessage
                key={messages.length + 2}
                fetchMessage={async () => {
                    // Making the API call to your FastAPI backend
                    const apiUrl = process.env.REACT_APP_FAST_API_URL;
                    try {
                        const response = await fetch(apiUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ question: text }),
                            signal: controller.signal // Add the abort signal
                        });

                        // Check if the request was aborted
                        if (response.type === 'opaque') {
                            return "Request was cancelled";
                        }

                        const data = await response.json();
                        return data.answer || "No answer found.";
                    } catch (error) {
                        if (error.name === 'AbortError') {
                            console.log("Request was cancelled");
                            return "Request was cancelled";
                        }
                        console.error("Error fetching the answer:", error);
                        return "Sorry, I couldn't get an answer. Please try again later.";
                    } finally {
                        // Clear the current request reference
                        if (currentRequestRef.current === controller) {
                            currentRequestRef.current = null;
                        }
                    }
                }}
            />
        );
        setMessages(newMessages);
    };






    return (
        <div className="chatbot">
            <Header />
            <Messages  messages={messages} />
            <Input onSend={send} />
        </div>
    );
}

export default Chatbot;
