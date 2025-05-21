'use client';
import { useState } from 'react';
import DocumentUploadTable from '@/components/DocumentUploadTable';
import DashboardLayout from '@/components/DashboardLayout';
import './page.css';

const employees = [
  { id: '1', name: 'Aisha Carter' },
  { id: '2', name: 'David Stone' },
  { id: '3', name: 'Mariah Diaz' },
];

export default function HRUploadPage() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const autoMatchFiles = (files) =>
    files.map((file) => {
      const fileName = file.name.toLowerCase().replace(/\.[^/.]+$/, '');
      const matchedEmployee = employees.find((emp) => {
        const normalized = emp.name.toLowerCase().replace(/\s+/g, '_');
        return fileName.includes(normalized);
      });
      return {
        file,
        fileName: file.name,
        matchedEmployee: matchedEmployee || null,
        docType: '',
        status: matchedEmployee ? 'Matched' : 'Unmatched',
      };
    });

  const handleFiles = (fileList) => {
    setIsProcessing(true);
    const newFiles = autoMatchFiles(Array.from(fileList));
    setFiles((prev) => [...prev, ...newFiles]);
    setIsProcessing(false);
    setConfirmed(false);
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

  const handleDelete = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  const handleDocTypeChange = (index, value) => {
    setFiles((prev) => {
      const updated = [...prev];
      updated[index].docType = value;
      return updated;
    });
  };

  const handleEmployeeAssign = (index, employeeId) => {
    const employee = employees.find((e) => e.id === employeeId);
    setFiles((prev) => {
      const updated = [...prev];
      updated[index].matchedEmployee = employee;
      updated[index].status = 'Manually Assigned';
      return updated;
    });
  };

  const handleConfirmUploads = async () => {
    setConfirmed(true);
    for (const fileEntry of files) {
      if (!fileEntry.file) continue;

      const formData = new FormData();
      formData.append('file', fileEntry.file);
      formData.append(
        'metadata',
        JSON.stringify({
          employeeId: fileEntry.matchedEmployee?.id || null,
          employeeName: fileEntry.matchedEmployee?.name || null,
          fileName: fileEntry.fileName,
          documentType: fileEntry.docType,
          status: fileEntry.status,
          uploadedAt: new Date().toISOString(),
        })
      );

      const res = await fetch('/api/hr/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      console.log(`✅ Uploaded ${fileEntry.fileName}:`, result.message);
    }
  };

  return (
    <DashboardLayout>
    <div className="upload-container">
      <h1 className="text-2xl font-bold mb-4">📁 HR Document Upload</h1>

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
        Drag documents here or click “Choose Files”
      </div>

      {isProcessing && (
        <div className="processing-indicator">Processing files…</div>
      )}

      <DocumentUploadTable
        files={files}
        onDelete={handleDelete}
        onDocTypeChange={handleDocTypeChange}
        onEmployeeAssign={handleEmployeeAssign}
        employees={employees}
      />

      {files.length > 0 && (
        <button className="confirm-button mt-4" onClick={handleConfirmUploads}>
          Confirm Uploads
        </button>
      )}

      {confirmed && (
        <div className="confirm-message mt-2">
          ✅ Uploads confirmed! (Check console for backend log)
        </div>
      )}
    </div>
  </DashboardLayout>
  );
}
