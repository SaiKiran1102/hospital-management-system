import React, { useState, useEffect } from 'react';
import { getPatients, createPatient, deletePatient } from '../services/api';

function Patients() {
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    dateOfBirth: '', gender: 'Male', address: '', bloodGroup: ''
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await getPatients();
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPatient(formData);
      setShowForm(false);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', gender: 'Male', address: '', bloodGroup: '' });
      fetchPatients();
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deletePatient(id);
        fetchPatients();
      } catch (error) {
        console.error('Error deleting patient:', error);
      }
    }
  };

  return (
    <div className="patients">
      <div className="header">
        <h2>Patients</h2>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Patient'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="form">
          <input type="text" placeholder="First Name" value={formData.firstName} 
            onChange={(e) => setFormData({...formData, firstName: e.target.value})} required />
          <input type="text" placeholder="Last Name" value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})} required />
          <input type="email" placeholder="Email" value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          <input type="tel" placeholder="Phone" value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
          <input type="date" value={formData.dateOfBirth}
            onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})} required />
          <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input type="text" placeholder="Address" value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})} />
          <input type="text" placeholder="Blood Group" value={formData.bloodGroup}
            onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})} />
          <button type="submit">Add Patient</button>
        </form>
      )}

      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Blood Group</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient._id}>
              <td>{patient.firstName} {patient.lastName}</td>
              <td>{patient.email}</td>
              <td>{patient.phone}</td>
              <td>{patient.gender}</td>
              <td>{patient.bloodGroup || 'N/A'}</td>
              <td>
                <button onClick={() => handleDelete(patient._id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Patients;
