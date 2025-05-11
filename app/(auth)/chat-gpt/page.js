"use client";
import React, { useState, useEffect, useRef } from "react";
import { Send, Plus, Clock, Menu, X, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

const AiAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage = { sender: "user", text: input.trim() };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setInput("");
      setIsTyping(true);

      // Simulate AI response (replace with real API call)
      fetch(`/api/chatgpt-response?message=${encodeURIComponent(input.trim())}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("AI Response:", data.reply); // <-- this line
          const botResponse = { sender: "bot", text: data.reply };
          const updatedMessagesWithBot = [...updatedMessages, botResponse];
          setMessages(updatedMessagesWithBot);
          setIsTyping(false);

          if (activeChat !== null) {
            const updatedHistory = [...history];
            updatedHistory[activeChat] = updatedMessagesWithBot;
            setHistory(updatedHistory);
          }
        })
        .catch((error) => {
          console.error("Error fetching AI response:", error);
          const errorResponse = {
            sender: "bot",
            text: "Sorry, I couldn't reach the server.",
          };
          setMessages([...updatedMessages, errorResponse]);
          setIsTyping(false);
        });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startNewChat = () => {
    setActiveChat(history.length);
    setHistory([...history, []]);
    setMessages([]);
    setSidebarOpen(false);
  };

  const selectChat = (index) => {
    setActiveChat(index);
    setMessages(history[index] || []);
    setSidebarOpen(false);
  };

  const deleteChat = (index, e) => {
    e.stopPropagation();
    const updatedHistory = [...history];
    updatedHistory.splice(index, 1);
    setHistory(updatedHistory);

    if (activeChat === index) {
      setMessages([]);
      setActiveChat(null);
    } else if (activeChat > index) {
      setActiveChat(activeChat - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 flex flex-col md:flex-row text-white">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-10 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-20 bg-gray-900 text-white inset-y-0 left-0 flex flex-col gap-4 shadow-2xl transition-all duration-300 ease-in-out ${
          sidebarOpen
            ? "w-72 translate-x-0"
            : "-translate-x-full md:translate-x-0"
        } md:w-66`}
      >
        <div className="p-6 flex flex-col gap-6 h-full">
          <button
            onClick={startNewChat}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-3 rounded-xl shadow-lg flex items-center justify-center transition-all duration-200 hover:shadow-xl group"
          >
            <Plus className="w-5 h-5 mr-2 transform group-hover:scale-110 transition-transform" />
            <span>New Chat</span>
          </button>

          <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
            <h3 className="text-sm font-semibold text-gray-400 mb-3 px-2 uppercase tracking-wider">
              Recent Chats
            </h3>

            {history.length === 0 && (
              <div className="text-gray-400 text-sm px-2 py-4 italic border-t border-gray-700">
                No previous chats yet
              </div>
            )}

            {history.map((chat, index) => (
              <div
                key={index}
                className={`flex items-center justify-between gap-2 p-3 rounded-xl my-2 cursor-pointer transition-all duration-200 transform hover:scale-[1.01] ${
                  activeChat === index
                    ? "bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-l-2 border-purple-500 shadow-md"
                    : "hover:bg-gray-700/50"
                }`}
                onClick={() => selectChat(index)}
              >
                <div className="flex items-center gap-3 truncate">
                  <Clock className="w-4 h-4 flex-shrink-0 text-purple-400" />
                  <span className="truncate font-medium text-sm">
                    {/* {chat[0]?.text?.substring(0, 30) || Chat ${index + 1}} */}
                  </span>
                </div>
                <button
                  onClick={(e) => deleteChat(index, e)}
                  className="text-gray-400 hover:text-red-400 p-1 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-700">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-700/50 hover:bg-gray-700 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold">AI Assistant</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <p className="text-xs text-gray-300">Online</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-grow flex flex-col h-screen relative">
        {/* Header */}
        <header className="bg-gray-800/70 backdrop-blur-lg border-b border-gray-700 p-6 flex items-center justify-between sticky top-0 z-10">
          <button
            className="md:hidden text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
           <Link href="/dashboard">
        <span className="text-sm font-medium hover:text-blue-600 transition-colors cursor-pointer">
          ← Back to Dashboard
        </span>
      </Link>
          <div className="w-6"></div> {/* Spacer for alignment */}
        </header>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-lg">
                <Bot className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                How can I help you today?
              </h2>
              <p className="text-gray-300 max-w-md leading-relaxed">
                Ask me anything, from creative ideas to technical explanations.
                I'm here to assist!
              </p>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all">
                  <h3 className="font-semibold text-purple-400 mb-1">
                    Writing
                  </h3>
                  <p className="text-sm text-gray-400">
                    Help with articles, stories, emails, and more
                  </p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all">
                  <h3 className="font-semibold text-purple-400 mb-1">
                    Programming
                  </h3>
                  <p className="text-sm text-gray-400">
                    Code explanation, debugging, and development tips
                  </p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all">
                  <h3 className="font-semibold text-purple-400 mb-1">
                    Science & Tech
                  </h3>
                  <p className="text-sm text-gray-400">
                    Explanations of complex concepts and research
                  </p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all">
                  <h3 className="font-semibold text-purple-400 mb-1">
                    Creative Ideas
                  </h3>
                  <p className="text-sm text-gray-400">
                    Brainstorming sessions and out-of-the-box thinking
                  </p>
                </div>
              </div>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-4 ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
                      : "bg-gray-800/80 text-white shadow-md border border-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {msg.sender === "user" && (
                      <User className="w-4 h-4 text-white/80" />
                    )}
                    <span className="text-xs font-medium opacity-80">
                      {msg.sender === "user" ? "You" : "AI Assistant"}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap text-sm">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </p>
                </div>

                {msg.sender === "user" && (
                  <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))
          )}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="max-w-[85%] md:max-w-[70%] rounded-2xl p-4 bg-gray-800/80 border border-gray-700 shadow-md">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-gray-800/70 backdrop-blur-lg border-t border-gray-700">
          <div className="flex gap-2 items-end">
            <div className="flex-grow relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Message AI Assistant..."
                rows="1"
                className="w-full bg-gray-700/70 text-white px-4 py-3 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none max-h-32 transition-all duration-200 placeholder:text-gray-400"
              />
              <button
                onClick={() => setInput("")}
                className={`absolute right-3 bottom-3 text-gray-400 hover:text-white transition-colors ${
                  input ? "opacity-100" : "opacity-0"
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={handleSendMessage}
              disabled={!input.trim()}
              className={`p-3 rounded-xl transition-all duration-200 ${
                input.trim()
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-0.5"
                  : "bg-gray-700 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Style */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #a855f7, #ec4899);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #9333ea, #db2777);
        }
      `}</style>
    </div>
  );
};

export default AiAssistant;
