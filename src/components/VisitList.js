import React, {useState, useEffect} from 'react';
import {createVisit, getVisits} from '../api';
import {useDoctors} from '../contexts/DoctorContext';
import { usePatients } from '../contexts/PatientContext';

const VisitList = ()=>{

const [visits,setVisits]=useState([]);
const [newVisit, setNewVisit]=useState({
    date:'',
    notes:''

});
const {doctors}=useDoctors();
const {patients}=usePatients();

const [doctorId, setDoctorId]=useState('');
const [patientId, setPatientId]=useState('');
  
// Fetch visits on component load
  useEffect(() => {
    fetchVisits();
  }, []);


  const fetchVisits= async()=>{
    const data= await getVisits();
    alert(data);
    setVisits(data);

  };
    const handleAddVisit = async (e) => {
    e.preventDefault();
    console.log('Attempting to send create visit request');

    try {
      const visit = {
        date: newVisit.date,
        notes: newVisit.notes,
        // You may need to structure this according to your backend's Visit model
      };
      console.log('Creating visit with:', patientId, doctorId, newVisit);
      await createVisit(patientId, doctorId, visit);
      fetchVisits();
      setNewVisit({ date: '', notes: '' });
      setPatientId('');
      setDoctorId('');
    } catch (error) {
      console.error('Error creating visit:', error);
    }
  };
  

  return (
    <div>
     
      {/* Form to add a new visit */}
        <h3>Add New Visit</h3>
      <form onSubmit={handleAddVisit}>
        <select onChange={(e) => setPatientId(e.target.value)} value={patientId} required>
          <option value="" disabled>Select a Patient</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.firstName} {patient.lastName}
            </option>
          ))}
        </select>

        <select onChange={(e) => setDoctorId(e.target.value)} value={doctorId} required>
          <option value="" disabled>Select a Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.firstName} {doctor.lastName}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          value={newVisit.date}
          onChange={(e) => setNewVisit({ ...newVisit, date: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newVisit.notes}
          onChange={(e) => setNewVisit({ ...newVisit, notes: e.target.value })}
        />
        <button type="submit">Add Visit</button>
      </form>


      {/* List existing visits */}
       <h2>Visits</h2>

      <ul>
        {visits.map((visit) => (
          <li key={visit.id}>
            <strong>number:</strong> 0000{visit.id} |<strong>Date:</strong> {visit.visitDate} | <strong>Description:</strong> {visit.notes}| <strong> Patient Id:</strong> {visit.patient.firstName}
            {/* Add more details if needed */}
          </li>
        ))}
      </ul>

      
    </div>
  );
};

export default VisitList;





