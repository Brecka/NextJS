// src/lib/auth.js
import { getServerSession } from "next-auth"

// Just return the session from the API-defined auth handler
export async function getSession() {
  return await getServerSession()
}
