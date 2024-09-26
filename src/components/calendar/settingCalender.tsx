import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listWeek from '@fullcalendar/list'
import { EventInput } from '@fullcalendar/core'



interface CalendarComponentProps {
  events: EventInput[]
  handleDateSelect: (selectInfo: any) => void
  handleEventClick: (clickInfo: any) => void
}

const SettingCalendar: React.FC<CalendarComponentProps> = ({ events, handleDateSelect, handleEventClick }) => {
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
      slotMinTime="04:00:00"
      slotMaxTime="21:00:00"
      events={events}
      editable={false}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      select={handleDateSelect}
      eventClick={handleEventClick}
      allDaySlot={false}
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

export default SettingCalendar
