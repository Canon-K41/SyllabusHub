import React from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import rrulePlugin from '@fullcalendar/rrule';
import listWeek from '@fullcalendar/list';
import { EventClickArg, DateSelectArg, EventInput, EventDropArg } from '@fullcalendar/core';

interface CalendarComponentProps {
  slotMinTime: string;
  slotMaxTime: string;
  slotLabelInterval: string;
  slotDuration: string;
  defaultView: string;
  events: EventInput[];
  handleEventClick: (clickInfo: EventClickArg) => void;
  handleDateSelect: (selectInfo: DateSelectArg) => void;
  handleEventResize: (resizeInfo: EventResizeDoneArg) => void;
  handleEventDrop: (dropInfo: EventDropArg) => void;
}

const CalendarComponent = ({ slotMinTime, slotMaxTime, slotLabelInterval, slotDuration, defaultView, events, handleEventClick, handleDateSelect, handleEventResize, handleEventDrop}: CalendarComponentProps) => {

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, listWeek, interactionPlugin]}
      initialView={defaultView}
      slotDuration={slotDuration}
      slotLabelInterval={slotLabelInterval}
      slotLabelFormat={{ hour: 'numeric', minute: '2-digit', omitZeroMinute: false, meridiem: 'short' }}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridWeek,dayGridMonth,timeGridDay'
      }}
      locale="ja"
      timeZone="Asia/Tokyo"
      slotMinTime={slotMinTime}
      slotMaxTime={slotMaxTime}
      events={events}
      editable={true}
      selectable={true}
      dayMaxEvents={true}
      allDaySlot={false}
      height='auto'
      eventClick={(clickInfo) => handleEventClick(clickInfo)}
      select={(selectInfo) => handleDateSelect(selectInfo)}
      eventDrop={(dropInfo) => handleEventDrop(dropInfo)}
      eventResize={(resizeInfo) => handleEventResize(resizeInfo)}
      eventContent={(arg) => {
        const place = arg.event.extendedProps.place;
        return (
          <div>
            <b>{arg.event.title}</b>
            {arg.timeText && <div>{arg.timeText}</div>}
            {place && <div>場所：{place}</div>}
            {arg.event.url && <div>URL：{arg.event.url}</div>}
            {arg.event.extendedProps.description && <div>説明：{arg.event.extendedProps.description}</div>}
          </div>
        );
      }}
    />
  );
};

export default CalendarComponent;
