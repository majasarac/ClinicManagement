import React, { useState, useEffect } from 'react';
import VisitModal from './VisitModal';
import { createVisit, getVisits,cancelVisit, completeVisit } from '../api';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { startOfWeek, format, parse, getDay } from 'date-fns';
import { useDoctors } from '../contexts/DoctorContext';
import { usePatients } from '../contexts/PatientContext';
import DurationModal from './DurationModal';
import { enUS } from 'date-fns/locale';
import '../styles.css';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }), // week starts Monday
  getDay: getDay,
  locales: { 'en-US': enUS },
});


const AppointmentCalendar = () => {
  const today = new Date();

  // Sample events
  const [events, setEvents] = useState([]); // Events array for calendar
  const [loading, setLoading] = useState(true);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { doctors } = useDoctors();   // fetch doctors list from context
  const { patients } = usePatients(); // fetch patients list from contex 

  // Define your predefined duration of a visit (e.g., 30 minutes)
  const predefinedDurationMinutes = 30;

 

  // Fetch existing visits on component mount
  useEffect(() => {
    fetchVisits(selectedDoctorId, selectedPatientId);
  }, [selectedDoctorId, selectedPatientId]);

  const fetchVisits = async (doctorId, patientId) => {
    try {
      const data = await getVisits(); // API fetch
      // Data assumed to have { id, visitDate, notes } etc.
      //if selected doctor or patient then filter visits, otherwise show all
        const filtered = data.filter(v =>
        (!doctorId || v.doctor.id === parseInt(doctorId)) &&
        (!patientId || v.patient.id === parseInt(patientId))
      );
      const transformed = filtered.map(v => {
        const start = new Date(v.visitDate);
        const end = new Date(start);
        
        // Increment the end time by 30 minutes
        end.setMinutes(end.getMinutes() + predefinedDurationMinutes);

        return {

          id: v.id,
          title: v.notes || 'Visit',
          start,
          end,
          // embed full visit details:
          visitDetails: v,
        };
      });
      setEvents(transformed);
    } catch (error) {
      console.error('Error fetching visits:', error);
    } finally {
      setLoading(false);
    }
  };

  const [view, setView] = useState('week'); // initial view
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSelectSlot = async ({ start, end }) => {
    setSelectedDate(start);
    const hour = new Date(start).getHours();
  const minutes = new Date(start).getMinutes();

  // Check lunch break 10:00 - 10:30 and do not allow booking
  if (hour === 10 && minutes < 30) {
    alert('Slot is during lunch break (10:00 - 10:30). Please choose another time.');
    return;}

   // Check lunch break 16:00 - 16:30 and do not allow booking
  if (hour === 16 && minutes < 30) {
    alert('Slot is during lunch break (16:00 - 16:30). Please choose another time.');
    return;
  }
  
    const title = prompt(`Enter appointment title for ${format(start, 'PPpp')}`);
    if (!title)
      return;

    //making sure doctor and patient are selected when new visit is to be created

    if (!selectedDoctorId || !selectedPatientId || !selectedDate) {
      alert('Please select doctor, patient, and a date');
      return;
    }

    // Calculate the end time based on the predefined duration

    const newEventEnd = new Date(start.getTime() + predefinedDurationMinutes * 60 * 1000); // Add minutes to start tim

    //prepare event
    const newEvent = {
      id: Date.now(), // simple id, just temporary to be replaced after backend response
      title,
      start,
      end: newEventEnd || end,
    };



    //add local event immediately
    setEvents(prev => [...prev, newEvent]);
    console.log('Add event localy: ', newEvent);
    console.log(events);


    console.log('Creating visit with', {
      patientId: selectedPatientId,
      doctorId: selectedDoctorId,
      date: selectedDate,
      notes: title
    });
    const visitDateStr = new Date(selectedDate).toISOString().slice(0, 19); // gets 'YYYY-MM-DDTHH:MM:SS' getting rid of Z caracter at the end og a date string
    console.log('Sending createVisit request', { selectedPatientId, selectedDoctorId });

    console.log('About to call createVisit...');



    // Call your API with the IDs
    try {
      const response = await createVisit(selectedPatientId, selectedDoctorId, {
        date: visitDateStr,
        notes: title,
      });
      console.log('visit created on backend and stored to db', response);

      // Save to backend

      //now localy lets change temporary id of an event generated by server
      setEvents(prev => prev.map(event =>
        event.id === newEvent.id ? { ...event, id: response.id, visitDetails: response } : event
      ));


    } catch (error) {
      console.log('Failed to create visit', error);
      //rollback local adition of an appointment -visit
      setEvents(prev => prev.filter(event => event.id !== newEvent.id));

    }
    // saveVisit({ start, end, notes: title }); needs more thing to create visit, like doctor and patien object

  };

  const handleSelectChange = (viewOption) => {
    setView(viewOption);
  };

  const handleSelectEvent = (event) => {
    if (!event.visitDetails) {
      alert('Visit details are missing for this event');
      return;
    }
    setSelectedEvent(event);
    setModalOpen(true);
  };
  const handleCancel = async (visitId) => {
    await cancelVisit(visitId);
    // Update local state: set status to CANCELLED
    setEvents(prev => prev.map(ev => {
      if (ev.visitDetails.id === visitId) {
        return { ...ev, visitDetails: { ...ev.visitDetails, status: 'CANCELLED' } };
      }
      
      return ev;
    }));
    alert("Visit is cancelled!");
    setModalOpen(false)
  };

  const handleComplete = async (visitId) => {
    await completeVisit(visitId);
    // Update local state: set status to COMPLETED
    setEvents(prev => prev.map(ev => {
      if (ev.visitDetails.id === visitId) {
        return { ...ev, visitDetails: { ...ev.visitDetails, status: 'completed' } };
      }
      
      return ev;
    }));
     alert("Visit is completed!");
     setModalOpen(false);
  };



  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {/* Select doctor and patient */}
      <h3>Select Doctor & Patient</h3>
      <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
        {/* Doctor selector */}

        <div>
          <label>Doctor:</label>
          <select
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
          >
            <option value="">Select a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.firstName} {doctor.lastName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Patient:</label>
          <select
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
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


      <h2>Appointments Calendar</h2>
      
      {/* Calendar */}
      <Calendar
        localizer={localizer}
        defaultView={view}
        date={currentDate}
        onNavigate={setCurrentDate}
        toolbar={true}
        view={view}
        views={['day', 'week', 'month', 'agenda']}
        onView={setView}
        defaultDate={new Date()}
        scrollToTime={new Date().setHours(8, 0)}
        min={new Date(new Date().setHours(8, 0, 0, 0))} // 8:00 AM
        max={new Date(new Date().setHours(20, 0, 0, 0))} // 8:00 PM
        step={15}        // duration of the slot       
        timeslots={2}    // number of slots within an hour
        events={events}
        dayLayoutAlgorithm={"no-overlap"}
        selectable
         // your existing props
  slotPropGetter={(date) => {
    const hour = date.getHours();
    const day = date.getDay();

    if (day === 0 || day === 6) {
      // Weekend
      return { style: { backgroundColor: '#D3D3D3' } };
    }
    if (hour >= 22 || hour < 6) {
      // Night
      return { style: { backgroundColor: '#233462' } };
    }
    if (hour === 10 || hour === 16) {
      // Lunch time
      return { style: { backgroundColor: '#FFCC66' } };
    }
    // default
    return {};
  }}


             components={{
  timeSlotWrapper: ({ value, children }) => {
    const date = new Date(value);
    const hour = date.getHours();
    const day = date.getDay(); // Sunday=0, Saturday=6

    let className = '';

    // Weekend
    if (day === 0 || day === 6) {
      className = 'slot-weekend';
    }
    // Night hours 22:00-06:00
    if (hour >= 22 || hour < 6) {
      className = 'slot-night';
    }
    // Lunch break 10:00-10:30 and 16:00-16:30
    if (
      (hour === 10 && date.getMinutes() < 30) || 
      (hour === 16 && date.getMinutes() < 30)
    ) {
      className = 'slot-lunch';
    }

    // Default style
    const style = {
      backgroundColor: className ? undefined : 'transparent',
    };

    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  },
}}

        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        style={{ height: 600 }}
      />
      <VisitModal
        isOpen={isModalOpen}
        visit={selectedEvent?.visitDetails}
        start={selectedEvent?.start}
        end={selectedEvent?.end}
        onClose={() => setModalOpen(false)}
        onCancel={handleCancel}
        onComplete={handleComplete}
      />
    </div>
  );
};

export default AppointmentCalendar;
