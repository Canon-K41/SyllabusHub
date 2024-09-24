"use client"

import "@/styles/globals.css";
import { useState, useEffect } from 'react'
import IconToggle from '@/assets/icons/square-toggle.svg'
import IconHome from '@/assets/icons/home.svg'
import IconCalendar from '@/assets/icons/week-calendar.svg'
import IconSettings from '@/assets/icons/setting.svg'
import IconHelp from '@/assets/icons/help.svg'
import Link from 'next/link'
import clsx from 'clsx'

const links = [
  { href: '/', label: 'ホーム', icon: <IconHome className='inline-block mr-2' /> },
  { href: '/calendar', label: '時間割', icon: <IconCalendar className='inline-block mr-2' /> },
  { href: '/settings', label: '設定', icon: <IconSettings className='inline-block mr-2' /> },
  { href: '/help', label: 'ヘルプ', icon: <IconHelp className='inline-block mr-2' /> },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

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

            <div
            className={clsx('fixed top-0 left-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-10 md:translate-x-0', isOpen ? 'w-44' : 'hidden -translate-x-full')}
          >
              <nav className="p-2 space-y-2">
                {links.map((link, index) => (
                  <Link href={link.href}>
                    <div key={index} className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded transition duration-200">
                      {link.icon}
                      {link.label}
                    </div>
                    </Link>
                ))}
              </nav>
            </div>

            <header className={clsx('flex h-16 bg-white fixed w-full items-center shadow top-0 z-20', isOpen ? 'ml-44' : '' )}>
            <button
              className='p-3 rounded-md hover:bg-gray-200 '
              onClick={() => setIsOpen(!isOpen)}
            >
              <IconToggle className='text-gray-700' />
            </button>
          </header>

          <div className={clsx('pt-16 transition-all duration-200 flex-col fixed', isOpen ? 'ml-44 ' : '')}>
            <div className="h-screen overflow-auto">
              {children}
            </div>
          </div>

          </div>
        </body>

      </html>
  );
}
