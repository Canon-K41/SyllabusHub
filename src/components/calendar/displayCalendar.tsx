import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listWeek from '@fullcalendar/list'
import { EventInput } from '@fullcalendar/core'



interface CalendarComponentProps {
  events: EventInput[]
  slotMinTime: string
  slotMaxTime: string
}

const DisplayCalendar: React.FC<CalendarComponentProps> = ({ events, slotMinTime, slotMaxTime  }) => {

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listWeek]}
      initialView="timeGridWeek"
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
      editable={false}
      dayMaxEvents={true}
      allDaySlot={true}
      height="auto"
      eventContent={(arg) => {
        const place = arg.event.extendedProps.place
        return (
          <div>
            <b>{arg.event.title}</b>
            {place && <div>場所：{place}</div>}
          </div>
        )
      }}
    />
  )
}

export default DisplayCalendar
