import React, { useState, useEffect } from 'react';
import { getAppointments, createAppointment, deleteAppointment, getPatients, getDoctors } from '../services/api';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patient: '', doctor: '', appointmentDate: '', appointmentTime: '', reason: '', status: 'Scheduled'
  });

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await getAppointments();
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await getPatients();
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await getDoctors();
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAppointment(formData);
      setShowForm(false);
      setFormData({ patient: '', doctor: '', appointmentDate: '', appointmentTime: '', reason: '', status: 'Scheduled' });
      fetchAppointments();
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteAppointment(id);
        fetchAppointments();
      } catch (error) {
        console.error('Error deleting appointment:', error);
      }
    }
  };

  return (
    <div className="appointments">
      <div className="header">
        <h2>Appointments</h2>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Book Appointment'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="form">
          <select value={formData.patient} onChange={(e) => setFormData({...formData, patient: e.target.value})} required>
            <option value="">Select Patient</option>
            {patients.map(p => (
              <option key={p._id} value={p._id}>{p.firstName} {p.lastName}</option>
            ))}
          </select>
          <select value={formData.doctor} onChange={(e) => setFormData({...formData, doctor: e.target.value})} required>
            <option value="">Select Doctor</option>
            {doctors.map(d => (
              <option key={d._id} value={d._id}>Dr. {d.firstName} {d.lastName} - {d.specialization}</option>
            ))}
          </select>
          <input type="date" value={formData.appointmentDate}
            onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})} required />
          <input type="time" value={formData.appointmentTime}
            onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})} required />
          <input type="text" placeholder="Reason for visit" value={formData.reason}
            onChange={(e) => setFormData({...formData, reason: e.target.value})} />
          <button type="submit">Book Appointment</button>
        </form>
      )}

      <table className="data-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(apt => (
            <tr key={apt._id}>
              <td>{apt.patient?.firstName} {apt.patient?.lastName}</td>
              <td>Dr. {apt.doctor?.firstName} {apt.doctor?.lastName}</td>
              <td>{new Date(apt.appointmentDate).toLocaleDateString()}</td>
              <td>{apt.appointmentTime}</td>
              <td><span className={`status ${apt.status.toLowerCase()}`}>{apt.status}</span></td>
              <td>
                <button onClick={() => handleDelete(apt._id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Appointments;
