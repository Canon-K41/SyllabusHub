import { EventClickArg, DateSelectArg } from '@fullcalendar/core';

export const handleDateSelect = (selectInfo: DateSelectArg) => {
  const title = prompt('イベントのタイトルを入力してください:');
  const calendarApi = selectInfo.view.calendar;

  calendarApi.unselect(); // 選択を解除

  if (title) {
    calendarApi.addEvent({
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    });
  }
};

export const handleEventClick = (clickInfo: EventClickArg) => {
  if (confirm(`'${clickInfo.event.title}'を削除してもよろしいですか？`)) {
    clickInfo.event.remove();
  }
};
