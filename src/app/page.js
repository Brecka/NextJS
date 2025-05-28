// src/app/page.jsx
// This component determines what to show at the root ("/") of the app — either redirecting to the login or dashboard

"use client" // Enables use of React hooks like useEffect on the client side

import { useEffect } from "react" // React hook to run logic after the component mounts
import { useRouter } from "next/navigation" // Next.js navigation for client-side routing

// Temporary placeholder to simulate login status
// Replace this with your real authentication logic
const isAuthenticated = false

export default function Home() {
  const router = useRouter() // Get Next.js router instance

  useEffect(() => {
    // Redirect user based on authentication status
    // If logged in, go to dashboard — if not, go to login
    router.replace(isAuthenticated ? "/dashboard" : "/login")
  }, []) // Empty dependency array ensures this runs only once after first render

  return null // Component doesn't render anything visible — it just redirects
}
