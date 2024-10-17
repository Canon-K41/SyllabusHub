"use client"
//
//import TimeTable from '@/ui/calendar/TimeTable'
//
//export default function Page() {
//  return (
//    <TimeTable />
//  )
//}

import React, { useRef, useEffect } from 'react'
import { useResizeObserver } from '@/hooks/useResizeObserver'
import useCalendarSettings from '@/hooks/useCalendarSettings'
import useCalendarEvents from '@/hooks/useCalendarEvents'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listWeek from '@fullcalendar/list'
import Tooltip from '@mui/material/Tooltip'
import rrulePlugin from '@fullcalendar/rrule'
import useClassEvents from '@/hooks/useClassEvents'
import '@/styles/toolbar.css'

export default function WeeklyCalendar() {
  const { ref } = useResizeObserver();
  const { slotMinTime, slotMaxTime, slotLabelInterval, slotDuration, defaultView } = useCalendarSettings();
  const { events } = useCalendarEvents();
  const { classEvents } = useClassEvents();
  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(defaultView);
    }
  }, [defaultView]);

  return (
    <div ref={ref} >
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, listWeek, interactionPlugin, rrulePlugin]}
        initialView={defaultView}
        slotDuration={slotDuration}
        slotLabelInterval={slotLabelInterval}
        slotLabelFormat={{ hour: 'numeric', minute: '2-digit', omitZeroMinute: false, meridiem: 'short' }}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        locale="ja"
        timeZone="Asia/Tokyo"
        slotMinTime={slotMinTime}
        slotMaxTime={slotMaxTime}
        events={[...events, ...classEvents]}
        editable={false}
        selectable={false}
        dayMaxEvents={true}
        allDaySlot={false}
        height='auto'
        eventContent={(arg) => {
          const place = arg.event.extendedProps.place;
          return (
            <Tooltip title={arg.event.extendedProps.description} className='h-full'>
              <div>
                <b>{arg.event.title}</b>
                {arg.timeText && <div>{arg.timeText}</div>}
                {place && <div>場所：{place}</div>}
              </div>
            </Tooltip>
          );
        }}
      />
    </div>
  )
}

