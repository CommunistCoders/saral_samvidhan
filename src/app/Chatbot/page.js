"use client";
import React, { useState } from 'react';
import './chatbot.css';

function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!input) {
            alert('Please enter a question.');
            return;
        }

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
            setResponse(data.response);
            setError('');
        } catch (err) {
            console.error('Error:', err);
            setError('An error occurred while fetching the response.');
            setResponse('');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>AI Lawyer Assistant</h1>
            <textarea
                style={{ width: '100%', height: '100px', marginBottom: '10px' }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question about the Indian Constitution..."
            />
            <button
                style={{
                    padding: '10px 15px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                }}
                onClick={handleSubmit}
            >
                Submit
            </button>

            {response && (
                <div
                    style={{
                        marginTop: '20px',
                        border: '1px solid #ccc',
                        padding: '10px',
                        backgroundColor: '#f9f9f9',
                    }}
                >
                    <h3>Response:</h3>
                    <p>{response}</p>
                </div>
            )}

            {error && (
                <div
                    style={{
                        marginTop: '20px',
                        border: '1px solid red',
                        padding: '10px',
                        backgroundColor: '#ffe6e6',
                    }}
                >
                    <h3>Error:</h3>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
}

export default App;
