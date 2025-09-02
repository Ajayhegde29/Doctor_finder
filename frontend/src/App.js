import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import AddDoctor from './components/AddDoctor';
import NearbyDoctors from './components/NearbyDoctor';
import DoctorLogin from './components/DoctorLogin';
import AllDoctorMap from './components/AllDoctorMap';
import HomePage from './components/HomePage'; 

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h2 style={{ textAlign: 'center' }}>Doctor Finder App</h2>

      
        <nav style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Link to="/" style={{ margin: '0 10px' }}>🏠 Home</Link>
          <Link to="/add-doctor" style={{ margin: '0 10px' }}>➕ Add Doctor</Link>
          <Link to="/book" style={{ margin: '0 10px' }}>📋 Book Doctor</Link>
          <Link to="/map" style={{ margin: '0 10px' }}>🗺️ View Map</Link>
        </nav>

    
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/doctor-login" element={<DoctorLogin />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/book" element={<NearbyDoctors />} />
          <Route path="/map" element={<AllDoctorMap />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
