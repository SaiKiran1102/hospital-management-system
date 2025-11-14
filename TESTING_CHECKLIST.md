# ✅ Testing Checklist - Hospital Management System

## Pre-Testing Setup

- [ ] Backend server running on `http://localhost:5000`
- [ ] Frontend server running on `http://localhost:3000`
- [ ] Database seeded with sample data
- [ ] Browser opened to `http://localhost:3000`

## 1. Landing Page Tests

### Visual Tests
- [ ] Purple-to-cyan gradient background displays correctly
- [ ] "GLOBAL HOSPITALS" logo visible in navbar
- [ ] HOME, ABOUT US, CONTACT navigation links present
- [ ] Login and Register buttons visible in navbar
- [ ] Hero section displays "Welcome to Global Hospitals"
- [ ] 10 service cards display with icons and descriptions
- [ ] Contact form section visible at bottom

### Functional Tests
- [ ] Click HOME link (should stay on landing page)
- [ ] Click ABOUT US link (should scroll to about section)
- [ ] Click CONTACT link (should scroll to contact form)
- [ ] Click Login button (should navigate to login page)
- [ ] Click Register button (should navigate to register page)

## 2. Registration Tests

### Patient Registration
- [ ] Navigate to `/register`
- [ ] "Patient" tab is active by default
- [ ] Rocket icon (🚀) displays on left side
- [ ] "Welcome" text displays on left side
- [ ] Form has fields: First Name, Last Name, Email, Phone, Password, Confirm Password
- [ ] Gender radio buttons (Male/Female) present
- [ ] Type matching passwords - green "✓ Matching" appears
- [ ] Type non-matching passwords - no green checkmark
- [ ] "Already have an account?" link present
- [ ] Click Register with valid data - redirects to patient dashboard
- [ ] Try registering with existing email - shows error

### Doctor Registration
- [ ] Click "Doctor" tab
- [ ] Form changes to doctor fields
- [ ] Fields: Doctor Name, Email, Password, Confirm Password, Consultation Fee
- [ ] Password matching validation works
- [ ] Register successfully - redirects to doctor dashboard

## 3. Login Tests

### Patient Login
- [ ] Navigate to `/login`
- [ ] Ambulance icon (🚑) displays on left
- [ ] "We are here for you!" text displays
- [ ] Patient tab active by default
- [ ] Fields: Email-ID, Password
- [ ] Login with: `kishansmart0@gmail.com` / `kishan123`
- [ ] Redirects to patient dashboard
- [ ] Welcome message shows "Welcome Kishan Lal"

### Doctor Login
- [ ] Click "Doctor" tab
- [ ] Rocket icon (🚀) displays
- [ ] "Welcome" text displays
- [ ] Fields: Doctor Name, Password
- [ ] Login with: `Ganesh` / `ganesh123`
- [ ] Redirects to doctor dashboard
- [ ] Welcome message shows "Welcome Ganesh"

### Admin Login
- [ ] Click "Admin" tab
- [ ] Rocket icon displays
- [ ] Fields: Username, Password
- [ ] Login with: `admin` / `admin123`
- [ ] Redirects to admin dashboard
- [ ] Welcome message shows "WELCOME ADMIN"

## 4. Patient Dashboard Tests

### Dashboard View
- [ ] Sidebar shows: Dashboard, Book Appointment, Appointment History
- [ ] "Dashboard" is active by default
- [ ] Two cards display: "Book My Appointment" and "My Appointments"
- [ ] Cards have icons and links
- [ ] Logout button in navbar

### Book Appointment
- [ ] Click "Book Appointment" from sidebar or card
- [ ] Form displays with fields: Doctors, Consultancy Fees, Date, Time
- [ ] Doctor dropdown populated with doctors
- [ ] Select doctor - consultation fee auto-fills
- [ ] Select date (future date)
- [ ] Select time
- [ ] Click "Create new entry"
- [ ] Success modal appears: "Your appointment successfully booked"
- [ ] Click OK - modal closes
- [ ] Appointment appears in history

### Appointment History
- [ ] Click "Appointment History" from sidebar
- [ ] Table displays with columns: Doctor Name, Consultancy Fees, Appointment Date, Appointment Time, Current Status, Action
- [ ] Active appointments show green "Active" badge
- [ ] Active appointments have "Cancel" button
- [ ] Click Cancel - appointment status changes to "Cancelled by You"
- [ ] Cancelled appointments show red badge
- [ ] Cancelled appointments show "Cancelled" text (no button)

### Logout
- [ ] Click Logout button
- [ ] Redirects to landing page
- [ ] Cannot access `/patient` without login

## 5. Doctor Dashboard Tests

### Dashboard View
- [ ] Sidebar shows: Dashboard, Appointments
- [ ] Search bar in navbar with "Enter contact number" placeholder
- [ ] "Dashboard" active by default
- [ ] One card displays: "View Appointments"

### View Appointments
- [ ] Click "Appointments" from sidebar or card
- [ ] Table displays with columns: First Name, Last Name, Gender, Email, Contact, Appointment Date, Appointment Time, Current Status, Action
- [ ] All appointments for this doctor display
- [ ] Active appointments show green badge
- [ ] Active appointments have "Cancel" button
- [ ] Cancelled appointments show red badge

