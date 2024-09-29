const initializeNewEvent = (startStr = '', endStr = '') => ({
  id: '',
  title: '',
  start: startStr,
  end: endStr,
  url: '',
  extendedProps: {
    place: '',
    description: '',
  },
  rrule: {
    freq: '',
    count: 0,
    interval: 0,
    byweekday: [] as string[],
    dtstart: '',
    until: '',
  },
  exdate: [] as string[],
});
export default initializeNewEvent;
