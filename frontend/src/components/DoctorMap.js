import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const defaultCenter = {
  lat: 12.9716,
  lng: 77.5946
};

const DoctorMap = ({ doctors }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCQdyy32Cja9Q1tHVw74ESA_RdEHTA1Py8" 
  });

  if (!isLoaded) return <p>Loading map...</p>;

  // Center map on the first doctor if available
  const center = doctors.length > 0
    ? {
        lat: doctors[0].location.coordinates[1],
        lng: doctors[0].location.coordinates[0]
      }
    : defaultCenter;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
    >
      {doctors.map((doc) => (
        <Marker
          key={doc._id}
          position={{
            lat: doc.location.coordinates[1],
            lng: doc.location.coordinates[0]
          }}
          onClick={() => setSelectedDoctor(doc)}
          title={doc.name}
        />
      ))}

      {selectedDoctor && (
        <InfoWindow
          position={{
            lat: selectedDoctor.location.coordinates[1],
            lng: selectedDoctor.location.coordinates[0]
          }}
          onCloseClick={() => setSelectedDoctor(null)}
        >
          <div>
            <h4>{selectedDoctor.name}</h4>
            <p>{selectedDoctor.address}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default DoctorMap;
