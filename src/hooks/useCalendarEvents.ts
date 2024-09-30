import { useState, useEffect } from 'react';
import { getCalendarEvents, saveCalendarEvent } from '@/utils/indexedDB';
import { EventInput } from '@fullcalendar/core';

const useCalendarEvents = () => {
  const [events, setEvents] = useState<EventInput[]>([]);

  useEffect(() => {
    const loadCalendarEvents = async () => {
      const events = await getCalendarEvents();
      setEvents(events || []);
    };
    loadCalendarEvents();
  }, []);

  useEffect(() => {
    const saveCalendarEvents = async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      events.forEach(async event => {
        await saveCalendarEvent(event);
      });
    };
    saveCalendarEvents();
  }, [events]);

  return { events, setEvents };
}

export default useCalendarEvents;
