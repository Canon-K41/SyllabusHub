import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import { EventInput } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listWeek from '@fullcalendar/list'

interface Event {
  id: string
  title: string
  start: string
  end?: string
  allDay?: boolean
}

export default function WeeklyCalendar() {
  const [events, setEvents] = useState<EventInput[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('/api/events')
      const data: Event[] = await res.json()
      setEvents(data)
    }

    fetchEvents()
  }, [])

  const handleDateSelect = (selectInfo: any) => {
    const title = prompt('イベントのタイトルを入力してください:')
    const calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // 選択を解除

    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  const handleEventClick = (clickInfo: any) => {
    if (confirm(`'${clickInfo.event.title}'を削除してもよろしいですか？`)) {
      clickInfo.event.remove()
    }
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
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
        events={[
          {
            id: '1',
            title: 'test',
            start: '2024-09-01T09:00:00',
            end: '2024-09-01T10:00:00',
            allDay: false,
            display: 'block',
            extendedProps: { place: 'room1' },
            eventContent: function(arg: { event: { extendedProps: { place: string } } }) {
              let place = document.createElement('div')
              place.innerHTML = arg.event.extendedProps.place
              return { domNodes: [place] }
            }
          },
          {
            id: '2',
            title: 'test2',
            start: '2024-09-02T09:00:00',
            end: '2024-09-02T10:00:00',
            allDay: false,
            className: 'bg-blue-500 text-white hover:bg-blue-600'
          },
          {
            id: '3',
            title: 'test3',
            start: '2024-09-03T09:00:00',
            end: '2024-09-03T10:00:00',
            allDay: false
          }
        ]}
        editable={true}
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
    </div>
  )
}
