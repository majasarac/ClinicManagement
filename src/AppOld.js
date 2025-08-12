import './App.css';
import React, {useState, useEffect} from 'react';
import { getDoctors, createDoctor } from './api'; // Make sure these functions are defined in your api.js

import { DoctorProvider } from './contexts/DoctorContext';
import { PatientProvider } from './contexts/PatientContext';

import PatientList from './components/PatientList';
import DoctorList from './components/DoctorList';
import VisitList from './components/VisitList';


function App() {
  const [section, setSection] = useState('patientList');

  return (
    <DoctorProvider>
      <PatientProvider>
    <div>
      <h1>Clinic Management</h1>
      <nav>
        <button onClick={() => setSection('patientList')}>Patients</button>
        <button onClick={() => setSection('doctorList')}>Doctors</button>
        <button onClick={() => setSection('visitList')}>Visits</button>
      </nav>

      {section === 'patientList' && <PatientList/>}
      {section === 'doctorList' && <DoctorList />}
      {section === 'visitList' && <VisitList />}
    </div>
    </PatientProvider>
    </DoctorProvider>
  );
}


export default App;
