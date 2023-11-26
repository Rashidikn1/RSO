const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

// Connect to MongoDB, Use your own mongo, I removed my password as to not hard code
mongoose.connect('mongodb+srv://rashid:<password>@string', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Define a Mongoose Model for Patients
const PatientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    urgencyLevel: String,
    preferredTime: Date,
    weight: Number,
    treatmentRegion: String,
    // ... other fields ...
});
  
const Patient = mongoose.model('Patient', PatientSchema);

// Initialize Express App
const app = express();
app.use(cors());
app.use(express.json()); // to parse JSON bodies

// Endpoint to add a new patient
app.post('/add-patient', async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).send('Patient added successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Sample endpoint to serve schedule data
app.get('/api/schedules', async (req, res) => {
  try {
    // Sample schedule data. Replace this with your actual database query
    const schedules = [
      { id: 1, patientName: 'John Doe', time: '2023-11-25T10:00:00', treatment: 'Radiation Therapy' },
      // ... more sample data ...
    ];

    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// ... other imports and setup ...

// Sample endpoint to serve machine data
app.get('/api/machines', async (req, res) => {
  try {
    // Sample machine data. Replace this with your actual database query
    const machines = [
      { id: 1, name: 'TrueBeam', status: 'Operational', nextMaintenance: '2023-12-01' },
      { id: 2, name: 'VitalBeam', status: 'Maintenance', nextMaintenance: '2023-12-15' },
      // ... more sample data or fetch from your database ...
    ];

    res.status(200).json(machines);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ... rest of the server setup ...

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
