import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  const services = [
    { icon: '✓', title: 'Make an appointment', desc: 'Book your medical appointments easily' },
    { icon: '📋', title: 'Choose your package', desc: 'Select the best healthcare package' },
    { icon: '👨‍⚕️', title: 'Help by specialist', desc: 'Get expert medical consultation' },
    { icon: '🏥', title: 'Get diagnostic report', desc: 'Access your medical reports online' },
    { icon: '🩺', title: 'Medical checkup', desc: 'Comprehensive health checkups' },
    { icon: '🏥', title: 'Gyn Care', desc: 'Specialized gynecology services' },
    { icon: '♿', title: 'Nursing Services', desc: 'Professional nursing care' },
    { icon: '🧠', title: 'Neurology', desc: 'Expert neurological treatment' },
    { icon: '💊', title: 'Pharmacy', desc: 'Online pharmacy services' },
    { icon: '💤', title: 'Sleep Center', desc: 'Sleep disorder treatment' }
  ];

  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="navbar-brand">
          <span>🏥</span> GLOBAL HOSPITALS
        </div>
        <ul className="navbar-menu">
          <li><a href="#home">HOME</a></li>
          <li><a href="#about">ABOUT US</a></li>
          <li><a href="#contact">CONTACT</a></li>
        </ul>
        <div className="navbar-right">
          <button className="logout-btn" onClick={() => navigate('/login')}>Login</button>
          <button className="logout-btn" onClick={() => navigate('/register')}>Register</button>
        </div>
      </nav>

      <div className="hero-section">
        <h1 style={{fontSize: '3rem', marginBottom: '2rem'}}>Welcome to Global Hospitals</h1>
        <p style={{fontSize: '1.2rem'}}>Your Health, Our Priority</p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>

      <div id="contact" style={{padding: '4rem 2rem', maxWidth: '600px', margin: '0 auto'}}>
        <div className="auth-card">
          <div style={{textAlign: 'center', marginBottom: '2rem'}}>
            <div style={{fontSize: '3rem'}}>🚀</div>
            <h2>Drop Us a Message</h2>
          </div>
          <form className="auth-form" onSubmit={(e) => {e.preventDefault(); alert('Message sent!');}}>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input type="tel" placeholder="Phone" required />
            <textarea placeholder="Message" rows="4" style={{padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd'}} required></textarea>
            <button type="submit" className="auth-btn" style={{alignSelf: 'center'}}>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
