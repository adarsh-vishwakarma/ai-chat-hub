'use client';

import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 z-50 flex justify-between items-center p-5 w-[calc(100%-16rem)] bg-[#0f0f11]/90 backdrop-blur-md shadow-lg ring-1 ring-white/10 shadow-[0_0_10px_rgba(255,255,255,0.05)] text-white">

      {/* Dashboard Link */}
      <Link href="/dashboard">
        <span className="text-sm font-medium hover:text-blue-600 transition-colors cursor-pointer">
          ← Back to Dashboard
        </span>
      </Link>

      {/* User Button */}
   <UserButton />
    </header>
  );
};

export default Header;
