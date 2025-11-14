import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DoctorDashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`https://hospital-backed-2n2z.onrender.com/api/appointments/doctor/${user._id}`);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm) {
      fetchAppointments();
      return;
    }
    try {
      const response = await axios.get(`https://hospital-backed-2n2z.onrender.com/api/appointments/search/${searchTerm}`);
      const filtered = response.data.filter(apt => apt.doctor._id === user._id);
      setAppointments(filtered);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.patch(`https://hospital-backed-2n2z.onrender.com/api/appointments/${id}/cancel`, { cancelledBy: 'doctor' });
      fetchAppointments();
    } catch (error) {
      alert('Error cancelling appointment');
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">🏥 Global Hospital</div>
        <div className="navbar-right">
          <input 
            type="text" 
            placeholder="Enter contact number" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{padding: '0.5rem', borderRadius: '5px', border: 'none'}}
          />
          <button className="search-btn" onClick={handleSearch}>Search</button>
          <button className="logout-btn" onClick={() => { onLogout(); navigate('/'); }}>Logout</button>
        </div>
      </nav>

      <div className="dashboard-container">
        <div className="sidebar">
          <div className={`sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>Dashboard</div>
          <div className={`sidebar-item ${activeTab === 'appointments' ? 'active' : ''}`} onClick={() => setActiveTab('appointments')}>Appointments</div>
        </div>

        <div className="dashboard-content">
          <h2 className="welcome-header">Welcome {user.name}</h2>

          {activeTab === 'dashboard' && (
            <div className="dashboard-cards">
              <div className="dashboard-card" onClick={() => setActiveTab('appointments')}>
                <div className="card-icon">📋</div>
                <div className="card-title">View Appointments</div>
                <div className="card-link">Appointment List</div>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                    <th>Current Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map(apt => (
                    <tr key={apt._id}>
                      <td>{apt.patient?.firstName}</td>
                      <td>{apt.patient?.lastName}</td>
                      <td>{apt.patient?.gender}</td>
                      <td>{apt.patient?.email}</td>
                      <td>{apt.patient?.phone}</td>
                      <td>{new Date(apt.appointmentDate).toLocaleDateString()}</td>
                      <td>{apt.appointmentTime}</td>
                      <td><span className={`status-badge ${apt.status === 'Active' ? 'status-active' : 'status-cancelled'}`}>{apt.status}</span></td>
                      <td>
                        {apt.status === 'Active' ? (
                          <button className="btn-cancel" onClick={() => handleCancel(apt._id)}>Cancel</button>
                        ) : (
                          'Cancelled'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
