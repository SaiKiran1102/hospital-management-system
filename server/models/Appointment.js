const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true },
  reason: { type: String },
  status: { 
    type: String, 
    enum: ['Active', 'Cancelled by You', 'Cancelled by Doctor', 'Cancelled by Patient'], 
    default: 'Active' 
  },
  cancelledBy: { type: String, enum: ['patient', 'doctor', 'admin'] },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
