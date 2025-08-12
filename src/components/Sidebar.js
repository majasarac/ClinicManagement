// src/components/Sidebar.js
import React from 'react';

const Sidebar = ({ onSelect, currentSection }) => {
  const items = [
    { id: 'dashboard', label: '📟 Dashboard' },
    { id: 'calendar', label: '📅 Calendar' },
    { id: 'people', label: '👥 People' },
    { id: 'sales', label: '💱 Sales' },
    { id: 'reports', label: '📈 Reports' },     
    { id: 'visits', label: '📋 Visits' },
    { id: 'doctors', label: '👨🏼‍⚕️👩🏼‍⚕️ Doctors' },
    { id: 'patients', label: '👨🏼‍👩🏼‍👧🏼 Patients' },
    { id: 'practiceManual', label: '📚 Practice Manual' }, 
    { id: 'settings', label: '⚙️ Settings' },
      
  ];

  return (
    <div style={{
      width: '220px',
      background: '#f0f0f0',
      height: '100vh',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      {items.map(item => (
        <button
          key={item.id}
          style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: currentSection === item.id ? '#007bff' : '#ccc',
            color: currentSection === item.id ? '#fff' : '#000',
            cursor: 'pointer',
            fontSize: '16px'
          }}
          onClick={() => onSelect(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
