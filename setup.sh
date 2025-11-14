#!/bin/bash

echo "🏥 Hospital Management System Setup"
echo "===================================="
echo ""

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
cd ..

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Create a .env file in the server directory with your MongoDB URI"
echo "2. Run 'cd server && npm run seed' to create admin user"
echo "3. Run 'cd server && npm run dev' to start the backend"
echo "4. Run 'cd client && npm start' to start the frontend"
echo ""
echo "Default admin credentials:"
echo "Username: admin"
echo "Password: admin123"
