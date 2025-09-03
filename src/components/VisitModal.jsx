import React from 'react';


const VisitModal=({ isOpen, visit, start, end, onClose, onCancel, onComplete })=>
    {
        if (!isOpen || !visit) return null;
  const isCancelled = visit.status === 'CANCELLED';
  const isCompleted = visit.status === 'COMPLETED';

return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
      justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: 'white', padding: 20, borderRadius: 5,
        width: 400
      }}>
        <h3>Visit Details</h3>
        <p><strong>ID:</strong> {visit.id}</p>
        <p><strong>Title:</strong> {visit.title}</p>
        <p><strong>Notes:</strong> {visit.notes}</p>
        <p><strong>Doctor:</strong> {visit.doctor.firstName} {visit.doctor.lastName}</p>
        <p><strong>Patient:</strong> {visit.patient.firstName} {visit.patient.lastName}</p>
        <p><strong>Start:</strong>  {start ? start.toString().slice(0, 21) : 'N/A'}</p>
        <p><strong>End:</strong>  {end ? end.toString().slice(0, 21) : 'N/A'}</p>
        <p><strong>Current status:</strong> {visit.status}</p>
        {/* Cancel Button */}
        {!isCancelled && !isCompleted && (
          <button onClick={() => onCancel(visit.id)} style={{ marginRight: 10, backgroundColor: 'orange' }}>⛔Cancel</button>
        )}

        {/* Complete Button */}
        {!isCancelled && !isCompleted && (
          <button onClick={() => onComplete(visit.id)} style={{ marginRight: 10, backgroundColor: 'green', color: 'white' }}>✔️Complete</button>
        )}
        <button onClick={onClose}style={{ marginLeft: 60 }}>✖️Close</button>
      </div>
    </div>
  );

};

export default VisitModal;
