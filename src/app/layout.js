// src/app/layout.jsx
import "./globals.css"
import { Toaster } from "sonner"

export const metadata = {
  title: "ComplianceHub",
  description: "A smarter way to manage staff compliance",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  )
}
