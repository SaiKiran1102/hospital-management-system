# 🚀 Deploy to Render - Step by Step Guide

## Prerequisites
- GitHub account
- Render account (free at https://render.com)
- Your MongoDB Atlas connection string

---

## 📋 Step-by-Step Deployment

### Step 1: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Hospital Management System - Ready for deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/hospital-management.git
git branch -M main
git push -u origin main
```

---

### Step 2: Deploy Backend on Render

1. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Click "New +" → "Web Service"

2. **Connect GitHub Repository**
   - Click "Connect account" to link GitHub
   - Select your `hospital-management` repository
   - Click "Connect"

3. **Configure Backend Service**
   ```
   Name: hospital-backend
   Region: Choose closest to you
   Branch: main
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable"
   
   Add these variables:
   ```
   MONGODB_URI = mongodb+srv://saikiran:saikiran@cluster0.btwhowl.mongodb.net/myhmsdb?retryWrites=true&w=majority
   JWT_SECRET = hospital_management_secret_key_2024
   PORT = 5001
   NODE_ENV = production
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait 3-5 minutes for deployment
   - Copy your backend URL (e.g., `https://hospital-backend.onrender.com`)

6. **Seed the Database**
   - Go to your service dashboard
   - Click "Shell" tab
   - Run: `npm run seed`
   - Wait for success message

---

### Step 3: Deploy Frontend on Render

1. **Create New Static Site**
   - Click "New +" → "Static Site"
   - Select same GitHub repository
   - Click "Connect"

2. **Configure Frontend Service**
   ```
   Name: hospital-frontend
   Branch: main
   Root Directory: client
   Build Command: npm install && npm run build
   Publish Directory: build
   ```

3. **Add Environment Variable**
   ```
   REACT_APP_API_URL = https://hospital-backend.onrender.com
   ```
   (Replace with your actual backend URL from Step 2)

4. **Deploy**
   - Click "Create Static Site"
   - Wait 3-5 minutes for deployment
   - Your frontend URL will be like: `https://hospital-frontend.onrender.com`

---

### Step 4: Update API URLs in Frontend

Before deploying frontend, update the API base URL:

**Option A: Use Environment Variable (Recommended)**

Create `client/.env.production`:
```
REACT_APP_API_URL=https://hospital-backend.onrender.com
```

Then update `client/src/services/api.js`:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'https://hospital-backed-2n2z.onrender.com/api';
```

**Option B: Direct Update**

Update all API calls in these files to use your Render backend URL:
- `client/src/pages/PatientDashboard.jsx`
- `client/src/pages/DoctorDashboard.jsx`
- `client/src/pages/AdminDashboard.jsx`
- `client/src/pages/Login.jsx`
- `client/src/pages/Register.jsx`

Replace `https://hospital-backed-2n2z.onrender.com` with `https://hospital-backend.onrender.com`

---

### Step 5: Update CORS in Backend

Update `server/server.js` to allow your frontend domain:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://hospital-frontend.onrender.com' // Add your Render frontend URL
  ],
  credentials: true
}));
```

Commit and push changes:
```bash
git add .
git commit -m "Update CORS and API URLs for production"
git push
```

Render will automatically redeploy both services.

---

## 🎯 Post-Deployment Checklist

### Test Your Deployment

1. **Visit Frontend URL**
   - Open `https://hospital-frontend.onrender.com`
   - Should see landing page with gradient

2. **Test Login**
   - Admin: `admin` / `admin123`
   - Patient: `kishansmart0@gmail.com` / `kishan123`
   - Doctor: `Ganesh` / `ganesh123`

3. **Test Features**
   - Patient: Book appointment
   - Doctor: View appointments
   - Admin: Add doctor

4. **Check Backend API**
   - Visit `https://hospital-backend.onrender.com`
   - Should see: `{"message":"Hospital Management System API"}`

---

## 🔧 Troubleshooting

### Backend Issues

**Problem: "Application failed to respond"**
- Check logs in Render dashboard
- Verify MongoDB connection string
- Ensure all environment variables are set

**Problem: Database connection error**
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check MongoDB URI is correct
- Ensure database user has proper permissions

### Frontend Issues

**Problem: "Failed to fetch" or CORS errors**
- Verify backend URL in environment variables
- Check CORS configuration in backend
- Ensure backend is running

**Problem: Blank page**
- Check browser console for errors
- Verify build completed successfully
- Check Render logs

### Free Tier Limitations

**Render Free Tier:**
- Services spin down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month free

**Solutions:**
- Upgrade to paid plan ($7/month per service)
- Use a service like UptimeRobot to ping your app every 14 minutes
- Accept the cold start delay

---

## 🎨 Custom Domain (Optional)

1. **Buy a domain** (e.g., from Namecheap, GoDaddy)

2. **Add to Render:**
   - Go to your service settings
   - Click "Custom Domain"
   - Add your domain
   - Follow DNS configuration instructions

3. **Update CORS and API URLs** with your custom domain

---

## 📊 Monitoring

### Render Dashboard
- View logs in real-time
- Monitor resource usage
- Check deployment history

### MongoDB Atlas
- Monitor database connections
- Check query performance
- View storage usage

---

## 🔄 Continuous Deployment

Render automatically redeploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Your changes"
git push

# Render will automatically:
# 1. Detect the push
# 2. Build your app
# 3. Deploy new version
```

---

## 💰 Cost Estimate

### Free Tier (Current Setup)
- Backend: Free (750 hours/month)
- Frontend: Free (100 GB bandwidth/month)
- MongoDB Atlas: Free (512 MB storage)
- **Total: $0/month**

### Paid Tier (Recommended for Production)
- Backend: $7/month (always on)
- Frontend: Free
- MongoDB Atlas: $9/month (2 GB storage)
- **Total: $16/month**

---

## 🎉 Success!

Your Hospital Management System is now live on the internet!

**Share your URLs:**
- Frontend: `https://hospital-frontend.onrender.com`
- Backend API: `https://hospital-backend.onrender.com`

**Login Credentials:**
- Admin: `admin` / `admin123`
- Doctor: `Ganesh` / `ganesh123`
- Patient: `kishansmart0@gmail.com` / `kishan123`

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)

---

## 🆘 Need Help?

If you encounter issues:
1. Check Render logs
2. Verify environment variables
3. Test API endpoints directly
4. Check MongoDB Atlas network access
5. Review CORS configuration

Good luck with your deployment! 🚀
