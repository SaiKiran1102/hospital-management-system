import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [role, setRole] = useState('patient');
  const [credentials, setCredentials] = useState({ email: '', password: '', name: '', username: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = `/api/auth/login/${role}`;
      const data = role === 'admin' 
        ? { username: credentials.username, password: credentials.password }
        : role === 'doctor'
        ? { name: credentials.name, password: credentials.password }
        : { email: credentials.email, password: credentials.password };
      
      const response = await axios.post(`http://localhost:5001${endpoint}`, data);
      onLogin(response.data.user, response.data.role, response.data.token);
      navigate(`/${response.data.role}`);
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-icon">{role === 'patient' ? '🚑' : '🚀'}</div>
        <h2>{role === 'patient' ? 'We are here for you!' : 'Welcome'}</h2>
      </div>
      <div className="auth-card">
        <div className="role-tabs">
          <button className={`role-tab ${role === 'patient' ? 'active' : ''}`} onClick={() => setRole('patient')}>Patient</button>
          <button className={`role-tab ${role === 'doctor' ? 'active' : ''}`} onClick={() => setRole('doctor')}>Doctor</button>
          <button className={`role-tab ${role === 'admin' ? 'active' : ''}`} onClick={() => setRole('admin')}>Admin</button>
        </div>
        <h2>Login as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          {role === 'patient' && (
            <>
              <input type="email" placeholder="Email-ID" value={credentials.email} onChange={(e) => setCredentials({...credentials, email: e.target.value})} required />
              <input type="password" placeholder="Password" value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})} required />
            </>
          )}
          {role === 'doctor' && (
            <>
              <input type="text" placeholder="Doctor Name" value={credentials.name} onChange={(e) => setCredentials({...credentials, name: e.target.value})} required />
              <input type="password" placeholder="Password" value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})} required />
            </>
          )}
          {role === 'admin' && (
            <>
              <input type="text" placeholder="Username" value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})} required />
              <input type="password" placeholder="Password" value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})} required />
            </>
          )}
          <button type="submit" className="auth-btn">Login</button>
        </form>
        <div className="auth-link" onClick={() => navigate('/register')}>Don't have an account? Register</div>
      </div>
    </div>
  );
}

export default Login;
