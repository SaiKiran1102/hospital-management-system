import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PatientDashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ doctor: '', appointmentDate: '', appointmentTime: '' });

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('https://hospital-backed-2n2z.onrender.com/api/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`https://hospital-backed-2n2z.onrender.com/api/appointments/patient/${user._id}`);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://hospital-backed-2n2z.onrender.com/api/appointments', {
        patient: user._id,
        doctor: formData.doctor,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime
      });
      setShowModal(true);
      setFormData({ doctor: '', appointmentDate: '', appointmentTime: '' });
      fetchAppointments();
    } catch (error) {
      alert('Error booking appointment');
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">🏥 Global Hospital</div>
        <div className="navbar-right">
          <button className="logout-btn" onClick={() => { onLogout(); navigate('/'); }}>Logout</button>
        </div>
      </nav>

      <div className="dashboard-container">
        <div className="sidebar">
          <div className={`sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>Dashboard</div>
          <div className={`sidebar-item ${activeTab === 'book' ? 'active' : ''}`} onClick={() => setActiveTab('book')}>Book Appointment</div>
          <div className={`sidebar-item ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>Appointment History</div>
        </div>

        <div className="dashboard-content">
          <h2 className="welcome-header">Welcome {user.firstName} {user.lastName}</h2>

          {activeTab === 'dashboard' && (
            <div className="dashboard-cards">
              <div className="dashboard-card" onClick={() => setActiveTab('book')}>
                <div className="card-icon">📅</div>
                <div className="card-title">Book My Appointment</div>
                <div className="card-link">Book Appointment</div>
              </div>
              <div className="dashboard-card" onClick={() => setActiveTab('history')}>
                <div className="card-icon">📋</div>
                <div className="card-title">My Appointments</div>
                <div className="card-link">View Appointment History</div>
              </div>
            </div>
          )}

          {activeTab === 'book' && (
            <div className="content-card">
              <h3 style={{marginBottom: '2rem'}}>Create an appointment</h3>
              <form onSubmit={handleBookAppointment}>
                <div className="form-grid">
                  <div>
                    <label>Doctors:</label>
                    <select value={formData.doctor} onChange={(e) => {
                      setFormData({...formData, doctor: e.target.value});
                    }} required>
                      <option value="">Select Doctor</option>
                      {doctors.map(doc => (
                        <option key={doc._id} value={doc._id}>
                          Dr. {doc.name} - {doc.specialization}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Specialization:</label>
                    <input type="text" value={doctors.find(d => d._id === formData.doctor)?.specialization || ''} readOnly />
                  </div>
                  <div>
                    <label>Consultancy Fees:</label>
                    <input type="text" value={doctors.find(d => d._id === formData.doctor)?.consultationFee || ''} readOnly />
                  </div>
                  <div>
                    <label>Date:</label>
                    <input type="date" value={formData.appointmentDate} onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})} required />
                  </div>
                  <div>
                    <label>Time:</label>
                    <input type="time" value={formData.appointmentTime} onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})} required />
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">Create new entry</button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Doctor Name</th>
                    <th>Specialization</th>
                    <th>Consultancy Fees</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                    <th>Current Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map(apt => (
                    <tr key={apt._id}>
                      <td>Dr. {apt.doctor?.name}</td>
                      <td>{apt.doctor?.specialization}</td>
                      <td>${apt.doctor?.consultationFee}</td>
                      <td>{new Date(apt.appointmentDate).toLocaleDateString()}</td>
                      <td>{apt.appointmentTime}</td>
                      <td><span className={`status-badge ${apt.status === 'Active' ? 'status-active' : 'status-cancelled'}`}>{apt.status}</span></td>
                      <td>
                        {apt.status === 'Active' && (
                          <button className="btn-cancel" onClick={async () => {
                            await axios.patch(`https://hospital-backed-2n2z.onrender.com/api/appointments/${apt._id}/cancel`, { cancelledBy: 'patient' });
                            fetchAppointments();
                          }}>Cancel</button>
                        )}
                        {apt.status !== 'Active' && 'Cancelled'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Success!</h3>
            <p>Your appointment successfully booked</p>
            <button className="btn btn-primary" onClick={() => setShowModal(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientDashboard;
