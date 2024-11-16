"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import "./chatbot.css";
const { GoogleGenerativeAI } = require("@google/generative-ai");

function App() {
  const [countdown, setCountdown] = useState(5); // Countdown starting at 5 seconds
  const [input, setInput] = useState("");
  const [conversations, setConversations] = useState([
    { name: "Conversation 1", history: [] },
  ]);
  const [currentConversationIndex, setCurrentConversationIndex] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const { data: session } = useSession();
  const router = useRouter();
  const SAMPLE_INPUT = "Here is the sample input:";
  const SAMPLE_OUTPUT = "Here is the sample output:";
  const geminiApiKey = "AIzaSyAAZts2s1PRyS0wVl6HosLy1Nm46j2PbXM";
  const googleAI = new GoogleGenerativeAI(geminiApiKey);
  const geminiConfig = {
    temperature: 0.3,
    topP: 1,
    topK: 2,
    maxOutputTokens: 4096,
  };  
  // If the user is not logged in
  useEffect(() => {
    if (!session) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer); // Clear timer when countdown ends
            if (typeof window !== "undefined") {
              window.location.href = "/login"; // Adjust to your protected route
            }
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer); // Cleanup timer on component unmount
    }
  }, [session]);

  useEffect(() => {
    // If the user is logged in, fetch chatbot conversations
    const fetchChatbotConversations = async () => {
      try {
        const response = await fetch(`/api/chatbot/get?userId=${session?.user.id}`);
        if (!response.ok) {
          throw new Error(`Error fetching chatbot conversations: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("fetched data : ", data);
        setConversations(data); // Set fetched conversations
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };
  
    if (session) {
      fetchChatbotConversations();
    }
  }, [session]);



  const PROMPT = `
    You are a helpful AI assistant, called the "Communist Lawyer", who helps students understand the Indian Constitution in simple language. You should only answer questions pertaining to Constitution of India.

    1. Is the question asked a valid question pertaining to Constitution of India ?
    2. Is there any article/section relevant to the question in the constitution ?
    3. Present the article as in its true nature.
    4. Explain it in a way as explaining to a 15 year old.
    5. Present a simple example.


    ${SAMPLE_INPUT}
    Who are you?
    ${SAMPLE_OUTPUT}
    This question doesn't relate to Indian constitution. Also neither does the question pertain to the Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS) or Bharatiya Sakshya Adhiniyam (BSA) . Therefore, answering the question will lead to policy violation. Kindly ask an appropriate question.

    ${SAMPLE_INPUT}
    Who is the prime minister of India?
    ${SAMPLE_OUTPUT}
    This question doesn't relate to Indian constitution. Therefore, answering the question will lead to policy violation. Kindly ask an appropriate question.

    ${SAMPLE_INPUT}
    What is the standard usint of mass?
    ${SAMPLE_OUTPUT}
    This question doesn't relate to Indian constitution. Therefore, answering the question will lead to policy violation. Kindly ask an appropriate question.

    ${SAMPLE_INPUT}
    What law protects me from murder?

    ${SAMPLE_OUTPUT}

    No, the question, "What law protects me from murder?" is not directly a constitutional matter. Instead, it pertains to criminal law, which is governed by statutory laws like the Bharatiya Nyaya Sanhita (BNS).

    No, the Constitution of India does not have a specific article directly protecting individuals from murder. However, the Bharatiya Nyaya Sanhita (BNS), which replaced the Indian Penal Code (IPC), contains provisions for the crime of murder.

    Under the Bharatiya Nyaya Sanhita (BNS), Section 302 deals with punishment for murder. It states:

    "Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine."

    Imagine you live in a place where there are rules to protect people. If someone takes the life of another person on purpose, that’s called murder. According to the rules in the Bharatiya Nyaya Sanhita (BNS), anyone who commits murder will face very serious punishment, such as spending their whole life in prison or even getting the death penalty, depending on the case. These rules exist to keep everyone safe and ensure that if someone does something so bad, they will face severe consequences.

    Let's say Person A deliberately kills Person B. According to the law (Section 302 of the BNS), Person A will be arrested and tried in court. If found guilty of murder, Person A could either be sentenced to life in prison or, in very rare and serious cases, face the death penalty.


    ${SAMPLE_INPUT}
    Are WhatsApp chats considered as evidence?

    ${SAMPLE_OUTPUT}

    No, the question "Are WhatsApp chats considered as evidence?" does not directly pertain to the Constitution of India. It falls under the domain of evidence law, specifically the Bharatiya Sakshya Adhiniyam (BSA), which is the Indian Evidence Act.

    There is no specific article in the Constitution of India that deals with the admissibility of evidence like WhatsApp chats. However, under the Bharatiya Sakshya Adhiniyam (BSA), sections regarding electronic records are applicable.

    Section 65B of the Bharatiya Sakshya Adhiniyam (BSA) deals with the admissibility of electronic records. According to this section, any information contained in an electronic record, which is stored or recorded by a computer, can be treated as evidence provided certain conditions are met, such as obtaining a certificate under Section 65B(4) to prove its authenticity.

    In simple words, yes, WhatsApp chats can be used as evidence in court. But, for them to be considered valid, you have to follow certain rules. Imagine you are playing a game with your friends, and you take screenshots to prove someone broke the rules. But before those screenshots are accepted as proof by everyone, you need to show that they are real and haven't been changed or edited. Similarly, with WhatsApp chats, the court needs a certificate saying these chats are authentic and haven't been tampered with. Once that’s done, they can be used as evidence.

    Let’s say a person is accused of cheating in a business deal, and some important conversations happened over WhatsApp. If the person who wants to prove the cheating presents these chats in court, they must also show a certificate from the person who handled the phone or computer proving that the chats are genuine. If the court accepts this, the chats can be used as evidence to help prove the case.

    ${SAMPLE_INPUT}
    What is the right to equality?
    ${SAMPLE_OUTPUT}
        Yes, the "Right to Equality" is a fundamental right enshrined in the Constitution of India.

        Yes, Articles 14 to 18 of the Constitution of India deal with the Right to Equality.

        Article 14 - Equality before law:
        The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.

        Article 15 - Prohibition of discrimination on grounds of religion, race, caste, sex, or place of birth:
        The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth, or any of them.

        Article 16 - Equality of opportunity in matters of public employment:
        There shall be equality of opportunity for all citizens in matters relating to employment or appointment to any office under the State.

        Article 17 - Abolition of Untouchability:
        “Untouchability” is abolished and its practice in any form is forbidden.

        Article 18 - Abolition of titles:
        No title, not being a military or academic distinction, shall be conferred by the State.

        The Right to Equality means that every person in India is treated the same by the law, no matter who they are. This means that the government cannot treat people differently just because of their religion, race, caste, gender, or where they were born. For example, if you and your friend both commit the same crime, the law should treat both of you in the same way. Similarly, everyone should get the same chances to apply for a government job, and no one can be forced to follow "untouchability" practices, which were unfair rules against certain communities.

        Imagine there is a public park in your city, and anyone can visit it. If the government says only boys can enter and not girls, that would be against the Right to Equality. The law ensures that both boys and girls have the right to use the park without any discrimination.`;

  const geminiModel = googleAI.getGenerativeModel({
    model: "models/gemini-1.0-pro-latest",
    geminiConfig,
  });

  const handleSubmit = async () => {
    if (!input || loading) return;
    setLoading(true);
  
    try {
      const FINAL_PROMPT = `${PROMPT}
          Here is the sample input:
          ${input}
          Here is the sample output:`;
  
      const result = await geminiModel.generateContent(FINAL_PROMPT);
      const response = await result.response.text(); // Make sure to await this
      const currentQuestion = input;
  
      // Update conversation history in the frontend
      const updatedConversations = [...conversations];    // shallow copy of the conversations
      let updatedConversation = updatedConversations[currentConversationIndex];

      // If conversation doesn't exist, create a new one
      if (!updatedConversation) {
        updatedConversation = [];
        updatedConversations[currentConversationIndex] = updatedConversation; // Create a new entry in the array
      }

      // Push new question/answer to the conversation
      updatedConversation.push({
        question: currentQuestion,
        answer: response,
      });

      // Update the state with the new conversations
      setConversations(updatedConversations);
      console.log("here : ",updatedConversations);
        
      // Send only the updated conversation to the backend
      const saveResponse = await fetch("/api/chatbot/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          conversationId: currentConversationIndex, // Specify the conversation index to update
          prompt: currentQuestion,
          reply: response,
        }),
      });
  
      if (!saveResponse.ok) {
        throw new Error("Failed to save conversation.");
      }
  
      setInput("");
      setError("");
    } catch (error) {
      console.log("Error:", error);
      setError("An error occurred while generating the response.");
    } finally {
      setLoading(false);
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const startNewConversation = () => {
    const newConversation = {};
    setConversations([...conversations, newConversation]);
    setCurrentConversationIndex(conversations.length);
    setInput("");
    setError("");
  };
  
  const renameConversation = (index) => {
    const newName = prompt("Enter a new name for this conversation:");
    if (newName) {
      setConversations((prevConversations) => {
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

    setConversations((prevConversations) => {
      const updatedConversations = prevConversations.filter(
        (_, i) => i !== index
      );
      if (currentConversationIndex >= updatedConversations.length) {
        setCurrentConversationIndex(updatedConversations.length - 1);
      }
      return updatedConversations;
    });
  };

  // // Only update chat-history and scroll to the bottom when a new prompt is submitted
  // useEffect(() => {
  //   // Scroll to the bottom when new conversation history is added
  //   if (chatEndRef.current) {
  //     chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [conversations[currentConversationIndex]]); // Dependency is on the history of the current conversation


  // Unauthorized access message with countdown
  if (!session) {
    return (
      <div className="my-5 flex flex-col items-center justify-center bg-gray-100">
        <p className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md font-semibold mb-4">
          ⚠️ Login to use the Chatbot
        </p>
        <p className="text-gray-700">
          Redirecting to the Login page in <span className="font-bold">{countdown}</span> seconds...
        </p>
      </div>
    );
  }
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
              className={currentConversationIndex === index ? "active" : ""}
            >
              {/* Dynamically generating the name based on index */}
              Conversation #{index + 1}
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering setCurrentConversationIndex
                  deleteConversation(index);
                }}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-container">
        <h1>Conversation #{currentConversationIndex + 1}</h1>
        <div className="chat-history" ref={chatEndRef}>
          {/* Check if conversations[currentConversationIndex] exists and is an array */}
          {Array.isArray(conversations[currentConversationIndex]) ? (
            conversations[currentConversationIndex].map((chat, index) => (
              <div key={chat._id || index} className="chat-message fade-in">
                <div className="user-question">
                  <p><strong>You:</strong> {chat.prompt}</p>
                </div>
                <div className="bot-answer">
                  <p><strong>AI:</strong> {chat.reply}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Loading conversation...</p>
          )}
        </div>


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
          {loading ? <div className="loading-spinner"></div> : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default App;
