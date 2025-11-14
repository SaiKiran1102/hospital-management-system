import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [doctorForm, setDoctorForm] = useState({ name: '', email: '', password: '', confirmPassword: '', consultationFee: '', specialization: '' });
  const [deleteEmail, setDeleteEmail] = useState('');

  useEffect(() => {
    fetchDoctors();
    fetchPatients();
    fetchAppointments();
    fetchMessages();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    if (doctorForm.password !== doctorForm.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      await axios.post('http://localhost:5001/api/doctors', {
        name: doctorForm.name,
        email: doctorForm.email,
        password: doctorForm.password,
        consultationFee: doctorForm.consultationFee,
        specialization: doctorForm.specialization
      });
      setDoctorForm({ name: '', email: '', password: '', confirmPassword: '', consultationFee: '', specialization: '' });
      fetchDoctors();
      alert('Doctor added successfully!');
    } catch (error) {
      alert('Error adding doctor');
    }
  };

  const handleDeleteDoctor = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:5001/api/doctors/email/${deleteEmail}`);
      setDeleteEmail('');
      fetchDoctors();
      alert('Doctor deleted successfully!');
    } catch (error) {
      alert('Doctor not found');
    }
  };

  const handleSearch = async () => {
    if (!searchTerm) {
      if (activeTab === 'doctors') fetchDoctors();
      if (activeTab === 'patients') fetchPatients();
      if (activeTab === 'appointments') fetchAppointments();
      return;
    }
    try {
      if (activeTab === 'doctors') {
        const response = await axios.get(`http://localhost:5001/api/doctors/search?email=${searchTerm}`);
        setDoctors(response.data);
      } else if (activeTab === 'appointments') {
        const response = await axios.get(`http://localhost:5001/api/appointments/search/${searchTerm}`);
        setAppointments(response.data);
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const passwordsMatch = doctorForm.password && doctorForm.password === doctorForm.confirmPassword;

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
          <div className={`sidebar-item ${activeTab === 'doctors' ? 'active' : ''}`} onClick={() => setActiveTab('doctors')}>Doctor List</div>
          <div className={`sidebar-item ${activeTab === 'patients' ? 'active' : ''}`} onClick={() => setActiveTab('patients')}>Patient List</div>
          <div className={`sidebar-item ${activeTab === 'appointments' ? 'active' : ''}`} onClick={() => setActiveTab('appointments')}>Appointment Details</div>
          <div className={`sidebar-item ${activeTab === 'addDoctor' ? 'active' : ''}`} onClick={() => setActiveTab('addDoctor')}>Add Doctor</div>
          <div className={`sidebar-item ${activeTab === 'deleteDoctor' ? 'active' : ''}`} onClick={() => setActiveTab('deleteDoctor')}>Delete Doctor</div>
          <div className={`sidebar-item ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>Messages</div>
        </div>

        <div className="dashboard-content">
          <h2 className="welcome-header">WELCOME ADMIN</h2>

          {activeTab === 'dashboard' && (
            <div className="dashboard-cards">
              <div className="dashboard-card" onClick={() => setActiveTab('doctors')}>
                <div className="card-icon">👨‍⚕️</div>
                <div className="card-title">Doctor List</div>
                <div className="card-link">View Doctors</div>
              </div>
              <div className="dashboard-card" onClick={() => setActiveTab('patients')}>
                <div className="card-icon">👥</div>
                <div className="card-title">Patient List</div>
                <div className="card-link">View Patients</div>
              </div>
              <div className="dashboard-card" onClick={() => setActiveTab('appointments')}>
                <div className="card-icon">📋</div>
                <div className="card-title">Appointment Details</div>
                <div className="card-link">View Appointments</div>
              </div>
              <div className="dashboard-card" onClick={() => setActiveTab('addDoctor')}>
                <div className="card-icon">➕</div>
                <div className="card-title">Manage Doctors</div>
                <div className="card-link">Add Doctors</div>
              </div>
            </div>
          )}

          {activeTab === 'doctors' && (
            <div className="table-container">
              <div className="search-bar">
                <input type="text" placeholder="Enter Email ID" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button className="search-btn" onClick={handleSearch}>Search</button>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Doctor Name</th>
                    <th>Specialization</th>
                    <th>Email</th>
                    <th>Fees</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map(doc => (
                    <tr key={doc._id}>
                      <td>Dr. {doc.name}</td>
                      <td>{doc.specialization}</td>
                      <td>{doc.email}</td>
                      <td>${doc.consultationFee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'patients' && (
            <div className="table-container">
              <div className="search-bar">
                <input type="text" placeholder="Enter Contact" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button className="search-btn" onClick={handleSearch}>Search</button>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map(patient => (
                    <tr key={patient._id}>
                      <td>{patient.firstName}</td>
                      <td>{patient.lastName}</td>
                      <td>{patient.email}</td>
                      <td>{patient.phone}</td>
                      <td>••••••</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="table-container">
              <div className="search-bar">
                <input type="text" placeholder="Enter Contact" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button className="search-btn" onClick={handleSearch}>Search</button>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Doctor Name</th>
                    <th>Consultancy Fees</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map(apt => (
                    <tr key={apt._id}>
                      <td>{apt.patient?.firstName}</td>
                      <td>{apt.patient?.lastName}</td>
                      <td>{apt.patient?.email}</td>
                      <td>{apt.patient?.phone}</td>
                      <td>{apt.doctor?.name}</td>
                      <td>{apt.doctor?.consultationFee}</td>
                      <td>{new Date(apt.appointmentDate).toLocaleDateString()}</td>
                      <td>{apt.appointmentTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'addDoctor' && (
            <div className="content-card">
              <h3 style={{marginBottom: '2rem'}}>Add New Doctor</h3>
              <form onSubmit={handleAddDoctor}>
                <div className="form-grid">
                  <input type="text" placeholder="Doctor Name *" value={doctorForm.name} onChange={(e) => setDoctorForm({...doctorForm, name: e.target.value})} required />
                  <input type="email" placeholder="Email ID *" value={doctorForm.email} onChange={(e) => setDoctorForm({...doctorForm, email: e.target.value})} required />
                  <select value={doctorForm.specialization} onChange={(e) => setDoctorForm({...doctorForm, specialization: e.target.value})} required>
                    <option value="">Select Specialization *</option>
                    <option value="General">General</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Pediatrician">Pediatrician</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Orthopedic">Orthopedic</option>
                    <option value="Dermatologist">Dermatologist</option>
                  </select>
                  <input type="number" placeholder="Consultancy Fees *" value={doctorForm.consultationFee} onChange={(e) => setDoctorForm({...doctorForm, consultationFee: e.target.value})} required />
                  <input type="password" placeholder="Password *" value={doctorForm.password} onChange={(e) => setDoctorForm({...doctorForm, password: e.target.value})} required />
                  <input type="password" placeholder="Confirm Password *" value={doctorForm.confirmPassword} onChange={(e) => setDoctorForm({...doctorForm, confirmPassword: e.target.value})} required />
                </div>
                {passwordsMatch && <div className="password-match">✓ Matching</div>}
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">Add Doctor</button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'deleteDoctor' && (
            <div className="content-card">
              <h3 style={{marginBottom: '2rem'}}>Delete Doctor</h3>
              <form onSubmit={handleDeleteDoctor}>
                <div className="form-grid">
                  <input type="email" placeholder="Email ID" value={deleteEmail} onChange={(e) => setDeleteEmail(e.target.value)} required />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-danger">Delete Doctor</button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="table-container">
              <div className="search-bar">
                <input type="text" placeholder="Enter Contact" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button className="search-btn" onClick={handleSearch}>Search</button>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map(msg => (
                    <tr key={msg._id}>
                      <td>{msg.name}</td>
                      <td>{msg.email}</td>
                      <td>{msg.phone}</td>
                      <td>{msg.message}</td>
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

export default AdminDashboard;
