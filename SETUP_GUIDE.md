# 🏥 Hospital Management System - Complete Setup Guide

## Quick Start (5 minutes)

### Step 1: Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
cd ..
```

### Step 2: Database Setup

The `.env` file is already configured with MongoDB Atlas. The database will be created automatically when you seed the data.

```bash
cd server
npm run seed
```

You should see:
```
✅ Admin created - Username: admin, Password: admin123
✅ Doctor created - Ganesh (ganesh@gmail.com)
✅ Patient created - Kishan Lal (kishansmart0@gmail.com)
...
🎉 Database seeded successfully!
```

### Step 3: Start the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Atlas connected successfully
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

Browser will automatically open at `http://localhost:3000`

## 🎯 Testing the Application

### 1. Test Admin Login
1. Go to `http://localhost:3000`
2. Click "Login"
3. Select "Admin" tab
4. Username: `admin`
5. Password: `admin123`
6. You should see the admin dashboard with 4 cards

### 2. Test Doctor Login
1. Logout from admin
2. Click "Login"
3. Select "Doctor" tab
4. Name: `Ganesh`
5. Password: `ganesh123`
6. You should see the doctor dashboard

### 3. Test Patient Login
1. Logout from doctor
2. Click "Login"
3. Select "Patient" tab
4. Email: `kishansmart0@gmail.com`
5. Password: `kishan123`
6. You should see the patient dashboard

### 4. Test Patient Registration
1. Click "Register"
2. Fill in the form with your details
3. Select gender
4. Passwords should match (green checkmark appears)
5. Click "Register"
6. You should be logged in automatically

### 5. Test Booking Appointment
1. Login as patient
2. Click "Book Appointment"
3. Select a doctor (e.g., Ganesh - Fee: 550)
4. Choose date and time
5. Click "Create new entry"
6. Success modal should appear

### 6. Test Admin Features
1. Login as admin
2. Click "Add Doctor" from sidebar
3. Fill in doctor details
4. Passwords should match
5. Click "Add Doctor"
6. Check "Doctor List" to see the new doctor

## 🔧 Troubleshooting

### MongoDB Connection Issues

If you see "MongoDB connection error":

1. **Option A: Use Your Own MongoDB Atlas**
   - Create account at https://www.mongodb.com/cloud/atlas
   - Create a cluster
   - Get connection string
   - Update `server/.env`:
     ```
     MONGODB_URI=your_connection_string_here
     ```

2. **Option B: Use Local MongoDB**
   - Install MongoDB locally
   - Update `server/.env`:
     ```
     MONGODB_URI=mongodb://localhost:27017/myhmsdb
     ```

### Port Already in Use

If port 5000 or 3000 is already in use:

**Backend (5000):**
- Update `server/.env`: `PORT=5001`
- Update `client/src/pages/*.jsx`: Change all `http://localhost:5000` to `https://hospital-backed-2n2z.onrender.com`

**Frontend (3000):**
- Set environment variable: `PORT=3001 npm start`

### CORS Issues

If you see CORS errors:
- Make sure backend is running on port 5000
- Check that `server/server.js` has `app.use(cors())`

### Dependencies Issues

If npm install fails:
```bash
# Clear cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

## 📁 Project Structure

```
hospital-management/
├── server/                    # Backend
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── models/               # Database schemas
│   │   ├── Admin.js
│   │   ├── Doctor.js
│   │   ├── Patient.js
│   │   ├── Appointment.js
│   │   └── Message.js
│   ├── routes/               # API endpoints
│   │   ├── auth.js
│   │   ├── doctors.js
│   │   ├── patients.js
│   │   ├── appointments.js
│   │   └── messages.js
│   ├── .env                  # Environment variables
│   ├── seed.js               # Database seeder
│   └── server.js             # Entry point
│
├── client/                    # Frontend
│   ├── src/
│   │   ├── pages/            # React pages
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── PatientDashboard.jsx
│   │   │   ├── DoctorDashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── App.jsx           # Main app component
│   │   ├── App.css           # Styles
│   │   └── index.js          # Entry point
│   └── package.json
│
├── README.md                  # Main documentation
├── SETUP_GUIDE.md            # This file
└── setup.sh                  # Automated setup script
```

## 🚀 Features Checklist

After setup, verify these features work:

- [ ] Landing page loads with gradient background
- [ ] Registration works for all roles (Patient/Doctor/Admin)
- [ ] Login works for all roles
- [ ] Patient can book appointments
- [ ] Patient can view appointment history
- [ ] Patient can cancel appointments
- [ ] Doctor can view appointments
- [ ] Doctor can search by contact
- [ ] Doctor can cancel appointments
- [ ] Admin can view all doctors
- [ ] Admin can add new doctors
- [ ] Admin can delete doctors
- [ ] Admin can view all patients
- [ ] Admin can view all appointments
- [ ] Admin can view contact messages
- [ ] Search functionality works
- [ ] Logout works for all roles

## 🎨 Customization

### Change Colors

Edit `client/src/App.css`:
```css
/* Change gradient colors */
background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 50%, #YOUR_COLOR3 100%);
```

### Change Database Name

Edit `server/.env`:
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/YOUR_DB_NAME?retryWrites=true&w=majority
```

### Add More Sample Data

Edit `server/seed.js` and add more entries to the arrays.

## 📞 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure MongoDB is connected
4. Check that both servers are running
5. Clear browser cache and try again

## 🎉 Success!

If everything works, you should see:
- Beautiful gradient UI
- Smooth navigation
- Working authentication
- Functional dashboards for all roles
- Appointment booking system
- Search and filter capabilities

Enjoy your Hospital Management System! 🏥
