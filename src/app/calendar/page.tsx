"use client"

import { useResizeObserver } from '@/hooks/useResizeObserver';
import WeeklyCalendar from '@/components/calendar/weekly-calendar';

export default function Page() {
  const { ref, size } = useResizeObserver();

  return (
    <div ref={ref} style={{ width: '100%', height: '100%' }}>
      <WeeklyCalendar size={size} />
    </div>
  );
}
