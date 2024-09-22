"use client"

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import "../styles/globals.css";
import Sidebar from '../conpoments/Sidebar';
import Header from '../conpoments/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const router = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel='manifest' href='manifest.json' />
        <title>title</title>
      </head>
      <body>
        <div className="min-h-screen bg-gray-100">
          <Header setIsOpen={setIsOpen} />
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} router={router} />
          <main className={clsx('mt-9 p-5 transition-all duration-200', isOpen ? 'ml-64' : '')}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
