import { useEffect, useState } from 'react'
import { EventInput } from '@fullcalendar/core'

interface Event {
  id: string
  title: string
  start: string
  end?: string
  allDay?: boolean
}

export const useFetchEvents = () => {
  const [events, setEvents] = useState<EventInput[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('/api/getEventsData')
      console.log(res)
      const data: Event[] = await res.json()
      setEvents(data)
    }

    fetchEvents()
  }, [])

  return events
}
