'use client';

import React, { useState, useCallback } from 'react';
import { useResizeObserver } from '@/hooks/useResizeObserver';
import EventModal from '@/components/calendarSettings/EventModal';
import TimeSettings from '@/components/calendarSettings/TimeSettings';
import CalendarComponent from '@/components/calendarSettings/CalendarComponent';
import useCalendarSettings from '@/hooks/useCalendarSettings';
import initializeNewEvent from '@/utils/initializeNewEvent';
import { EventInput, EventClickArg, DateSelectArg, EventDropArg } from '@fullcalendar/core';
import { EventResizeDoneArg } from '@fullcalendar/interaction';

export default function SettingsCalendarPage() {
  const { ref } = useResizeObserver();
  const { slotMinTime, setMinTime, slotMaxTime, setMaxTime, slotLabelInterval, setSlotLabelInterval, slotDuration, setSlotDuration } = useCalendarSettings();
  const [events, setEvents] = useState<EventInput[]>([]);
  const [newEvent, setNewEvent] = useState(initializeNewEvent());
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
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

  const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
    setNewEvent(initializeNewEvent(selectInfo.startStr, selectInfo.endStr));
    openModal();
  }, [openModal]);

  const handleEventDrop = useCallback((info: EventDropArg) => {
    setEvents((prevEvents: EventInput[]) => {
      const updatedEvents = prevEvents.map(event => {
        if (event.id === info.event.id) {
          return {
            ...event,
            start: info.event.startStr,
            end: info.event.endStr,
          };
        }
        return event;
      });
      return updatedEvents;
    });
  }, []);

  const handleEventResize = useCallback((info: EventResizeDoneArg) => {
    setEvents((prevEvents: EventInput[]) => {
      const updatedEvents = prevEvents.map(event => {
        if (event.id === info.event.id) {
          return {
            ...event,
            start: info.event.startStr,
            end: info.event.endStr,
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
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  }, []);

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
        handleEventResize={handleEventResize}
        handleEventDrop={handleEventDrop}
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
