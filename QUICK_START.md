# 🚀 Quick Start - Hospital Management System

## One Command Setup

```bash
chmod +x start.sh && ./start.sh
```

That's it! The script will:
1. ✅ Install all dependencies
2. ✅ Seed the database with sample data
3. ✅ Start both backend and frontend servers

## What You'll See

### Terminal Output:
```
🏥 Hospital Management System - Quick Start
===========================================

📦 Installing server dependencies...
📦 Installing client dependencies...
🌱 Seeding database...
✅ Admin created - Username: admin, Password: admin123
✅ Doctor created - Ganesh (ganesh@gmail.com)
✅ Patient created - Kishan Lal (kishansmart0@gmail.com)
🎉 Database seeded successfully!

🚀 Starting servers...
Backend will run on: http://localhost:5000
Frontend will run on: http://localhost:3000

Server running on port 5000
MongoDB Atlas connected successfully
```

### Browser:
- Automatically opens at `http://localhost:3000`
- Beautiful purple-to-cyan gradient landing page
- Navigation to Login/Register

## Test Login Credentials

### 👨‍💼 Admin
```
Username: admin
Password: admin123
```

### 👨‍⚕️ Doctor
```
Name: Ganesh
Password: ganesh123
```

### 👤 Patient
```
Email: kishansmart0@gmail.com
Password: kishan123
```

## Manual Setup (Alternative)

If you prefer manual setup:

### 1. Install Dependencies
```bash
# Server
cd server && npm install

# Client
cd ../client && npm install
```

### 2. Seed Database
```bash
cd server
npm run seed
```

### 3. Start Backend
```bash
cd server
npm run dev
```

### 4. Start Frontend (New Terminal)
```bash
cd client
npm start
```

## Features to Test

1. **Landing Page** - View services showcase
2. **Registration** - Register as Patient/Doctor
3. **Login** - Login with different roles
4. **Patient Dashboard** - Book appointments
5. **Doctor Dashboard** - View appointments
6. **Admin Dashboard** - Manage doctors and patients

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### MongoDB Connection Error
- Check internet connection
- Verify `.env` file exists in server directory
- Try running `npm run seed` again

### Dependencies Error
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf server/node_modules client/node_modules

# Reinstall
cd server && npm install
cd ../client && npm install
```

## Next Steps

After successful setup:
1. ✅ Explore the landing page
2. ✅ Register a new patient account
3. ✅ Login as admin and add a doctor
4. ✅ Login as patient and book an appointment
5. ✅ Login as doctor and view appointments

## Need Help?

Check the detailed guides:
- `README.md` - Full documentation
- `SETUP_GUIDE.md` - Detailed setup instructions

Enjoy your Hospital Management System! 🏥✨
