import React from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listWeek from '@fullcalendar/list';

const CalendarComponent = ({ slotMinTime, slotMaxTime, slotLabelInterval, slotDuration, events, handleEventClick, handleDateSelect }) => {
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
      eventContent={(arg) => {
        const place = arg.event.extendedProps.place;
        return (
          <div>
            <b>{arg.event.title}</b>
            {place && <div>場所：{place}</div>}
            {arg.event.url && <div>URL：{arg.event.url}</div>}
          </div>
        );
      }}
    />
  );
};

export default CalendarComponent;
