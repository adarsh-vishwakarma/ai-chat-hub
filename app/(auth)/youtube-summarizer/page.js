"use client";
import React, { useRef, useState } from "react";
import { Search, Square, Volume2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import WorkSpaceHeader from "../workspace/_components/WorkSpaceHeader";
import { youtubeSummarizer } from "@/actions/youtubesummary";

const YoutubeSummary = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef(null);

  const speakSummary = () => {
    if (!summary) return;

    const plainText = summary.replace(/[#*_~`>]/g, ''); // Strip markdown
    const utterance = new SpeechSynthesisUtterance(plainText);

    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;

    // When speaking ends, reset state
    utterance.onend = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
    utteranceRef.current = utterance;
    setIsSpeaking(true);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleClick = () => {
    isSpeaking ? stopSpeaking() : speakSummary();
  };


  // 🔍 Handle input and log it
  const handleInputChange = (e) => {
    const value = e.target.value;
    console.log("User input:", value);
    setInputText(value);
  };

  const handleSearch = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/youtube-response?url=${encodeURIComponent(inputText)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data.summary)
      setSummary(data.summary);
      
    } catch (error) {
      console.error("Error fetching summary:", error);
      setSummary("Failed to fetch summary. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-black">
        <WorkSpaceHeader />
      </div>
      <div className="relative min-h-screen w-full bg-black text-white px-5 py-12 flex flex-col items-center justify-start pt-32">
        {/* Gradient Backgrounds */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#4B0082,_transparent_50%)] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#800080,_transparent_50%)] z-0" />

        {/* All main content with higher z-index */}
        <div className="relative z-10 flex flex-col items-center w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              YouTube Video Summary
            </span>{" "}
            with AI
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 text-center max-w-2xl">
            Instantly summarize any YouTube video using cutting-edge AI.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-xl">
            <input
              type="text"
              placeholder="Paste YouTube video URL..."
              value={inputText}
              onChange={handleInputChange}
              className="flex-1 px-5 py-3 rounded-full bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-3 bg-purple-500 hover:bg-purple-800 hover:cursor-pointer rounded-full text-white font-semibold flex items-center gap-2 transition-all duration-300"
            >
              {loading ? (
                "Loading..."
              ) : (
                <>
                  <Search className="w-5 h-5" /> Search
                </>
              )}
            </button>
          </div>

          {/* Summary Output */}
          {summary && (
            <div className="mt-10 bg-white text-black rounded-xl p-6 max-w-3xl w-full shadow-lg">
              <div className="text-2xl font-bold mb-4 flex items-center justify-between">
                <h1>
                  Summary
                </h1>
                 <button
          onClick={handleClick}
          title={isSpeaking ? 'Stop Speaking' : 'Speak Summary'}
          className="text-gray-600 hover:text-blue-500 transition"
        >
          {isSpeaking ? <Square /> : <Volume2 />}
        </button>
              </div>
              <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
          )}

          {/* Footer */}
          <footer className="mt-16 text-gray-400 text-sm">
            🚀 2025 AI Powered Tool — Built with ❤️
          </footer>
        </div>
      </div>
    </>
  );
};

export default YoutubeSummary;
