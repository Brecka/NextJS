import { NextResponse } from 'next/server'

export function middleware(request) {
  const host = request.headers.get('host')
  if (host === 'divionsystems.com') {
    return NextResponse.redirect('https://www.divionsystems.com', 308)
  }
  return NextResponse.next()
}