### Search Functionality
- [ ] Enter patient contact number in search bar
- [ ] Click Search
- [ ] Table filters to show only matching appointments
- [ ] Clear search - all appointments return

### Cancel Appointment
- [ ] Click Cancel on an active appointment
- [ ] Status changes to "Cancelled by Doctor"
- [ ] Badge turns red
- [ ] Action shows "Cancelled"

### Logout
- [ ] Click Logout
- [ ] Redirects to landing page

## 6. Admin Dashboard Tests

### Dashboard View
- [ ] Sidebar shows: Dashboard, Doctor List, Patient List, Appointment Details, Add Doctor, Delete Doctor, Messages
- [ ] "Dashboard" active by default
- [ ] Four cards display: Doctor List, Patient List, Appointment Details, Manage Doctors
- [ ] All cards have icons and links

### Doctor List
- [ ] Click "Doctor List" from sidebar or card
- [ ] Search bar with "Enter Email ID" placeholder
- [ ] Table displays: Doctor Name, Password (masked), Email, Fees
- [ ] All 8 seeded doctors display
- [ ] Search by email filters results

### Patient List
- [ ] Click "Patient List" from sidebar
- [ ] Search bar with "Enter Contact" placeholder
- [ ] Table displays: First Name, Last Name, Email, Contact, Password (masked)
- [ ] All 11 seeded patients display
- [ ] Search functionality works

### Appointment Details
- [ ] Click "Appointment Details" from sidebar
- [ ] Search bar with "Enter Contact" placeholder
- [ ] Table displays: First Name, Last Name, Email, Contact, Doctor Name, Consultancy Fees, Appointment Date, Appointment Time
- [ ] All appointments display
- [ ] Search by contact filters results

### Add Doctor
- [ ] Click "Add Doctor" from sidebar
- [ ] Form displays: Doctor Name, Email ID, Password, Confirm Password, Consultancy Fees
- [ ] Enter new doctor details
- [ ] Passwords match - green "✓ Matching" appears
- [ ] Click "Add Doctor"
- [ ] Success message appears
- [ ] New doctor appears in Doctor List

### Delete Doctor
- [ ] Click "Delete Doctor" from sidebar
- [ ] Form displays: Email ID field
- [ ] Enter doctor email (e.g., `tiwary@gmail.com`)
- [ ] Click "Delete Doctor"
- [ ] Success message appears
- [ ] Doctor removed from Doctor List

### Messages
- [ ] Click "Messages" from sidebar
- [ ] Table displays: User Name, Email, Contact, Message
- [ ] All 8 seeded messages display
- [ ] Messages from contact form appear here

### Logout
- [ ] Click Logout
- [ ] Redirects to landing page

## 7. Contact Form Tests

- [ ] Navigate to landing page
- [ ] Scroll to contact section
- [ ] Form displays: Name, Email, Phone, Message
- [ ] Fill in all fields
- [ ] Click "Send Message"
- [ ] Success alert appears
- [ ] Login as admin
- [ ] Check Messages section
- [ ] New message appears in table

## 8. UI/UX Tests

### Gradient Design
- [ ] Purple-to-cyan gradient visible on all auth pages
- [ ] Gradient navbar on all dashboard pages
- [ ] White content cards with rounded corners
- [ ] Smooth hover effects on buttons and cards

### Responsive Design
- [ ] Resize browser window
- [ ] Layout adjusts appropriately
- [ ] Sidebar collapses on mobile
- [ ] Forms stack vertically on small screens

### Navigation
- [ ] Sidebar items highlight when active
- [ ] Clicking sidebar items changes content
- [ ] Back button works correctly
- [ ] Logout from any page works

### Form Validation
- [ ] Required fields show error if empty
- [ ] Email validation works
- [ ] Password matching validation works
- [ ] Date picker only allows future dates

## 9. Error Handling Tests

### Invalid Login
- [ ] Try login with wrong password - error message appears
- [ ] Try login with non-existent email - error message appears

### Network Errors
- [ ] Stop backend server
- [ ] Try any action - appropriate error handling
- [ ] Restart backend - functionality resumes

### Duplicate Registration
- [ ] Try registering with existing email
- [ ] Error message appears
- [ ] Form doesn't submit

## 10. Data Persistence Tests

### Appointments
- [ ] Create appointment as patient
- [ ] Logout and login again
- [ ] Appointment still visible in history
- [ ] Login as doctor
- [ ] Same appointment visible in doctor's list

### User Data
- [ ] Register new patient
- [ ] Logout
- [ ] Login as admin
- [ ] New patient visible in Patient List

### Status Updates
- [ ] Cancel appointment as patient
- [ ] Login as doctor
- [ ] Appointment shows "Cancelled by Patient"
- [ ] Login as admin
- [ ] Appointment details reflect cancellation

## Summary

Total Tests: ~150+

### Pass Criteria
- [ ] All visual elements display correctly
- [ ] All navigation works smoothly
- [ ] All forms submit successfully
- [ ] All CRUD operations work
- [ ] All role-based features accessible
- [ ] No console errors
- [ ] Responsive design works
- [ ] Data persists correctly

### Known Issues (if any)
- Document any issues found during testing

### Test Environment
- Browser: _______________
- OS: _______________
- Node Version: _______________
- Date Tested: _______________

---

**Testing Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete | ❌ Failed

**Overall Result:** _______________
