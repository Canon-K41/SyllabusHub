'use client'

import "@/styles/globals.css";
import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import useWindowResize from '@/hooks/useWindowResize';
import clsx from 'clsx';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useWindowResize(setIsOpen);

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
          <Sidebar isOpen={isOpen} />
          <Header toggleSidebar={() => setIsOpen(!isOpen)} />
          <div className={clsx("pt-16 transition-all duration-200 flex-col fixed", isOpen ? "w-[calc(100%-14rem)] ml-56" : "w-full")}>
            <div className="h-screen overflow-auto">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
