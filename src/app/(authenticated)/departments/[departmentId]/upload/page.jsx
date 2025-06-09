'use client';

import React, { useState } from 'react';
import './page.css';

const employees = [
  { id: '1', name: 'Aisha Carter' },
  { id: '2', name: 'David Stone' },
  { id: '3', name: 'Mariah Diaz' },
];

export default function UploadPage() {
  const [matches, setMatches] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const autoMatchFiles = (files, employees) =>
    files.map((file) => {
      const fileName = file.name.toLowerCase().replace(/\.[^/.]+$/, '');
      const matchedEmployee = employees.find((emp) => {
        const normalized = emp.name.toLowerCase().replace(/\s+/g, '_');
        return fileName.includes(normalized);
      });
      return {
        fileName: file.name,
        matchedEmployee: matchedEmployee || null,
        status: matchedEmployee ? 'Matched' : 'Unmatched',
        docType: '',
      };
    });

  const handleFiles = (files) => {
    setIsProcessing(true);
    setTimeout(() => {
      const results = autoMatchFiles(Array.from(files), employees);
      setMatches(results);
      setConfirmed(false);
      setIsProcessing(false);
    }, 100);
  };

  const handleFileUpload = (e) => handleFiles(e.target.files);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);

  const handleDropdownChange = (i, id) => {
    const updated = [...matches];
    const emp = employees.find((e) => e.id === id);
    updated[i].matchedEmployee = emp;
    updated[i].status = 'Manually Assigned';
    setMatches(updated);
  };
  const handleDocTypeChange = (i, type) => {
    const updated = [...matches];
    updated[i].docType = type;
    setMatches(updated);
  };

  const handleConfirmUploads = async () => {
    setConfirmed(true);
    const payload = matches.map((m) => ({
      employeeId: m.matchedEmployee?.id || null,
      employeeName: m.matchedEmployee?.name || null,
      fileName: m.fileName,
      documentType: m.docType,
      status: m.status,
      uploadedAt: new Date().toISOString(),
    }));

    console.log('Ready to send to backend:', payload);

    // Send data to the backend
    const res = await fetch('/api/uploadDocuments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert('Documents successfully uploaded!');
    } else {
      alert('Upload failed!');
    }
  };

  return (
    <div className="upload-container">
      <h2 className="upload-heading">📂 Upload HR Documents</h2>

      <label className="file-button" htmlFor="fileUpload">
        Choose Files
      </label>
      <input
        id="fileUpload"
        type="file"
        multiple
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />

      <div
        className={`drop-zone ${isDragging ? 'dragover' : ''}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        Drag files here or click “Choose Files” above
      </div>

      {isProcessing && (
        <div className="processing-indicator">Processing files… Please wait</div>
      )}

      <table className="upload-table">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Matched Employee</th>
            <th>Document Type</th>
            <th>Status</th>
            <th>Assign</th>
          </tr>
        </thead>
        <tbody>
          {matches.length === 0 ? (
            <tr>
              <td colSpan={5} className="empty-state">
                <h3>No files uploaded yet. Drag files above or click “Choose Files” above.</h3>
              </td>
            </tr>
          ) : (
            matches.map((match, i) => (
              <tr key={i}>
                <td>{match.fileName}</td>
                <td>{match.matchedEmployee?.name || '—'}</td>
                <td>
                  <select
                    value={match.docType}
                    onChange={(e) => handleDocTypeChange(i, e.target.value)}
                  >
                    <option value="">Choose type…</option>
                    <option value="Transcript">Transcript</option>
                    <option value="Degree">Degree</option>
                    <option value="Certification">Certification</option>
                    <option value="ID">ID</option>
                    <option value="Driver's License">Driver's License</option>
                    <option value="CAC">Child Abuse Clearance</option>
                  </select>
                </td>
                <td
                  className={
                    match.status.includes('Matched')
                      ? 'status-matched'
                      : 'status-unmatched'
                  }
                >
                  {match.status}
                </td>
                <td>
                  {!match.matchedEmployee && (
                    <select
                      onChange={(e) => handleDropdownChange(i, e.target.value)}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Assign…
                      </option>
                      {employees.map((emp) => (
                        <option key={emp.id} value={emp.id}>
                          {emp.name}
                        </option>
                      ))}
                    </select>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {matches.length > 0 && (
        <button className="confirm-button" onClick={handleConfirmUploads}>
          Confirm Uploads
        </button>
      )}

      {confirmed && (
        <div className="confirm-message">
          ✅ Uploads confirmed! (Check console for details)
        </div>
      )}
    </div>
  );
}
