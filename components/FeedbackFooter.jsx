'use client';

import { Sparkles } from 'lucide-react';
import { useState } from 'react';

const FeedbackFooter = () => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!feedback.trim()) return;

    // Replace with your API call or feedback handling logic
    console.log('User feedback:', feedback);

    setSubmitted(true);
    setFeedback('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
 // Place this at the bottom of your Home component's return()
<footer className="bg-gradient-to-t from-black via-purple-900/20 to-transparent py-16 border-t border-purple-500/10">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
      We'd love your feedback!
    </h2>
    <p className="text-gray-400 mb-8">
      Help us improve AI Chat Hub by sharing your thoughts.
    </p>
    <form className="max-w-2xl mx-auto">
      <textarea
        placeholder="Your feedback..."
        className="w-full p-4 rounded-xl bg-black border border-purple-500/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
        rows={4}
      ></textarea>
      <button
        type="submit"
        className="mt-6 inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:opacity-90 transition-opacity shadow-lg"
      >
        <Sparkles className="h-5 w-5 mr-2" />
        Submit Feedback
      </button>
    </form>
  </div>
  <div className="mt-8 text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} AI Chat Hub. All rights reserved.
          </div>
</footer>

  );
};

export default FeedbackFooter;
