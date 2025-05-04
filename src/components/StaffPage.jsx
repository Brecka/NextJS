// components/StaffPage.jsx (Frontend Component)
import React, { useState, useEffect } from 'react';

const StaffPage = () => {
  const [file, setFile] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Fetch staff data from the database to display
  useEffect(() => {
    const fetchStaff = async () => {
      const response = await fetch('/api/hr/getStaff');
      const data = await response.json();
      setStaffList(data);
    };
    fetchStaff();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/hr/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert('File uploaded successfully');
        setStaffList(data.staff); // Update the list of staff
      } else {
        alert('Error uploading file: ' + data.error);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Something went wrong!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1>Upload Staff Data</h1>

      <div>
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
        />
        <button onClick={handleUpload} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Staff Data'}
        </button>
      </div>

      <h2>Existing Staff</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Hire Date</th>
            <th>Rehire Date</th>
            <th>Job Title</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff, index) => (
            <tr key={index}>
              <td>{staff.firstName}</td>
              <td>{staff.lastName}</td>
              <td>{staff.hireDate}</td>
              <td>{staff.rehireDate}</td>
              <td>{staff.jobTitle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffPage;
