// useFetchMessage.js
import { useState, useCallback } from 'react';

const useFetchMessage = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchMessage = useCallback(async (text) => {
        setLoading(true);
        const apiUrl = process.env.REACT_APP_FAST_API_URL;
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: text }),
            });

            const data = await response.json();
            setMessage(data.answer || "No answer found.");
        } catch (error) {
            console.error("Error fetching message:", error);
            setMessage("Sorry, I couldn't get an answer. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        fetchMessage,
        message,
        loading,
    };
};

export default useFetchMessage;