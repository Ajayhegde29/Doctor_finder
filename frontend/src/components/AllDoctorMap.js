import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const defaultCenter = {
  lat: 12.9716,
  lng: 77.5946,
};

const AllDoctorMap = () => {
  const [doctors, setDoctors] = useState([]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCQdyy32Cja9Q1tHVw74ESA_RdEHTA1Py8' 
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/doctors')
      .then(res => setDoctors(res.data))
      .catch(err => console.error('Error loading doctors:', err));
  }, []);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">🗺️ All Doctors Map</h3>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={12}
      >
        {doctors.map((doc) => (
          <Marker
            key={doc._id}
            position={{
              lat: doc.location.coordinates[1],
              lng: doc.location.coordinates[0]
            }}
            title={`${doc.name} — ${doc.specialization}`}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default AllDoctorMap;
