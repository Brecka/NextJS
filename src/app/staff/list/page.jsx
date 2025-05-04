// app/staff/list/page.jsx
'use client'

import { useEffect, useState } from 'react'

export default function StaffListPage() {
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStaff() {
      const res = await fetch('/api/hr/getStaff')
      const data = await res.json()
      setStaff(data)
      setLoading(false)
    }
    fetchStaff()
  }, [])

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Staff List</h1>

      {loading ? (
        <p>Loading...</p>
      ) : staff.length === 0 ? (
        <p>No staff records found.</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">First Name</th>
              <th className="border p-2">Last Name</th>
              <th className="border p-2">Hire Date</th>
              <th className="border p-2">Rehire Date</th>
              <th className="border p-2">Job Title</th>
              <th className="border p-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((s, idx) => (
              <tr key={idx} className="even:bg-gray-50">
                <td className="border p-2">{s.firstName}</td>
                <td className="border p-2">{s.lastName}</td>
                <td className="border p-2">{s.hireDate}</td>
                <td className="border p-2">{s.rehireDate || '—'}</td>
                <td className="border p-2">{s.jobTitle}</td>
                <td className="border p-2">{s.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
