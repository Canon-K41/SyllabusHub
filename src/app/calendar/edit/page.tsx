'use client';

import React, { useState, useCallback } from 'react';
import { useResizeObserver } from '@/hooks/useResizeObserver';
import EventModal from '@/components/calendarSettings/EventModal';
import CalendarSettings from '@/components/calendarSettings/CalendarSetting';
import CalendarComponent from '@/components/calendarSettings/CalendarComponent';
import useCalendarSettings from '@/hooks/useCalendarSettings';
import useCalendarEvents from '@/hooks/useCalendarEvents';
import { EventInput, EventClickArg, DateSelectArg, EventDropArg } from '@fullcalendar/core';
import { EventResizeDoneArg } from '@fullcalendar/interaction';

const initializeNewEvent = (startStr = '', endStr = '') => ({
  id: '',
  title: '',
  start: startStr,
  end: endStr,
  url: '',
  extendedProps: {
    place: '',
    description: '',
  },
});
export default function SettingsCalendarPage() {
  const { ref } = useResizeObserver();
  const { slotMinTime, setMinTime, slotMaxTime, setMaxTime, slotLabelInterval, setSlotLabelInterval, slotDuration, setSlotDuration, defaultView, setDefaultView } = useCalendarSettings();
  const { events, setEvents } = useCalendarEvents();
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
      url: clickInfo.event.url || '',
      extendedProps: {
        place: clickInfo.event.extendedProps.place || '',
        description: clickInfo.event.extendedProps.description || '',
      },
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
  }, [setEvents]);

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
  }, [setEvents]);

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
  }, [newEvent, closeModal, setEvents]);

  const deleteEvent = useCallback(() => {
    setEvents((prevEvents: EventInput[]) => prevEvents.filter(event => event.id !== newEvent.id));
    closeModal();
  }, [newEvent.id, closeModal, setEvents]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'place' || name === 'description') {
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        extendedProps: {
          ...prevEvent.extendedProps,
          [name]: value,
        },
      }));
    }
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  }, [setNewEvent]);
  console.log(events);

  return (
      <div ref={ref} >
        <CalendarSettings
        slotMinTime={slotMinTime}
        setMinTime={setMinTime}
        slotMaxTime={slotMaxTime}
        setMaxTime={setMaxTime}
        slotLabelInterval={slotLabelInterval}
        setSlotLabelInterval={setSlotLabelInterval}
        slotDuration={slotDuration}
        setSlotDuration={setSlotDuration}
        defaultView={defaultView}
        setDefaultView={setDefaultView}
      />
      <CalendarComponent
        slotMinTime={slotMinTime}
        slotMaxTime={slotMaxTime}
        slotLabelInterval={slotLabelInterval}
        slotDuration={slotDuration}
        defaultView={defaultView}
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
