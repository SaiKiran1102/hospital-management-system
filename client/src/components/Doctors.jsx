import React, { useState, useEffect } from 'react';
import { getDoctors, createDoctor, deleteDoctor } from '../services/api';

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    specialization: '', qualification: '', experience: '', consultationFee: ''
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

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
      await createDoctor(formData);
      setShowForm(false);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', specialization: '', qualification: '', experience: '', consultationFee: '' });
      fetchDoctors();
    } catch (error) {
      console.error('Error creating doctor:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteDoctor(id);
        fetchDoctors();
      } catch (error) {
        console.error('Error deleting doctor:', error);
      }
    }
  };

  return (
    <div className="doctors">
      <div className="header">
        <h2>Doctors</h2>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Doctor'}
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
          <input type="text" placeholder="Specialization" value={formData.specialization}
            onChange={(e) => setFormData({...formData, specialization: e.target.value})} required />
          <input type="text" placeholder="Qualification" value={formData.qualification}
            onChange={(e) => setFormData({...formData, qualification: e.target.value})} required />
          <input type="number" placeholder="Experience (years)" value={formData.experience}
            onChange={(e) => setFormData({...formData, experience: e.target.value})} />
          <input type="number" placeholder="Consultation Fee" value={formData.consultationFee}
            onChange={(e) => setFormData({...formData, consultationFee: e.target.value})} />
          <button type="submit">Add Doctor</button>
        </form>
      )}

      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Specialization</th>
            <th>Experience</th>
            <th>Fee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(doctor => (
            <tr key={doctor._id}>
              <td>{doctor.firstName} {doctor.lastName}</td>
              <td>{doctor.email}</td>
              <td>{doctor.phone}</td>
              <td>{doctor.specialization}</td>
              <td>{doctor.experience || 'N/A'} years</td>
              <td>${doctor.consultationFee || 'N/A'}</td>
              <td>
                <button onClick={() => handleDelete(doctor._id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Doctors;
