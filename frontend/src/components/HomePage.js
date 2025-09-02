import React from 'react';
import '../styles.css';
const HomePage = () => {
  return (
    <div className="homepage-fullscreen">
      <div className="homepage-box text-center">
        <h2 className="display-5 fw-bold text-primary mb-3">
          Welcome to Doctor Finder App
        </h2>
        <p className="lead text-muted mb-4">
          Find the right doctor near you with ease. Browse nearby clinics,
          check specializations, and book appointments in seconds.
        </p>
        <a href="/book" className="btn btn-primary btn-lg">
          Book a Doctor
        </a>
      </div>
    </div>
  );
};

export default HomePage
