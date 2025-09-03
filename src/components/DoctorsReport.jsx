import React, { useState } from 'react';

const DoctorReport = ({ visitId, onReportSubmit }) => {
  const [reportText, setReportText] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [events, setEvents] = useState([]); 

  const handleReportChange = (e) => setReportText(e.target.value);

  // Handles file selection for attachments
  const handleFileChange = (e) => setAttachments([...e.target.files]);

  const handleSubmit = () => {
    const reportData = {
      visitId,
      reportText,
      attachments, // Typically you would handle uploading these and just send references
    };
    onReportSubmit(reportData); // Assuming you have a function to process this
    setReportText('');
    setAttachments([]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Write a Report for Visit {visitId}</h3>
      <textarea
        placeholder="Enter report details..."
        value={reportText}
        onChange={handleReportChange}
        style={{ width: '100%', height: 100 }}
      />
      <br />
      <input type="file" multiple onChange={handleFileChange} />
      <br />
      <button onClick={handleSubmit}>Submit Report</button>
    </div>
  );
};

export default DoctorReport;
