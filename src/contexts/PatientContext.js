// src/contexts/PatientContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getPatients, createPatient } from '../api';

const PatientContext = createContext();

export const usePatients = () => useContext(PatientContext);

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const data = await getPatients();
      setPatients(data);
    };
    fetchPatients();
  }, []);
    const addPatient = async (patientData) => {
    try {
      const newPatient = await createPatient(patientData);
      setPatients(prev => [...prev, newPatient]);
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };


  return (
    <PatientContext.Provider value={{ patients, addPatient }}>
      {children}
    </PatientContext.Provider>
  );
};