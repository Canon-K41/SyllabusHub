'use client';
import React, { useEffect, useState } from 'react';

export default function Page() {
  interface Event {
    id: string;
    title: string;
    start: string;
    end: string;
    all_day: boolean;
  }

  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Event[] = await response.json();
        console.log('Fetched data:', data); // デバッグ用のログ出力
        setEvents(data);
      } catch (error: any) {
        console.error('Fetch error:', error); // デバッグ用のログ出力
        setError(error.message);
      }
    };

    fetchEvents();
  }, []);


  return (
    <div className='text-sky-600 overscroll-auto'>
      <h1>Events</h1>
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.title}</li>
        ))}
      </ul>
    </div>
  );
}
