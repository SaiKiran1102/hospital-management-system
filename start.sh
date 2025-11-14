#!/bin/bash

echo "🏥 Hospital Management System - Quick Start"
echo "==========================================="
echo ""

# Check if node_modules exists in server
if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing server dependencies..."
    cd server
    npm install
    cd ..
fi

# Check if node_modules exists in client
if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing client dependencies..."
    cd client
    npm install
    cd ..
fi

# Check if database is seeded
echo ""
echo "🌱 Seeding database..."
cd server
npm run seed
cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 Starting servers..."
echo ""
echo "Backend will run on: http://localhost:5000"
echo "Frontend will run on: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start both servers
cd server && npm run dev &
SERVER_PID=$!

cd ../client && npm start &
CLIENT_PID=$!

# Wait for both processes
wait $SERVER_PID $CLIENT_PID
