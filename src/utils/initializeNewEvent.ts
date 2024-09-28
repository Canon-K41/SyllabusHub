import { EventInput } from '@fullcalendar/core';

const initializeNewEvent = (start: string = '', end: string = ''): EventInput => ({
  id: '',
  title: '',
  start,
  end,
  url: '',
  extendedProps: {
    place: '',
    description: '',
  },
});

export default initializeNewEvent;
