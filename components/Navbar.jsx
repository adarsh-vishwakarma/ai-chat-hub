'use client';

import Image from 'next/image';
import Link from 'next/link';
import { UserButton, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button'; // assuming you're using shadcn/ui
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <nav className="w-full shadow-sm px-6 py-4 flex justify-between items-center bg-white">
      {/* Logo */}
      <Link href="/dashboard">
        <div className="flex items-center gap-2 cursor-pointer">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-6 items-center text-sm font-medium">
        <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
        <Link href="/dashboard/upgrade" className="hover:text-blue-600">Upgrade</Link>
        <Link href="/about" className="hover:text-blue-600">About</Link>
      </div>

      {/* User or Sign In */}
      <div className="flex items-center gap-3">
        {user ? (
          <UserButton />
        ) : (
          <Button onClick={() => router.push('/sign-in')}>
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
