'use client';
import { useState } from 'react';

export default function ExcelUploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setMessage('');

    try {
      const res = await fetch('/api/hr/staff-upload', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        setMessage(`✅ Success: ${result.message}`);
      } else {
        setMessage(`❌ Error: ${result.error}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Upload failed. Check the console for details.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-muted/40 text-foreground">
      <h1 className="text-2xl font-bold mb-4">📥 Upload Staff Excel Sheet</h1>

      <input type="file" accept=".xlsx" onChange={handleFileChange} className="mb-4" />

      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {message && (
        <div className="mt-4 p-4 border rounded bg-white text-sm shadow-sm">
          {message}
        </div>
      )}
    </div>
  );
}
