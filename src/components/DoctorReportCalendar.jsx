import React, { useState, useEffect } from 'react';
// import necessary hooks, utils, etc.
import VisitModal from './VisitModal';
import { createVisit, getVisits,cancelVisit, completeVisit } from '../api';
import { getVisitsForDoctor } from '../api';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { startOfWeek, format, parse, getDay } from 'date-fns';
import { useDoctors } from '../contexts/DoctorContext';
import { enUS } from 'date-fns/locale';
import '../styles.css';

function DoctorReportCalendar({ currentDoctorId }) {
  
  const [events, setEvents] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const { doctors } = useDoctors(); 


  const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }), // week starts Monday
  getDay: getDay,
  locales: { 'en-US': enUS },
});

  useEffect(() => {
    if (selectedDoctorId) {
      fetchDoctorVisits(selectedDoctorId); // Fetch visits for the specific doctor
      console.log("Fetching visits for doctor:", selectedDoctorId);
    
    }
  }, [selectedDoctorId]);




  const fetchDoctorVisits = async (doctorId) => {
    try {
      const response = await getVisitsForDoctor(doctorId);  // Your API call
      console.log('Fetched visits:', response); // Log for debugging
      setEvents(response.map(v => ({
        id: v.id,
        start: new Date(v.visitDate),
        end: new Date(v.visitDate).setMinutes(new Date(v.visitDate).getMinutes() + 30),  // Example duration
        title: v.notes,
        visitDetails: v,
      })));
    } catch (error) {
      console.error('Error fetching visits for doctor:', error);
    }
  };

  return (
    <div>
      {/* Select doctor */}
      <h3>Select Doctor to show visits</h3>
      <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
        {/* Doctor selector */}

        <div>
          <label>Doctor:</label>
          <select
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
          >
            <option value="">Select a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.firstName} {doctor.lastName}
              </option>
            ))}
          </select>
        </div>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 600 }}
      // other calendar props
    />
    </div>
  </div>
    
  );
}

export default DoctorReportCalendar;
