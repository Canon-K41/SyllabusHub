"use client"

import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import { EventInput } from '@fullcalendar/core' // 修正箇所
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
        views={{
          timeGridWeek: {
            type: 'timeGrid',
            duration: { weeks: 1 },
            titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' },
            buttonText: '週',
            click: function() {
              console.log('week view')
            }
          }
        }}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,timeGridDay,dayGridMonth,dayGridWeek,listDay,listWeek,listMonth'
        }}
        editable={true}
        timeZone="Asia/Tokyo"
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={events} // ここで取得したイベントデータを設定
        select={handleDateSelect}
        eventClick={handleEventClick}
        locale="ja"
        allDaySlot={false}
        slotMinTime="04:00:00"
        slotMaxTime="21:00:00"
        height="auto"
      />
    </div>
  )
}
