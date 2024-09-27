'use client';
import React, { useState, useCallback } from 'react';
import { useResizeObserver } from '@/hooks/useResizeObserver';
import EventModal from '@/components/calendarSettings/EventModal';
import TimeSettings from '@/components/calendarSettings/TimeSettings';
import CalendarComponent from '@/components/calendarSettings/CalendarComponent';
import { EventInput } from '@fullcalendar/core';

export default function SettingsCalendarPage() {
  const { ref, size } = useResizeObserver();
  const [slotMinTime, setMinTime] = useState("09:00:00");
  const [slotMaxTime, setMaxTime] = useState("21:00:00");
  const [slotLabelInterval, setSlotLabelInterval] = useState("01:00:00");
  const [slotDuration, setSlotDuration] = useState("00:30:00");
  const [events, setEvents] = useState<EventInput[]>([]);
  const [newEvent, setNewEvent] = useState({id: '', title: '', start: '', end: '', place: '', url: '', description: ''});
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const handleEventClick = (clickInfo: any) => {
    clickInfo.jsEvent.preventDefault(); // デフォルトのリンク動作を無効にする

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
  };

  const handleDateSelect = (selectInfo: any) => {
    setNewEvent({
      id: '',
      title: '',
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      place: '',
      url: '',
      description: '',
    });
    openModal();
  };

  const handleSubmit = () => {
    if (newEvent.id === '') {
      newEvent.id = String(events.length + 1);
    }
    setEvents((prevEvents: EventInput[]) => {
      const existingEventIndex = prevEvents.findIndex(event => event.id === newEvent.id);
      if (existingEventIndex !== -1) {
        // Update existing event
        const updatedEvents = [...prevEvents];
        updatedEvents[existingEventIndex] = newEvent;
        return updatedEvents;
      } else {
        // Add new event
        return [...prevEvents, newEvent];
      }
    });
    closeModal();
  };

  const deleteEvent = () => {
    setEvents((prevEvents: EventInput[]) => prevEvents.filter(event => event.id !== newEvent.id));
    closeModal();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent: any) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  return (
    <div ref={ref} className='p-4'>
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
