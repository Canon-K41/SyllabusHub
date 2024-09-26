export const handleDateSelect = (selectInfo: any) => {
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

export const handleEventClick = (clickInfo: any) => {
  if (confirm(`'${clickInfo.event.title}'を削除してもよろしいですか？`)) {
    clickInfo.event.remove()
  }
}
