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
});
export default initializeNewEvent;
