import { useState, useEffect } from 'react';
import { getCalendarSetting, saveCalendarSetting } from '@/utils/indexedDB';

const useCalendarSettings = () => {
  const [slotMinTime, setMinTime] = useState("09:00:00");
  const [slotMaxTime, setMaxTime] = useState("21:00:00");
  const [slotLabelInterval, setSlotLabelInterval] = useState("01:00:00");
  const [slotDuration, setSlotDuration] = useState("00:30:00");
  const [defaultView, setDefaultView] = useState('timeGridWeek');

  useEffect(() => {
    const loadCalendarSettings = async () => {
      const minTime = await getCalendarSetting('slotMinTime');
      const maxTime = await getCalendarSetting('slotMaxTime');
      const labelInterval = await getCalendarSetting('slotLabelInterval');
      const duration = await getCalendarSetting('slotDuration');
      const view = await getCalendarSetting('defaultView');
      setMinTime(minTime || '09:00:00');
      setMaxTime(maxTime || '21:00:00');
      setSlotLabelInterval(labelInterval || '01:00:00');
      setSlotDuration(duration || '00:30:00');
      setDefaultView(view || 'timeGridWeek');
    };
    loadCalendarSettings();
  }, []);

  useEffect(() => {
    const saveCalendarSettings = async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      await saveCalendarSetting('slotMinTime', slotMinTime);
      await saveCalendarSetting('slotMaxTime', slotMaxTime);
      await saveCalendarSetting('slotLabelInterval', slotLabelInterval);
      await saveCalendarSetting('slotDuration', slotDuration);
      await saveCalendarSetting('defaultView', defaultView);
    };
    saveCalendarSettings();
  }, [slotMinTime, slotMaxTime, slotLabelInterval, slotDuration, defaultView]);

  return { slotMinTime, setMinTime, slotMaxTime, setMaxTime, slotLabelInterval, setSlotLabelInterval, slotDuration, setSlotDuration, defaultView, setDefaultView };
};

export default useCalendarSettings;
