// src/app/layout.jsx
import "./globals.css"

export const metadata = {
  title: "ComplianceHub",
  description: "A smarter way to manage staff compliance",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
