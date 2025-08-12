import React, { useState } from 'react';
import { getVisitsByDate } from '../api'; // Where to endpoint of backend path is  api.js

const VisitSearchComponent = () => {
  const [date, setDate] = useState('');
  const [visits, setVisits] = useState([]);

  const handleSearch = async () => {
    if (!date) {
      alert("Please select a date");
      return;
    }

    try {
      const data = await getVisitsByDate(date);
      setVisits(data);
    } catch (error) {
      console.error("Error fetching visits:", error);
    }
  };

  return (
    <div>
      <h2>Search Visits</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {visits.map((visit) => (
          <li key={visit.id}>
            <strong>Date:</strong> {visit.visitDate} | <strong>Notes:</strong> {visit.notes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VisitSearchComponent;



