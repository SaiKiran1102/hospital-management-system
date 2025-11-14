const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Admin = require('../models/Admin');

// Register Patient
router.post('/register/patient', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    const token = jwt.sign({ id: patient._id, role: 'patient' }, process.env.JWT_SECRET);
    res.status(201).json({ token, user: patient, role: 'patient' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Register Doctor
router.post('/register/doctor', async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    const token = jwt.sign({ id: doctor._id, role: 'doctor' }, process.env.JWT_SECRET);
    res.status(201).json({ token, user: doctor, role: 'doctor' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login Patient
router.post('/login/patient', async (req, res) => {
  try {
    const patient = await Patient.findOne({ email: req.body.email });
    if (!patient || !(await patient.comparePassword(req.body.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: patient._id, role: 'patient' }, process.env.JWT_SECRET);
    res.json({ token, user: patient, role: 'patient' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login Doctor
router.post('/login/doctor', async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ name: req.body.name });
    if (!doctor || !(await doctor.comparePassword(req.body.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: doctor._id, role: 'doctor' }, process.env.JWT_SECRET);
    res.json({ token, user: doctor, role: 'doctor' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login Admin
router.post('/login/admin', async (req, res) => {
  try {
    const admin = await Admin.findOne({ username: req.body.username });
    if (!admin || !(await admin.comparePassword(req.body.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET);
    res.json({ token, user: admin, role: 'admin' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
