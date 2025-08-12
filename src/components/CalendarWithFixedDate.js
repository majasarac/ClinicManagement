import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { startOfWeek, format, parse,getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup localizer
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales: { 'en-US': enUS },
});

const CalendarWithFixedDate = () => {
  // Set a fixed date, e.g., a specific Monday
  const fixedDate = new Date('2024-07-01T00:00:00'); // Year-Month-Day
  const startWeek = startOfWeek(fixedDate, { weekStartsOn: 1 });

  const [events, setEvents] = useState([
    // Example event
    {
      start: new Date('2024-07-01T10:00:00'),
      end: new Date('2024-07-01T10:30:00'),
      title: 'Sample Appointment',
    },
  ]);

  const handleSelectSlot = ({ start, end }) => {
    const title = prompt('Enter appointment title');
    if (title) {
      setEvents(prev => [...prev, { start, end, title }]);
    }
  };

  return (
    <div style={{ height: 700, padding: 10 }}>
      <Calendar
        localizer={localizer}
        defaultView="week"
        defaultDate={startWeek}
        views={['week']}
        selectable
        onSelectSlot={handleSelectSlot}
        step={15}
        timeslots={4}
        events={events}
      />
    </div>
  );
};

export default CalendarWithFixedDate;
