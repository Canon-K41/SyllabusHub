"use client"

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

import "../styles/globals.css";
import IconToggle from '../assets/icons/square-toggle.svg';
import IconHome from '../assets/icons/home.svg';
import IconSettings from '../assets/icons/setting.svg';
import IconHelp from '../assets/icons/help.svg';

export default function RootLayout({
  children,
}: Readonly<{
    children: React.ReactNode;
  }>) {
  const [isOpen, setIsOpen] = useState(false)
  const router = usePathname()
  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const links = [
    { href: '/', label: 'ホーム', icon: <IconHome className='inline-block mr-2' /> },
    { href: '/settings', label: '設定', icon: <IconSettings className='inline-block mr-2' /> },
    { href: '/help', label: 'ヘルプ', icon: <IconHelp className='inline-block mr-2' /> },
    ]

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
              <button
              className="p-2 fixed top-0 left-0 m-4 bg-white rounded shadow-lg z-10"
              onClick={() => setIsOpen(!isOpen)}
            ><IconToggle className='text-gray-700' />
              </button>

              <div
              className={clsx('fixed top-0 left-0 h-full w-60 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-10 md:translate-x-0', isOpen ? 'translate-x-0 ' : 'hidden' )}
            >
                <nav className="p-2 space-y-2">
                  <button
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded transition duration-200"
                  onClick={() => setIsOpen(!isOpen)}
                ><IconToggle className='inline-block mr-2' />
                  </button>

                {links.map(({ href, label, icon }) => (
                  <Link href={href}>
                    <div className={clsx('block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded transition duration-200 key={href}', { 'bg-gray-200': router === href } )}>
                      {icon}
                    {label}
                  </div>
                </Link>
                ))}

                </nav>
              </div>

              <main className={clsx('mt-9 p-5 transition-all duration-200', isOpen ? 'ml-64' : ' ')}>
                {children}
              </main>
            </div>
          </body>
        </html>
    )
  }
