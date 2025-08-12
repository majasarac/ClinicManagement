// src/contexts/DoctorContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getDoctors, createDoctor} from '../api';

const DoctorContext = createContext();

export const useDoctors = () => useContext(DoctorContext);

export const DoctorProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const data = await getDoctors();
      setDoctors(data);
    };
    fetchDoctors();
  }, []);

   const addDoctor = async (doctorData) => {
    const newDoctor = await createDoctor(doctorData);
    setDoctors(prev => [...prev, newDoctor]);
  };


  return (
    <DoctorContext.Provider value={{ doctors, addDoctor }}>
      {children}
    </DoctorContext.Provider>
  );
};
