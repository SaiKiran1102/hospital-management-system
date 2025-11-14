require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://hospital-frontend.onrender.com',
    /\.onrender\.com$/  // Allow all Render domains
  ],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/patients', require('./routes/patients'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/messages', require('./routes/messages'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Hospital Management System API' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
