"use client"
 
import React from 'react'
import { useFetchEvents } from '@/hooks/useFetchEvents'
import DisplayCalendar from '@/components/calendar/displayCalendar'
import { useResizeObserver } from '@/hooks/useResizeObserver'

export default function WeeklyCalendar() {
  const { ref, size } = useResizeObserver();
  const events = useFetchEvents()

  return (
<div ref={ref} className='p-4 w-full h-full'>
      <DisplayCalendar
        size={size}
        events={events}
        slotMinTime="04:00:00"
        slotMaxTime="21:00:00"
      />
    </div>
  )
}
