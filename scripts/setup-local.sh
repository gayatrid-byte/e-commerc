#!/bin/bash

# E-Commerce Application - Local Setup (No Docker)
# For development without Docker containers

echo "🚀 Setting up E-Commerce Application locally..."

# Check Node.js installation
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Backend setup
echo ""
echo "🔧 Setting up Backend..."
cd backend
npm install
cp .env.example .env
echo "✅ Backend dependencies installed"

# Frontend setup
echo ""
echo "🎨 Setting up Frontend..."
cd ../frontend
npm install
cp .env.example .env
echo "✅ Frontend dependencies installed"

cd ..

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "✅ Setup Complete!"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "📝 Configuration:"
echo "   1. Update backend/.env with your MongoDB Atlas URI:"
echo "      MONGODB_URI=mongodb+srv://user:pass@cluster.xxxxx.mongodb.net/ecommerce"
echo ""
echo "   2. Update frontend/.env with backend URL (if needed):"
echo "      VITE_API_URL=http://localhost:5000"
echo ""
echo "🚀 To start the application:"
echo ""
echo "   Terminal 1 - Start Backend:"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "   Terminal 2 - Start Frontend:"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "📍 Access the application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:5000"
echo ""
