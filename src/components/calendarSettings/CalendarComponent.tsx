import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listWeek from '@fullcalendar/list';
import { EventClickArg, DateSelectArg, EventInput, EventDropArg } from '@fullcalendar/core';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';

interface CalendarComponentProps {
  slotMinTime: string;
  slotMaxTime: string;
  slotLabelInterval: string;
  slotDuration: string;
  events: EventInput[];
  handleEventClick: (clickInfo: EventClickArg) => void;
  handleDateSelect: (selectInfo: DateSelectArg) => void;
  handleEventChange: (info: EventDropArg | EventResizeDoneArg) => void;
}

const CalendarComponent = ({ slotMinTime, slotMaxTime, slotLabelInterval, slotDuration, events, handleEventClick, handleDateSelect, handleEventChange }: CalendarComponentProps) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, listWeek, interactionPlugin]}
      initialView="timeGridWeek"
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
      eventDrop={(dropInfo) => handleEventChange(dropInfo)}
      eventResize={(resizeInfo) => handleEventChange(resizeInfo)}
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
