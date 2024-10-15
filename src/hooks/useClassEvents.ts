import { useState, useCallback, useEffect } from 'react';
import { getClassData } from '@/utils/indexedDB';
import { ClassData } from '@/types/type';

const useClassEvents = () => {
  const [classEvents, setClassEvents] = useState<ClassData[]>([]);

  const loadClassEvents = useCallback(async () => {
    const classes = await getClassData();
    const classEvents = classes.map((classData) => {
      if (classData.rrule && classData.rrule.freq) {
        return {
          class_id: classData.class_id,
          title: classData.title,
          url: classData.url,
          duration: classData.duration,
          instructor: classData.instructor,
          university: classData.university,
          description: classData.description,
          exdata: classData.exdata,
          rrule: {
            freq: classData.rrule.freq,
            interval: classData.rrule.interval,
            count: classData.rrule.count,
            byweekday: classData.rrule.byweekday,
            dtstart: classData.rrule.dtstart + ':00',
          },
        };
      }
      return null; // Return null for invalid objects
    }).filter(event => event !== null); // Filter out null values

    setClassEvents(classEvents as ClassData[]);
  }, []);

  useEffect(() => {
    loadClassEvents();
  }, [loadClassEvents]);

  return { classEvents, setClassEvents };
};

export default useClassEvents;
