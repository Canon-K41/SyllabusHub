import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listWeek from '@fullcalendar/list'
import { EventInput } from '@fullcalendar/core'



interface displayCalendarProps {
  events: EventInput[]
  slotMinTime: string
  slotMaxTime: string
}
const DisplayCalendar= ({ events, slotMinTime, slotMaxTime  }: displayCalendarProps) => {

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, listWeek]}
      initialView="timeGridWeek"
      slotDuration="00:10:00"
      slotLabelInterval="00:30:00"
      slotLabelFormat={{ hour: 'numeric', minute: '2-digit', omitZeroMinute: false, meridiem: 'short' }}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridWeek,dayGridMonth,timeGridDay'
      }}
      locale="ja"
      allDaySlot={false}
      timeZone="Asia/Tokyo"
      slotMinTime={slotMinTime}
      slotMaxTime={slotMaxTime}
      events={events}
      editable={false}
      dayMaxEvents={true}
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
