'use client';

import { useSession } from 'next-auth/react';

export default function DashboardClient() {
  const { data: session } = useSession();

  if (!session) return <p>Loading or not authenticated</p>;

  return <h1>Welcome, {session.user.name}</h1>;
}
