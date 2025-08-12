import React, { useState } from 'react';
import { createPatient, searchByFirstName , getPatients} from '../api'; // api.js file has these functions defined
import { usePatients} from '../contexts/PatientContext';
import {Link} from 'react-router-dom';


const PatientList = () => {
   // Using context to get patients list and updater
    const { patients, setPatients,addPatient } = usePatients(); 
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
    const [searchTerm, setSearchTerm]= useState('');
     
    

    // Handle the form submission for creating a new patient
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const createdPatient = await createPatient(newPatient); // Call the API to create a new patient
            addPatient(createdPatient); // Update the context patient list
            setNewPatient({ firstName: '', lastName: '', age: '', contactInfo: '', allergies: '',
                immunization: '', company: ''}); // Reset the form fields
        } catch (error) {
            console.error("Failed to create patient:", error);
        }
    };
  // Search patients
   const handleSearch = async () => {
  if (searchTerm.trim()) {
    try {
      const filteredPatients = await searchByFirstName(searchTerm);
      setPatients(filteredPatients);
    } catch (error) {
      console.error("Error during search:", error);
    }
  } else {
    // If search term is empty, reload full list
    try {
      const allPatients = await getPatients();
      setPatients(allPatients);
    } catch (error) {
      console.error("Failed to reload patients:", error);
    }
  }
};
            

    return (
        <div>
            <h1>Patient List</h1>  
            <form onSubmit={handleSearch}>  
                 
                   <input
                    type="text"
                    placeholder="First Name"
                    value={searchTerm}
                     onChange={(e) => {
                     setSearchTerm(e.target.value);
    // Removed calling handleSearch() here for better control
  }}
/>
<button type="button" onClick={handleSearch}>Search</button>
  
            </form>
           
            <ul>
                {patients.map((patient) => (
                    <li key={patient.id}>
                        {patient.firstName} {patient.lastName}, Age: {patient.age}, Contact: {patient.contactInfo}, {patient.immunization}, {patient.allergies}, {patient.company}
                    </li>
                ))}
            </ul>

            <h2>Add New Patient</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={newPatient.firstName}
                    onChange={(e) => setNewPatient({ ...newPatient, firstName: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={newPatient.lastName}
                    onChange={(e) => setNewPatient({ ...newPatient, lastName: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Contact Info"
                    value={newPatient.contactInfo}
                    onChange={(e) => setNewPatient({ ...newPatient, contactInfo: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Company"
                    value={newPatient.company}
                    onChange={(e) => setNewPatient({ ...newPatient, company: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Allergies "
                    value={newPatient.allergies}
                    onChange={(e) => setNewPatient({ ...newPatient, allergies: e.target.value })}
                    required
                />
                <input
                    type="text"
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