# Hospital Management System

A full-stack hospital management application built with MongoDB Atlas, Express.js, Node.js, and React.js (MERN stack) featuring a beautiful purple-to-cyan gradient design.

## 🌐 Live Demo

**Website:** [https://hospital-frontend-fozc.onrender.com](https://hospital-frontend-fozc.onrender.com)

**Backend API:** [https://hospital-backed-2n2z.onrender.com](https://hospital-backed-2n2z.onrender.com)

### 🔑 Test Credentials:
- **Admin:** Username: `admin` | Password: `admin123`
- **Doctor:** Name: `Ganesh` | Password: `ganesh123`
- **Patient:** Email: `kishansmart0@gmail.com` | Password: `kishan123`

## Features

- **Role-Based Authentication** (Patient, Doctor, Admin)
- **Patient Portal**
  - Book appointments with doctors
  - View appointment history
  - Cancel appointments
- **Doctor Portal**
  - View all appointments
  - Search patients by contact
  - Cancel appointments
- **Admin Portal**
  - Manage doctors (add/delete)
  - View all patients
  - View all appointments
  - View contact messages
  - Search functionality
- **Landing Page** with services showcase
- **Contact Form** for inquiries
- Beautiful gradient UI design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

## Setup Instructions

### 1. MongoDB Atlas Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Whitelist your IP address (0.0.0.0/0 for development)

### 2. Backend Setup

```bash
cd server
npm install
```

The `.env` file is already created with a MongoDB Atlas connection. If you want to use your own MongoDB:

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get your connection string
4. Update the `MONGODB_URI` in `server/.env`

Current `.env` configuration:
```
MONGODB_URI=mongodb+srv://hospital:hospital123@cluster0.mongodb.net/myhmsdb?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=hospital_management_secret_key_2024
```

Seed the database with sample data:

```bash
npm run seed
```

This creates:
- Admin user (username: `admin`, password: `admin123`)
- 8 sample doctors
- 11 sample patients
- Contact messages

Start the server:

```bash
npm run dev
```

Server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd client
npm install
npm start
```

The application will open at `http://localhost:3000`

## Default Login Credentials

After running `npm run seed`, you can use these credentials:

### Admin
- Username: `admin`
- Password: `admin123`

### Sample Doctor
- Name: `Ganesh`
- Password: `ganesh123`

### Sample Patient
- Email: `kishansmart0@gmail.com`
- Password: `kishan123`

### Other Sample Accounts
**Doctors:**
- Dinesh (dinesh123), Amit (amit123), ashok (ashok123), arun (arun123), Kumar (kumar123), Abbis (abbis123), Tiwary (tiwary123)

**Patients:**
- ram@gmail.com (ram123), alia@gmail.com (alia123), shahrukh@gmail.com (shahrukh123), gautam@gmail.com (gautam123), and more

You can also register new patients and doctors through the registration page.

## Usage Guide

### For Patients
1. Register as a patient with your details
2. Login with your email and password
3. Book appointments by selecting a doctor, date, and time
4. View your appointment history
5. Cancel appointments if needed

### For Doctors
1. Admin must add you to the system first
2. Login with your name and password
3. View all your appointments
4. Search for patients by contact number
5. Cancel appointments if necessary

### For Admin
1. Login with admin credentials
2. View dashboard with all statistics
3. Add new doctors to the system
4. Delete doctors by email
5. View all patients and appointments
6. Check contact form messages

## API Endpoints

### Authentication
- POST `/api/auth/register/patient` - Register patient
- POST `/api/auth/register/doctor` - Register doctor
- POST `/api/auth/login/patient` - Patient login
- POST `/api/auth/login/doctor` - Doctor login
- POST `/api/auth/login/admin` - Admin login

### Patients
- GET `/api/patients` - Get all patients
- GET `/api/patients/:id` - Get single patient
- POST `/api/patients` - Create patient
- DELETE `/api/patients/:id` - Delete patient

### Doctors
- GET `/api/doctors` - Get all doctors
- GET `/api/doctors/search?email=` - Search doctors by email
- POST `/api/doctors` - Create doctor
- DELETE `/api/doctors/email/:email` - Delete doctor by email

### Appointments
- GET `/api/appointments` - Get all appointments
- GET `/api/appointments/patient/:patientId` - Get patient appointments
- GET `/api/appointments/doctor/:doctorId` - Get doctor appointments
- GET `/api/appointments/search/:contact` - Search by contact
- POST `/api/appointments` - Create appointment
- PATCH `/api/appointments/:id/cancel` - Cancel appointment

### Messages
- GET `/api/messages` - Get all messages
- POST `/api/messages` - Create message

## Project Structure

```
hospital-management/
├── server/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Patient.js
│   │   ├── Doctor.js
│   │   ├── Admin.js
│   │   ├── Appointment.js
│   │   └── Message.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── patients.js
│   │   ├── doctors.js
│   │   ├── appointments.js
│   │   └── messages.js
│   ├── seed.js
│   ├── server.js
│   └── package.json
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── PatientDashboard.jsx
│   │   │   ├── DoctorDashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── README.md
```

## Technologies Used

- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT, bcryptjs
- **Styling**: CSS3 with gradient design

## Design Features

- Purple-to-cyan gradient background
- Modern card-based UI
- Responsive design
- Role-based navigation
- Clean and intuitive interface
- Modal notifications
- Search functionality
- Status badges

## License

MIT
