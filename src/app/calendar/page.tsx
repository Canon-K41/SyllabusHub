"use client"

import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default function WeeklyCalendar() {
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
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,timeGridDay'
        }}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        initialEvents={[
          { title: 'イベント1', start: new Date() }
        ]}
        select={handleDateSelect}
        eventClick={handleEventClick}
        locale="ja"
        allDaySlot={false}
        slotMinTime="07:00:00"
        slotMaxTime="21:00:00"
        height="auto"
        className="fc-theme-standard"
      />
    </div>
  )
}
