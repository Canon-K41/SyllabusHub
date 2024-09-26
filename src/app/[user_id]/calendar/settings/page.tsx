'use client'
import { useParams } from 'next/navigation'

export default function SettingsCalendarPage() {
  const { user_id } = useParams()

  return (
    <div>
      {user_id}
      <h1>Settings Calendar Page</h1>
    </div>
  )
}
