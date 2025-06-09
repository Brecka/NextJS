// import { redirect } from "next/navigation"
// import { getSession } from "@/lib/auth"

export default function AuthLayout({ children }) {
  // MVP mode — no session check for now
  // const session = await getSession()
  // if (!session) {
  //   redirect("/login")
  // }

  return <>{children}</>
}
