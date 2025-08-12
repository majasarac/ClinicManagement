import axios from 'axios';
// file to manage all my API requests
const API_URL = 'http://localhost:8080'; // Base URL for my Spring Boot app

// Function to get all patients
export const getPatients = async () => {
    const response = await axios.get(`${API_URL}/patients`);
    return response.data;
};

// Function to create a new patient
export const createPatient = async (patient) => {
    const response = await axios.post(`${API_URL}/patients`, patient);
    return response.data;
};
export const searchByFirstName = async (firstName)=>{
    const response = await axios.get(`${API_URL}/search/first-name/{firstName}`,{ params: { first_name: firstName }});
    return response.data;
};

// Function to get all visits
export const getVisits = async () => {
    const response = await axios.get(`${API_URL}/visits`);//recieves JSON format and automaticaly deserializes it onto JSON
    return response.data; //deserialized object ready to use in react already in JS form of an object
};
//function to get visits on exact date
export const getVisitsByDate= async(date)=>{
    const response = await axios.get(`${API_URL}/visits/by-date`,{params:{date}});
    return response.data;};


//function to get visits for a pepriod
export const getVisitsByPeriod= async(startDate, endDate)=>{

   const response= await axios.get(`${API_URL}/visits/by-period`,{
      params: {
      startDate , // e.g., '2025-07-01'
      endDate // e.g., '2025-07-31'
    }  });
  return response.data;
   };

// Function to create a new visit
export const createVisit = async (patientId, doctorId, visit) => {
  const payload = {
    patientId: patientId,
    doctorId: doctorId,
    visitDate: visit.date,
    notes: visit.notes
  };
  const response = await axios.post('http://localhost:8080/visits', payload);
  return response.data;
};

// Function to get all docotrs
export const getDoctors = async () => {
    const response = await axios.get(`${API_URL}/doctors`);
    return response.data;
};
// Function to create a new doctor
export const createDoctor = async (doctor) => {
    const response = await axios.post(`${API_URL}/doctors`, doctor);
    return response.data;
};
