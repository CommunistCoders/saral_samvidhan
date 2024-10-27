"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import './chatbot.css';

function App() {
    const [input, setInput] = useState('');
    const [conversations, setConversations] = useState([{ name: 'Conversation 1', history: [] }]);
    const [currentConversationIndex, setCurrentConversationIndex] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);
    const { data: session } = useSession();
    const router = useRouter();
    
    useEffect(() => {
        if (status === "loading") return; // Don't render anything until session check is complete
        if (!session) {
            alert("Please Login to use the Chatbot");
            router.push("/login"); 
        }
    }, [session, router]);

    const handleSubmit = async () => {
        console.log(conversations);
        if (!input || loading) return;  // Prevent duplicate submissions

        setLoading(true);
        // Save the current question before the API call
        const currentQuestion = input;

        try {
            const res = await fetch('http://localhost:5500/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input }),
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            // Update conversation history with question and response
            setConversations(prevConversations => {
                const updatedConversations = [...prevConversations];
                updatedConversations[currentConversationIndex].history.push({
                    question: currentQuestion,
                    answer: data.response
                });
                return updatedConversations;
            });

            setInput('');
            setError('');
        } catch (err) {
            console.error('Error:', err);
            setError('An error occurred while fetching the response.');
        } finally {
            setLoading(false);
            // Scroll to the bottom after updating
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const startNewConversation = () => {
        const newConversation = { name: `Conversation ${conversations.length + 1}`, history: [] };
        setConversations([...conversations, newConversation]);
        setCurrentConversationIndex(conversations.length);
        setInput('');
        setError('');
    };

    const renameConversation = (index) => {
        const newName = prompt("Enter a new name for this conversation:");
        if (newName) {
            setConversations(prevConversations => {
                const updatedConversations = [...prevConversations];
                updatedConversations[index].name = newName;
                return updatedConversations;
            });
        }
    };

    const deleteConversation = (index) => {
        if (conversations.length === 1) {
            alert("Cannot delete the last remaining conversation.");
            return;
        }

        setConversations(prevConversations => {
            const updatedConversations = prevConversations.filter((_, i) => i !== index);
            if (currentConversationIndex >= updatedConversations.length) {
                setCurrentConversationIndex(updatedConversations.length - 1);
            }
            return updatedConversations;
        });
    };

    return (
        <div className="main-container">
            <div className="sidebar">
                <h2>Conversations</h2>
                <button onClick={startNewConversation}>+ New Conversation</button>
                <ul>
                    {conversations.map((conversation, index) => (
                        <li
                            key={index}
                            onClick={() => setCurrentConversationIndex(index)}
                            className={currentConversationIndex === index ? 'active' : ''}
                            onDoubleClick={() => renameConversation(index)}
                        >
                            {conversation.name}
                            <button className="delete-button" onClick={() => deleteConversation(index)}>🗑️</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="chat-container">
                <h1>{conversations[currentConversationIndex].name}</h1>
                <div className="chat-history" ref={chatEndRef}>
                    {conversations[currentConversationIndex].history.map((chat, index) => (
                        <div key={index} className="chat-message fade-in">
                            <div className="user-question">
                                <p><strong>You:</strong> {chat.question}</p>
                            </div>
                            <div className="bot-answer">
                                <p><strong>AI:</strong> {chat.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {error && (
                    <div className="chat-error fade-in">
                        <h3>Error:</h3>
                        <p>{error}</p>
                    </div>
                )}

                <textarea
                    className="chat-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question..."
                />
                <button
                    className="chat-submit-button"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? <div className="loading-spinner"></div> : 'Submit'}
                </button>
            </div>
        </div>
    );
}

export default App;
