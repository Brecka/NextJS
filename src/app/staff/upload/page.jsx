// pages/staff/upload.js
'use client'

import React, { useState } from 'react'

export default function StaffUploadPage() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) return alert('Please select a file')
    setUploading(true)
    setMessage('')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/hr/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (res.ok) {
        setMessage('Upload successful ✅')
        setFile(null)
      } else {
        setMessage('❌ ' + data.error)
      }
    } catch (err) {
      setMessage('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upload Staff Excel File</h1>

      <input type="file" accept=".xlsx" onChange={handleChange} />
      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  )
}
