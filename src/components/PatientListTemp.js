import React, { useState } from 'react';
import { getPatients, createPatient, searchByFirstName } from '../api'; // your API functions
import { usePatients } from '../contexts/PatientContext'; // your custom hook

const PatientList = () => {
  // Use context to get patients list and updater
  const { patients, setPatients, addPatient } = usePatients();

  // Local state for new patient form
  const [newPatient, setNewPatient] = useState({
    firstName: '',
    lastName: '',
    age: '',
    contactInfo: '',
    allergies: '',
    immunization: '',
    company: ''
  });

  // Search term state
  const [searchTerm, setSearchTerm] = useState('');

  // Search patients
  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        const filteredPatients = await searchByFirstName(searchTerm);
        setPatients(filteredPatients);
      } catch (error) {
        console.error('Error during search:', error);
      }
    } else {
      // Reset list if search is cleared
      try {
        const allPatients = await getPatients();
        setPatients(allPatients);
      } catch (error) {
        console.error('Failed to reload patients:', error);
      }
    }
  };

  // Add new patient handler
  const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
      const createdPatient = await createPatient(newPatient);
      addPatient(createdPatient); // update context list
      setNewPatient({ firstName: '', lastName: '', age: '', contactInfo: '', allergies: '', immunization: '', company: '' });
    } catch (error) {
      console.error('Failed to create patient:', error);
    }
  };

  return (
    <div>
      <h1>Patient List</h1>

      {/* Search Form */}
      <form onChange={(e) => { setSearchTerm(e.target.value); handleSearch(); }}>
        <input
          type="text"
          placeholder="First Name"
          value={searchTerm}
        />
        <button type="button" onClick={handleSearch}>Search</button>
      </form>

      {/* Patients List */}
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>
            {patient.firstName} {patient.lastName}, Age: {patient.age},
            Contact: {patient.contactInfo}
          </li>
        ))}
      </ul>

      {/* Add New Patient */}
      <h2>Add New Patient</h2>
      <form onSubmit={handleAddPatient}>
        {/* First Name */}
        <input
          placeholder="First Name"
          value={newPatient.firstName}
          onChange={(e) => setNewPatient({ ...newPatient, firstName: e.target.value })}
          required
        />
        {/* Last Name */}
        <input
          placeholder="Last Name"
          value={newPatient.lastName}
          onChange={(e) => setNewPatient({ ...newPatient, lastName: e.target.value })}
          required
        />
        {/* Age */}
        <input
          type="number"
          placeholder="Age"
          value={newPatient.age}
          onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
          required
        />
        {/* Contact Info */}
        <input
          placeholder="Contact Info"
          value={newPatient.contactInfo}
          onChange={(e) => setNewPatient({ ...newPatient, contactInfo: e.target.value })}
          required
        />
        {/* Company */}
        <input
          placeholder="Company"
          value={newPatient.company}
          onChange={(e) => setNewPatient({ ...newPatient, company: e.target.value })}
          required
        />
        {/* Allergies */}
        <input
          placeholder="Allergies"
          value={newPatient.allergies}
          onChange={(e) => setNewPatient({ ...newPatient, allergies: e.target.value })}
          required
        />
        {/* Immunization */}
        <input
          placeholder="Immunization"
          value={newPatient.immunization}
          onChange={(e) => setNewPatient({ ...newPatient, immunization: e.target.value })}
          required
        />

        <button type="submit">Add Patient</button>
      </form>
    </div>
  );
};

export default PatientList;
