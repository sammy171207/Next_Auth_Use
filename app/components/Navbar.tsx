'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-white text-black px-4 py-2 shadow-md">
      <nav className="container mx-auto flex justify-between items-center"> 
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session?.user ? (
            <>
              <Link href="/startup/create"><span>Create</span></Link>
              <button onClick={() => signOut()}><span>Logout</span></button>
              <Link href={`/user/${session.user.id}`}><span>{session.user.name}</span></Link>
            </>
          ) : (
            <button onClick={() => signIn('github')}>Login</button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
