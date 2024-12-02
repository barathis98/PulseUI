import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
import Messages from "./Messages";
import Input from "./Input";



import "./styles.css";
import Header from "./Header";

function Chatbot() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        async function loadWelcomeMessage() {
            setMessages([
                <BotMessage
                    key="0"
                    fetchMessage={async () => console.log("waiting")}
                />
            ]);
        }
        loadWelcomeMessage();
    }, []);

    const send = async text => {
        const newMessages = messages.concat(
            <UserMessage key={messages.length + 1} text={text} />,
            <BotMessage
                key={messages.length + 2}
                fetchMessage={async () => console.log("waiting")}
            />
        );
        setMessages(newMessages);
    };

    return (
        <div className="chatbot">
            <Header />
            <Messages messages={messages} />
            <Input onSend={send} />
        </div>
    );
}

export default Chatbot;
