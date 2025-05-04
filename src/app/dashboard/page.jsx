  'use client'
import { useSession } from 'next-auth/react'

export default function Dashboard() {
  const { data: session } = useSession()

  if (!session) return <p>Loading...</p>

  return (
    <div>
      <h2>Welcome, {session.user.name}</h2>
      <p>Your role: {session.user.role}</p>
    </div>
  )
}

