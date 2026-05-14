#!/bin/bash

# E-Commerce Application - EC2 Deployment Script (No Docker)
# Direct Node.js deployment with MongoDB Atlas

set -e

echo "🚀 Starting E-Commerce Application Setup on EC2..."
echo "📝 Configuration: Node.js Backend + React Frontend + MongoDB Atlas"

# Update system
echo "📦 Updating system packages..."
sudo apt-get update
sudo apt-get upgrade -y

# Install Node.js and npm
echo "📦 Installing Node.js and npm..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Install PM2 for process management
echo "📦 Installing PM2 (process manager)..."
sudo npm install -g pm2

# Install Git
echo "📥 Installing Git..."
sudo apt-get install -y git

# Create application directory
echo "📁 Creating application directory..."
APP_DIR="/home/ubuntu/ecommerce-app"
sudo mkdir -p $APP_DIR
sudo chown -R ubuntu:ubuntu $APP_DIR
cd $APP_DIR

# Backend Setup
echo ""
echo "🔧 Setting up Backend..."
cd $APP_DIR/backend
npm install
cp .env.example .env

# Frontend Setup
echo ""
echo "🎨 Setting up Frontend..."
cd $APP_DIR/frontend
npm install
cp .env.example .env
npm run build

# Create environment configuration
echo ""
echo "⚙️  Creating production configuration..."
cat > $APP_DIR/.env.production << 'EOF'
# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=production

# Frontend Configuration
FRONTEND_URL=http://your-ec2-ip:3000
EOF

# Update backend .env
cp $APP_DIR/.env.production $APP_DIR/backend/.env

# Update frontend .env
cat > $APP_DIR/frontend/.env << EOF
VITE_API_URL=http://$(hostname -I | awk '{print $1}'):5000
EOF

# Start backend with PM2
echo ""
echo "🚀 Starting Backend with PM2..."
cd $APP_DIR/backend
pm2 start server.js --name "ecommerce-backend"

# Start frontend with PM2 (using http-server or similar)
echo ""
echo "🚀 Starting Frontend..."
cd $APP_DIR/frontend
pm2 serve dist 3000 --name "ecommerce-frontend" --spa

# Save PM2 process list for auto-restart on reboot
pm2 save
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup ubuntu -u ubuntu --hp /home/ubuntu

# Wait for services
echo "⏳ Waiting for services to start..."
sleep 5

# Verify services
echo ""
echo "🏥 Checking services..."
pm2 list

# Test backend
echo ""
echo "🧪 Testing Backend API..."
curl -s http://localhost:5000/api/health || echo "⚠️ Backend still starting..."

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "✅ E-Commerce Application Deployment Complete!"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "📍 Application URLs:"
echo "   Frontend: http://$(hostname -I | awk '{print $1}'):3000"
echo "   Backend API: http://$(hostname -I | awk '{print $1}'):5000"
echo ""
echo "⚠️  IMPORTANT: Update MongoDB URI in .env before services will work!"
echo ""
echo "📝 Configuration file: /home/ubuntu/ecommerce-app/.env.production"
echo ""
echo "🔍 View logs:"
echo "   pm2 logs"
echo "   pm2 logs ecommerce-backend"
echo "   pm2 logs ecommerce-frontend"
echo ""
echo "🛑 Stop services:"
echo "   pm2 stop all"
echo ""
echo "🔄 Restart services:"
echo "   pm2 restart all"
echo ""
