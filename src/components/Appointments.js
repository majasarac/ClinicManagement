import React, { useState, useEffect } from 'react';
import { createVisit,getVisits } from '../api'; // your API call to fetch visits
import { useDoctors } from '../contexts/DoctorContext';
import { usePatients } from '../contexts/PatientContext';


const Appointments = () => {
  const { doctors } = useDoctors();
  const { patients } = usePatients();

  const [visits, setVisits] = useState([]);
  const [events, setEvents] = useState([]);

  // Selected doctor/patient for scheduling
  const [doctorId, setDoctorId] = useState('');
  const [patientId, setPatientId] = useState('');

  // State for new visit form
  const [newVisit, setNewVisit] = useState({ notes: '' });

  // Selected date from calendar
  const [selectedDate, setSelectedDate] = useState(null);

  // Load visits when component mounts
  useEffect(() => {
    fetchVisits();
  }, []);

 

  // Fetch visits from backend
  const fetchVisits = async () => {
    const data = await getVisits();
    alert(data);
    setVisits(data);
    
  };
   // Transform visits to calendar events whenever visits change
  useEffect(() => {
    console.log('Visits before transform:', visits);
    visits.forEach(v => {
  console.log('Visit visitDate:', v.visitDate);
});
    const transformedEvents = visits.map(visit => ({
      id: visit.id,
      title: visit.notes || 'Visit',
      start: new Date(visit.visitDate),
      end: new Date(visit.visitDate),
    }));
    console.log('Transformed events:', transformedEvents);
    setEvents(transformedEvents);
  }, [visits]);

  // Handle date click in calendar
  const handleDateSelect = (slotInfo) => {
    setSelectedDate(slotInfo.start);
  };
     const handleAddEvent = ({ start, end, title }) => {
  setEvents(prev => [...prev, { start, end, title }]);
  // optional: save to backend here
  };


  // Handle form submission to create new visit
  const handleAddVisit = async (e) => {
    e.preventDefault();
    if (!doctorId || !patientId || !selectedDate) {
      alert('Please select doctor, patient, and date');
      return;
    }

    // Your API call to create visit
    await createVisit(doctorId, patientId, {
      date: selectedDate,
      notes: newVisit.notes,
    });
 
    // Refresh list
    fetchVisits();
    // Reset form
    setNewVisit({ notes: '' });
    setDoctorId('');
    setPatientId('');
    setSelectedDate(null);
  };

  return (
    <div>
      {/* Select doctor and patient */}
      <h3>Select Doctor & Patient</h3>
      <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
        {/* Doctor selector */}
        <div>
          <label>Doctor:</label>
          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          >
            <option value="">Select a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.firstName} {doctor.lastName}
              </option>
            ))}
          </select>
        </div>
        {/* Patient selector */}
        <div>
          <label>Patient:</label>
          <select
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
          >
            <option value="">Select a patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.firstName} {patient.lastName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Calendar display */}
    

      {/* Show form when a date is selected in calendar */}
      {selectedDate && (
        <div style={{ marginTop: 20, padding: 10, border: '1px solid #aaa' }}>
          <h3>Add New Visit on {new Date(selectedDate).toLocaleString()}</h3>
          <form onSubmit={handleAddVisit}>
            {/* Optional field: notes */}
            <div>
              <label>Notes:</label>
              <input
                type="text"
                value={newVisit.notes}
                onChange={(e) => setNewVisit({ ...newVisit, notes: e.target.value })}
                placeholder="Visit notes"
              />
            </div>
            {/* Confirm button */}
            <button type="submit">Add Visit</button>
            {/* Cancel button to reset */}
            <button
      type="button"
      style={{ marginLeft: 10 }}
      onClick={() => {
        setNewVisit({ notes: '' });
        setDoctorId('');
        setPatientId('');
        setSelectedDate(null);
      }}
    >Cancel
    </button>     
    </form>
    </div>)
};
</div>);
}
export default Appointments;

