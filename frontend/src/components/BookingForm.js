import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ doctor, onClose }) => {
  const [patientName, setPatientName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/bookings', {
        doctorId: doctor._id,
        patientName,
        appointmentDate,
        message
      });

      setSuccess('✅ Booking confirmed!');
      setTimeout(() => {
        setSuccess('');
        onClose(); 
      }, 1500);
    } catch (err) {
      console.error('❌ Booking error:', err.message);
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', marginTop: '10px', background: '#f9f9f9' }}>
      <h3>Book Appointment with {doctor.name}</h3>

      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <input
          type="date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <textarea
          placeholder="Message (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          style={{ display: 'block', marginBottom: '10px', width: '100%' }}
        />
        <button type="submit">Confirm Booking</button>
        <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>Cancel</button>
      </form>
    </div>
  );
};

export default BookingForm;
