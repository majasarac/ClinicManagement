import React from 'react';

function DurationModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = React.useState('');
  const [duration, setDuration] = React.useState(30); // default 30 mins

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: 'white', padding: 20, borderRadius: 5,
        width: 300
      }}>
        <h3>Create Visit</h3>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ width: '100%', marginBottom: 10 }}
          />
        </div>
        <div>
          <label>Duration (minutes):</label>
          <input
            type="number"
            value={duration}
            onChange={e => setDuration(Math.max(1, parseInt(e.target.value, 10)))}
            style={{ width: '100%', marginBottom: 10 }}
          />
        </div>
        <button onClick={() => onSave(title, duration)} style={{ marginRight: 10 }}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default DurationModal;
