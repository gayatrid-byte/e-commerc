#!/bin/bash

# E-Commerce Application - Update MongoDB URI (No Docker)
# Updates the MongoDB Atlas connection string and restarts services

set -e

if [ -z "$1" ]; then
    echo "❌ Usage: $0 'mongodb+srv://username:password@cluster.xxxxx.mongodb.net/ecommerce'"
    echo ""
    echo "Example:"
    echo "  $0 'mongodb+srv://user:pass@cluster0.abcd1234.mongodb.net/ecommerce?retryWrites=true&w=majority'"
    exit 1
fi

echo "🔄 Updating MongoDB URI..."
echo "New URI: $1"

# Update .env file
sed -i "s|MONGODB_URI=.*|MONGODB_URI=$1|g" /home/ubuntu/ecommerce-app/backend/.env
sed -i "s|MONGODB_URI=.*|MONGODB_URI=$1|g" /home/ubuntu/ecommerce-app/.env.production

echo "✅ MongoDB URI updated in configuration files"

# Restart backend service
echo ""
echo "🔄 Restarting Backend Service..."
pm2 restart ecommerce-backend

# Wait for restart
sleep 3

# Check status
echo ""
echo "📊 Service Status:"
pm2 list

# Test connection
echo ""
echo "🧪 Testing API connection..."
sleep 2
curl -s http://localhost:5000/api/health || echo "⚠️ Still connecting to database..."

echo ""
echo "✅ Update Complete!"
echo "If API still not responding, check logs with: pm2 logs ecommerce-backend"
