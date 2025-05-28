'use client';
import React from 'react';

const Loading = () => {
  return (
    <div className="h-screen w-screen bg-gray-900 flex flex-col items-center justify-center text-white">
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-lg">Loading...</p>
    </div>
  );
};

export default Loading;
