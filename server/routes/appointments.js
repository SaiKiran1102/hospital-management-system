const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patient', 'firstName lastName email phone gender')
      .populate('doctor', 'name consultationFee specialization')
      .sort({ appointmentDate: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get appointments by patient
router.get('/patient/:patientId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.params.patientId })
      .populate('doctor', 'name consultationFee specialization')
      .sort({ appointmentDate: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get appointments by doctor
router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.params.doctorId })
      .populate('patient', 'firstName lastName email phone gender')
      .sort({ appointmentDate: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search appointments by contact
router.get('/search/:contact', async (req, res) => {
  try {
    const patients = await require('../models/Patient').find({ phone: new RegExp(req.params.contact) });
    const patientIds = patients.map(p => p._id);
    const appointments = await Appointment.find({ patient: { $in: patientIds } })
      .populate('patient')
      .populate('doctor');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create appointment
router.post('/', async (req, res) => {
  const appointment = new Appointment(req.body);
  try {
    const newAppointment = await appointment.save();
    const populated = await Appointment.findById(newAppointment._id)
      .populate('patient')
      .populate('doctor');
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cancel appointment
router.patch('/:id/cancel', async (req, res) => {
  try {
    const { cancelledBy } = req.body;
    let status = 'Cancelled by You';
    if (cancelledBy === 'doctor') status = 'Cancelled by Doctor';
    if (cancelledBy === 'patient') status = 'Cancelled by Patient';
    
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id, 
      { status, cancelledBy },
      { new: true }
    ).populate('patient').populate('doctor');
    
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete appointment
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
