'use client';

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import WorkSpaceHeader from "../workspace/_components/WorkSpaceHeader";

function InputPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // <-- Loading state
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading true on submit

    try {
      const res = await fetch("/api/chat-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Server response:", data.success);
        if (data.success) {
          router.push(`/web-chat/${data.url}`);
        }
      } else {
        console.error("Failed response:", await res.text());
      }
    } catch (err) {
      console.error("Error calling API:", err);
    }

    setInput("");
    setLoading(false); // Reset loading when done
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-black">
        <WorkSpaceHeader />
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-indigo-600 to-purple-700 text-white px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-gray-900 border border-white/10 p-8 rounded-2xl shadow-xl backdrop-blur-md"
        >
          <h1 className="text-3xl font-bold text-center mb-6 text-purple-300 tracking-tight">
            Welcome to ChatHub
          </h1>

          <div className="space-y-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              disabled={loading} // Disable input while loading
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={loading} // Disable button while loading
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition-all duration-200 shadow-md disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin w-5 h-5 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      fill="currentColor"
                      d="M4 12c0 4.418 3.582 8 8 8s8-3.582 8-8"
                    />
                  </svg>
                    Loading...
                 
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default InputPage;
