const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Loads MONGO_URI from .env

// Load models
const Doctor = require('./models/Doctor');
const Booking = require('./models/Booking'); // ✅ NEW Booking model

const app = express();

// Middleware
app.use(cors());
app.use(express.json());



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Home route
app.get('/', (req, res) => {
  res.send('✅ API is working');
});

// ✅ POST /api/doctors - Add new doctor
app.post('/api/doctors', async (req, res) => {
  try {
    const { name, address, lat, lng, specialization } = req.body;

    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);

    if (!name || !address || !specialization || isNaN(parsedLat) || isNaN(parsedLng)) {
      return res.status(400).json({ error: 'Invalid or missing input data' });
    }

    const newDoctor = new Doctor({
      name,
      address,
      specialization,
      location: {
        type: 'Point',
        coordinates: [parsedLng, parsedLat]
      }
    });

    await newDoctor.save();
    console.log('✅ Doctor saved:', newDoctor);
    res.status(201).json({ message: "Doctor saved successfully" });
  } catch (error) {
    console.error("❌ Error saving doctor:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ GET /api/doctors - Get all doctors
app.get('/api/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    console.error("❌ Error fetching doctors:", err.message);
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
});

// ✅ GET /api/doctors/near?lat=..&lng=..&specialization=..
// Returns doctors nearby (within 5km), optionally filtered by specialization
app.get('/api/doctors/near', async (req, res) => {
  try {
    const { lat, lng, specialization } = req.query;
    let query = {};

    if (lat && lng) {
      const parsedLat = parseFloat(lat);
      const parsedLng = parseFloat(lng);

      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parsedLng, parsedLat]
          },
          $maxDistance: 5000 // 5 km
        }
      };
    }

    if (specialization) {
      query.specialization = specialization;
    }

    const doctors = await Doctor.find(query);
    res.json(doctors);
  } catch (error) {
    console.error('❌ Error finding doctors:', error);
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
});

// ✅ POST /api/bookings - Book an appointment
app.post('/api/bookings', async (req, res) => {
  try {
    const { doctorId, patientName, appointmentDate, message } = req.body;

    if (!doctorId || !patientName || !appointmentDate) {
      return res.status(400).json({ error: 'Missing required booking fields' });
    }

    const booking = new Booking({
      doctorId,
      patientName,
      appointmentDate,
      message
    });

    await booking.save();
    console.log('✅ Booking saved:', booking);
    res.status(201).json({ message: 'Booking confirmed', booking });
  } catch (error) {
    console.error('❌ Error saving booking:', error.message);
    res.status(500).json({ error: 'Server error while booking' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
