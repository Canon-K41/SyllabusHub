'use client'
import { useParams } from 'next/navigation';

export default function UserHomePage() {
  const { user_id } = useParams()

  return (
    <div className='text-red-600'>
      {user_id}
      <h1>User Home Page</h1>
    </div>
  )
}
