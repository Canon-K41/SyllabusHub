'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useResizeObserver } from '@/hooks/useResizeObserver';
import EventModal from '@/components/calendarSettings/EventModal';
import TimeSettings from '@/components/calendarSettings/TimeSettings';
import CalendarComponent from '@/components/calendarSettings/CalendarComponent';
import { getCalendarSetting, saveCalendarSetting, deleteDatabase } from '@/utils/indexedDB';
import { EventInput } from '@fullcalendar/core';

// カスタムフックを作成
const useCalendarSettings = () => {
  const [slotMinTime, setMinTime] = useState("09:00:00");
  const [slotMaxTime, setMaxTime] = useState("21:00:00");
  const [slotLabelInterval, setSlotLabelInterval] = useState("01:00:00");
  const [slotDuration, setSlotDuration] = useState("00:30:00");

  useEffect(() => {
    const loadCalendarSettings = async () => {
      const minTime = await getCalendarSetting('slotMinTime');
      const maxTime = await getCalendarSetting('slotMaxTime');
      const labelInterval = await getCalendarSetting('slotLabelInterval');
      const duration = await getCalendarSetting('slotDuration');
      setSlotDuration(duration || '00:30:00');
    };
    loadCalendarSettings();
    
  }, []);

  useEffect(() => {
    const saveCalendarSettings = async () => {
      await saveCalendarSetting('slotMinTime', slotMinTime);
      await saveCalendarSetting('slotMaxTime', slotMaxTime);
      await saveCalendarSetting('slotLabelInterval', slotLabelInterval);
      await saveCalendarSetting('slotDuration', slotDuration);
    };
    saveCalendarSettings();
  }, [slotMinTime, slotMaxTime, slotLabelInterval, slotDuration]);

  return { slotMinTime, setMinTime, slotMaxTime, setMaxTime, slotLabelInterval, setSlotLabelInterval, slotDuration, setSlotDuration };
};

const initializeNewEvent = (start = '', end = '') => ({
  id: '',
  title: '',
  start,
  end,
  place: '',
  url: '',
  description: '',
});

export default function SettingsCalendarPage() {
  const { ref, size } = useResizeObserver();
  const { slotMinTime, setMinTime, slotMaxTime, setMaxTime, slotLabelInterval, setSlotLabelInterval, slotDuration, setSlotDuration } = useCalendarSettings();
  const [events, setEvents] = useState<EventInput[]>([]);
  const [newEvent, setNewEvent] = useState(initializeNewEvent());
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const handleEventClick = useCallback((clickInfo: any) => {
    clickInfo.jsEvent.preventDefault();
    setNewEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.startStr,
      end: clickInfo.event.endStr,
      place: clickInfo.event.extendedProps.place || '',
      url: clickInfo.event.url || '',
      description: clickInfo.event.extendedProps.description || '',
    });
    openModal();
  }, [openModal]);

  async function getStartTimes() {
    const data = await getCalendarSetting('slotMinTime');
    console.log(data);
  }


  const handleDateSelect = useCallback((selectInfo: any) => {
    setNewEvent(initializeNewEvent(selectInfo.startStr, selectInfo.endStr));
    openModal();
  }, [openModal]);

  const handleEventChange = useCallback((dropInfo: any) => {
    setEvents((prevEvents: EventInput[]) => {
      const updatedEvents = prevEvents.map(event => {
        if (event.id === dropInfo.event.id) {
          return {
            ...event,
            start: dropInfo.event.startStr,
            end: dropInfo.event.endStr,
          };
        }
        return event;
      });
      return updatedEvents;
    });
  }, []);

  const handleSubmit = useCallback(() => {
    if (newEvent.id === '') {
      newEvent.id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }
    setEvents((prevEvents: EventInput[]) => {
      const existingEventIndex = prevEvents.findIndex(event => event.id === newEvent.id);
      if (existingEventIndex !== -1) {
        const updatedEvents = [...prevEvents];
        updatedEvents[existingEventIndex] = newEvent;
        return updatedEvents;
      } else {
        return [...prevEvents, newEvent];
      }
    });
    closeModal();
  }, [newEvent, closeModal]);

  const deleteEvent = useCallback(() => {
    setEvents((prevEvents: EventInput[]) => prevEvents.filter(event => event.id !== newEvent.id));
    closeModal();
  }, [newEvent.id, closeModal]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent: any) => ({
      ...prevEvent,
      [name]: value,
    }));
  }, []);

  return (
    <div ref={ref} className='p-4'>
      <button onClick={deleteDatabase} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>データベースを削除</button>
      <button onClick={getStartTimes} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>データベースを取得</button>
      <TimeSettings
        slotMinTime={slotMinTime}
        setMinTime={setMinTime}
        slotMaxTime={slotMaxTime}
        setMaxTime={setMaxTime}
        slotLabelInterval={slotLabelInterval}
        setSlotLabelInterval={setSlotLabelInterval}
        slotDuration={slotDuration}
        setSlotDuration={setSlotDuration}
      />
      <CalendarComponent
        slotMinTime={slotMinTime}
        slotMaxTime={slotMaxTime}
        slotLabelInterval={slotLabelInterval}
        slotDuration={slotDuration}
        events={events}
        handleEventClick={handleEventClick}
        handleDateSelect={handleDateSelect}
        handleEventChange={handleEventChange}
      />
      <EventModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        newEvent={newEvent}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        deleteEvent={deleteEvent}
      />
    </div>
  );
}
