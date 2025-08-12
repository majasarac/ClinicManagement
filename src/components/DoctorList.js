import React, { useEffect, useState } from 'react';
import { createDoctor } from '../api'; // Make sure these functions are defined in your api.js
import {useDoctors} from '../contexts/DoctorContext';
const DoctorList = () => {
    
   
   const { doctors, addDoctor } = useDoctors();
   const [newDoctor, setNewDoctor] = useState({
        firstName: '',
        lastName: '',
        specialty: '',
        contactInfo: ''
    });
  
  


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const createdDoctor = await createDoctor(newDoctor);
            addDoctor(createdDoctor);
            setNewDoctor({ firstName: '', lastName: '', specialty: '', contactInfo: '' });
        } catch (error) {
            console.error('Error creating doctor:', error);
        }
    };

    return (
        <div>
            <h1>Doctor List</h1>
            <ul>
                {doctors.map((doctor) => (
                    <li key={doctor.id}>
                        {doctor.firstName} {doctor.lastName} - {doctor.specialty}
                    </li>
                ))}
            </ul>

            <h2>Add New Doctor</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={newDoctor.firstName}
                    onChange={(e) => setNewDoctor({ ...newDoctor, firstName: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={newDoctor.lastName}
                    onChange={(e) => setNewDoctor({ ...newDoctor, lastName: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Specialty"
                    value={newDoctor.specialty}
                    onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Contact Info"
                    value={newDoctor.contactInfo}
                    onChange={(e) => setNewDoctor({ ...newDoctor, contactInfo: e.target.value })}
                    required
                />
                <button type="submit">Add Doctor</button>
            </form>
        </div>
    );
};
export default DoctorList; 