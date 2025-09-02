import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorMap from './DoctorMap';

function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2);
}

const NearbyDoctors = () => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    try {
      const url = new URL('http://localhost:5000/api/doctors/near');

      if (lat && lng) {
        url.searchParams.append('lat', lat);
        url.searchParams.append('lng', lng);
      }

      if (specialization) {
        url.searchParams.append('specialization', specialization);
      }

      const response = await axios.get(url.toString());
      setDoctors(response.data);
      setError('');
    } catch (err) {
      console.error('❌ Error:', err.message);
      setError('Failed to fetch doctors');
      setDoctors([]);
    }
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLat = pos.coords.latitude.toFixed(6);
          const userLng = pos.coords.longitude.toFixed(6);
          setLat(userLat);
          setLng(userLng);
          handleSearch();
        },
        () => {
          setError('Location access denied.');
        }
      );
    } else {
      setError('Geolocation not supported.');
    }
  };

  const handleBookDoctor = async (doctorId, doctorName) => {
    try {
      // You can replace this with your actual POST call to book
      // await axios.post('http://localhost:5000/api/bookings', { doctorId });

      setSuccessMessage(`✅ Successfully booked ${doctorName}`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setError('❌ Booking failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🧭 Search Nearby Doctors</h2>

      <div className="row g-2 align-items-center mb-4">
        <div className="col-md-3">
          <input
            type="text"
            placeholder="Enter Latitude"
            className="form-control"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            placeholder="Enter Longitude"
            className="form-control"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          >
            <option value="">All Specializations</option>
            <option value="Dentist">Dentist</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Physician">Physician</option>
            <option value="Neurologist">Neurologist</option>
          </select>
        </div>
        <div className="col-md-3 d-flex gap-2">
          <button className="btn btn-primary w-50" onClick={handleSearch}>
            🔍 Search
          </button>
          <button className="btn btn-outline-secondary w-50" onClick={handleUseMyLocation}>
            📍 Use My Location
          </button>
        </div>
      </div>

      {error && <p className="text-danger">{error}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}

      <h4 className="mb-3">Results:</h4>
      <div className="row">
        {doctors.length === 0 ? (
          <p className="text-muted">No doctors found.</p>
        ) : (
          doctors.map((doc) => {
            let distance = lat && lng
              ? getDistanceFromLatLon(
                  parseFloat(lat),
                  parseFloat(lng),
                  doc.location.coordinates[1],
                  doc.location.coordinates[0]
                )
              : null;

            return (
              <div className="col-md-6 mb-4" key={doc._id}>
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title text-primary">{doc.name}</h5>
                      <p className="card-text mb-1"><strong>📍 Address:</strong> {doc.address}</p>
                      <p className="card-text mb-1"><strong>🩺 Specialization:</strong> {doc.specialization}</p>
                      {distance && (
                        <p className="card-text"><strong>📏 Distance:</strong> {distance} km</p>
                      )}
                    </div>
                    <button
                      className="btn btn-success mt-3"
                      onClick={() => handleBookDoctor(doc._id, doc.name)}
                    >
                      📅 Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <h4 className="mt-5 mb-3">🗺️ Map View</h4>
      <DoctorMap doctors={doctors} />
    </div>
  );
};

export default NearbyDoctors;
