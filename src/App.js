// src/App.js
import React, { useState } from 'react';

import { DoctorProvider } from './contexts/DoctorContext';
import { PatientProvider } from './contexts/PatientContext';


import Sidebar from './components/Sidebar';
import PatientList from './components/PatientList';
import DoctorList from './components/DoctorList';
import VisitList from './components/VisitList';
import CalendarWithFixedDate from './components/CalendarWithFixedDate';

import Appointments from './components/Appointments';
import AppointmentCalendar from './components/AppointmentCalendar';
import DoctorReportCalendar from './components/DoctorReportCalendar';
import './styles.css';
function App() {
  const [section, setSection] = useState('dashboard');

  const handleMenuSelect = (view) => {
    setSection(view);
  };

  return (
    <DoctorProvider>
      <PatientProvider>
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <Sidebar onSelect={handleMenuSelect} currentSection={section} />

      {/* Main content area */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        {section === 'dashboard' && <h1>Dashboard</h1>}
        {section === 'calendar' && <AppointmentCalendar />}
        {section === 'people' && <CalendarWithFixedDate/>}
        {section === 'sales' && <Appointments />}
        {section === 'reports' && <DoctorReportCalendar />}
        {section === 'practiceManual' && <h1>Practice Manual</h1>}
        {section === 'settings' && <h1>Settings</h1>}
        {section === 'visits' && <VisitList />}
        {section === 'doctors' && < DoctorList />}
        {section === 'patients' && <PatientList />}
      </div>
    </div>
    </PatientProvider>
    </DoctorProvider>
  );
}

export default App;
