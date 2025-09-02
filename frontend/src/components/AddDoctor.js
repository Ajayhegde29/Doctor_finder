// // frontend/src/components/AddDoctor.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const AddDoctor = () => {
//   const [form, setForm] = useState({
//     name: '',
//     address: '',
//     lat: '',
//     lng: '',
//   });
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post('http://localhost:5000/api/doctors', {
//         name: form.name,
//         address: form.address,
//         lat: parseFloat(form.lat),
//         lng: parseFloat(form.lng),
//       });

//       setMessage(res.data.message);
//       setForm({ name: '', address: '', lat: '', lng: '' });
//     } catch (error) {
//       setMessage('Error saving doctor.');
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
//       <h3>Add Doctor</h3>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" placeholder="Doctor Name" value={form.name} onChange={handleChange} required /><br /><br />
//         <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} required /><br /><br />
//         <input type="text" name="lat" placeholder="Latitude" value={form.lat} onChange={handleChange} required /><br /><br />
//         <input type="text" name="lng" placeholder="Longitude" value={form.lng} onChange={handleChange} required /><br /><br />
//         <button type="submit">Save Doctor</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default AddDoctor;
import React, { useState } from 'react';
import axios from 'axios';

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    lat: '',
    lng: '',
    specialization: ''
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/doctors', formData);
      setSuccess('✅ Doctor saved successfully!');
      setError('');
      setFormData({
        name: '',
        address: '',
        lat: '',
        lng: '',
        specialization: ''
      });
    } catch (err) {
      console.error(err);
      setError('❌ Error saving doctor.');
      setSuccess('');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">👨‍⚕️ Add New Doctor</h2>

      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form className="mx-auto" style={{ maxWidth: '500px' }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Doctor Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Dr. John Doe"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="JP Nagar, Bengaluru"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Latitude</label>
          <input
            type="text"
            className="form-control"
            name="lat"
            value={formData.lat}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Longitude</label>
          <input
            type="text"
            className="form-control"
            name="lng"
            value={formData.lng}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Specialization</label>
          <select
            className="form-select"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          >
            <option value="">Select specialization</option>
            <option value="Dentist">Dentist</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Physician">Physician</option>
            <option value="Neurologist">Neurologist</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Save Doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
