import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register({ onLogin }) {
  const navigate = useNavigate();
  const [role, setRole] = useState('patient');
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '', gender: 'Male',
    name: '', consultationFee: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (role !== 'admin' && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const endpoint = `/api/auth/register/${role}`;
      const data = role === 'doctor' 
        ? { name: formData.name, email: formData.email, password: formData.password, consultationFee: formData.consultationFee }
        : { firstName: formData.firstName, lastName: formData.lastName, email: formData.email, phone: formData.phone, password: formData.password, gender: formData.gender };
      
      const response = await axios.post(`http://localhost:5001${endpoint}`, data);
      onLogin(response.data.user, response.data.role, response.data.token);
      navigate(`/${response.data.role}`);
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  const passwordsMatch = formData.password && formData.password === formData.confirmPassword;

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-icon">🚀</div>
        <h2>Welcome</h2>
      </div>
      <div className="auth-card">
        <div className="role-tabs">
          <button className={`role-tab ${role === 'patient' ? 'active' : ''}`} onClick={() => setRole('patient')}>Patient</button>
          <button className={`role-tab ${role === 'doctor' ? 'active' : ''}`} onClick={() => setRole('doctor')}>Doctor</button>
          <button className={`role-tab ${role === 'admin' ? 'active' : ''}`} onClick={() => setRole('admin')}>Admin</button>
        </div>
        <h2>Register as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          {role === 'patient' && (
            <>
              <div className="form-row">
                <input type="text" placeholder="First Name *" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} required />
                <input type="text" placeholder="Last Name *" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} required />
              </div>
              <div className="form-row">
                <input type="email" placeholder="Your Email *" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                <input type="tel" placeholder="Your Phone *" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
              </div>
              <div className="form-row">
                <input type="password" placeholder="Password *" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                <input type="password" placeholder="Confirm Password *" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} required />
              </div>
              {passwordsMatch && <div className="password-match">✓ Matching</div>}
              <div className="gender-group">
                <label><input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={(e) => setFormData({...formData, gender: e.target.value})} /> Male</label>
                <label><input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={(e) => setFormData({...formData, gender: e.target.value})} /> Female</label>
              </div>
            </>
          )}
          {role === 'doctor' && (
            <>
              <input type="text" placeholder="Doctor Name *" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              <input type="email" placeholder="Email *" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
              <div className="form-row">
                <input type="password" placeholder="Password *" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                <input type="password" placeholder="Confirm Password *" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} required />
              </div>
              {passwordsMatch && <div className="password-match">✓ Matching</div>}
              <input type="number" placeholder="Consultation Fee *" value={formData.consultationFee} onChange={(e) => setFormData({...formData, consultationFee: e.target.value})} required />
            </>
          )}
          <div className="auth-link" onClick={() => navigate('/login')}>Already have an account?</div>
          <button type="submit" className="auth-btn">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
