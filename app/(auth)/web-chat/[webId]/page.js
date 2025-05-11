"use client";
import React, { useState } from "react";
import { Send, MessageSquare } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useParams } from "next/navigation";

function App() {
  const { webId } = useParams();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
    { id: 2, text: "I have a question about the website.", sender: "user" },
    {
      id: 3,
      text: "Sure, I'd be happy to help! What would you like to know?",
      sender: "bot",
    },
  ]);
  const [loading, setLoading] = useState(false); // Add loading state
  const [userQuestions, setUserQuestions] = useState([]); // Store user questions in sidebar

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Add user message to the state
      setMessages([
        ...messages,
        { id: messages.length + 1, text: message, sender: "user" },
      ]);
      setUserQuestions([...userQuestions, message]); // Store user question in sidebar
      setMessage("");

      // Set loading to true while waiting for the response
      setLoading(true);

      // Fetch bot response from API
      try {
        const res = await fetch(
          `/api/chat-stream?input=${encodeURIComponent(message)}&decoded=${encodeURIComponent(webId)}`
        );

        const data = await res.json();

        if (data.result) {
          setMessages((prev) => [
            ...prev,
            { id: prev.length + 1, text: data.result, sender: "bot" },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              id: prev.length + 1,
              text: "Sorry, I didn't understand that.",
              sender: "bot",
            },
          ]);
        }
      } catch (error) {
        console.error("Error:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: "Oops, something went wrong.",
            sender: "bot",
          },
        ]);
      } finally {
        // Set loading to false after receiving the response
        setLoading(false);
      }
    }
  };

  const handleQuestionClick = (question) => {
    // When clicking on a question in the sidebar, display it in the chat
    setMessages([
      ...messages,
      { id: messages.length + 1, text: question, sender: "user" },
    ]);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-[#1F2937] p-4 space-y-4 overflow-y-auto">
        <h2 className="text-xl font-bold text-white">Questions Asked</h2>
        <div className="space-y-2">
          {userQuestions.map((question, index) => (
            <div
              key={index}
              className="text-white cursor-pointer hover:bg-gray-600 rounded-md p-2"
              onClick={() => handleQuestionClick(question)}
            >
              {question}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Section */}
      <div className="flex-1 flex flex-col ">
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-lg border-b border-white/10 p-4 flex items-center space-x-2">
          <Link href="/dashboard">
            <span className="text-sm font-medium hover:text-blue-600 transition-colors cursor-pointer">
              ← Back to Dashboard
            </span>
          </Link>

          {/* User Button */}
          {/* <UserButton /> */}
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 self-end ml-auto"
                  : "bg-white/20 self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {/* Loading Spinner */}
          {loading && (
            <div className="flex justify-start items-center space-x-2">
              <div className="w-6 h-6 border-4 border-t-4 border-purple-500 border-opacity-60 rounded-full animate-spin"></div>
              <span className="text-white text-sm">Bot is typing...</span>
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="p-4 border-t border-white/10 bg-[#0F172A]"
        >
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
            />
            <button
              type="submit"
              className="px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl hover:opacity-90 transition-opacity"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
