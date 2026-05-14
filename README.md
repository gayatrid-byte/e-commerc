# E-Commerce Application - Complete Setup & Deployment Guide

## 📋 Project Overview

This is a full-stack MERN (MongoDB, Express.js, React, Node.js) e-commerce application designed for easy deployment on AWS EC2 instances. The application features:

- **Product Browsing**: Browse products with filtering and sorting
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout**: Simulated payment processing
- **Order Management**: Track orders and order history
- **Responsive Design**: Works on desktop and mobile devices
- **MongoDB Atlas Integration**: Cloud-hosted database (no Docker needed)
- **Direct Node.js Deployment**: Simple and lightweight

---

## 🚀 Quick Start (Choose One)

### Local Development - 3 Steps

```bash
# 1. Setup project
cd ecommerce-app
chmod +x scripts/setup-local.sh
./scripts/setup-local.sh

# 2. Add MongoDB Atlas connection string to backend/.env
nano backend/.env
# MONGODB_URI=mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/ecommerce

# 3. Start services in separate terminals
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev
```

**Access Application**: http://localhost:3000

---

### EC2 Deployment - 3 Steps

```bash
# 1. Copy and deploy on EC2
scp -i your-key.pem -r ecommerce-app ubuntu@your-ec2-ip:/home/ubuntu/
ssh -i your-key.pem ubuntu@your-ec2-ip
cd /home/ubuntu/ecommerce-app && chmod +x scripts/deploy-ec2-no-docker.sh && ./scripts/deploy-ec2-no-docker.sh

# 2. Update MongoDB URI
./scripts/update-mongodb-uri.sh "mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/ecommerce"

# 3. Access application
# Frontend: http://your-ec2-public-ip:3000
# Backend: http://your-ec2-public-ip:5000
```

---

## 📋 Prerequisites

- **Node.js 18+**: [Download](https://nodejs.org/)
- **npm**: Included with Node.js
- **MongoDB Atlas Account**: [Create Free Account](https://www.mongodb.com/cloud/atlas)
- **EC2 Instance** (for deployment): Optional
- **Git**: For version control

---

## 📁 Project Structure

```
ecommerce-app/
├── backend/                     # Node.js/Express API
│   ├── models/                  # MongoDB schemas
│   ├── routes/                  # API routes
│   ├── controllers/             # Business logic
│   ├── server.js                # Entry point
│   ├── package.json
│   └── .env.example
├── frontend/                    # React web application
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/               # Page components
│   │   ├── styles/              # CSS files
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
├── scripts/
│   ├── deploy-ec2-no-docker.sh  # EC2 deployment
│   ├── update-mongodb-uri.sh    # Update MongoDB URI
│   └── setup-local.sh           # Local setup
└── README.md
```

---

## ⚙️ Configuration

### Backend .env
```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=production

# Frontend Configuration
FRONTEND_URL=http://localhost:3000
```

### Frontend .env
```env
# Backend API URL
VITE_API_URL=http://localhost:5000
```

### MongoDB Atlas URI Examples

| Type | Connection String |
|------|------------------|
| **Local Dev** | `mongodb://localhost:27017/ecommerce` |
| **Atlas Cloud** | `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority` |

---

## 🛠️ Local Development Setup

### Step 1: Clone/Download Project
```bash
cd ecommerce-app
```

### Step 2: Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Step 3: Create Environment Files
```bash
# Backend
cd backend
cp .env.example .env
# Edit .env and add your MongoDB Atlas URI

# Frontend
cd ../frontend
cp .env.example .env
```

### Step 4: Start Services

**Terminal 1 - Backend**:
```bash
cd backend
npm run dev
# Backend runs on http://localhost:5000
```

**Terminal 2 - Frontend**:
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:3000
```

### Step 5: Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## ☁️ AWS EC2 Deployment

### Prerequisites
- EC2 instance (Ubuntu 22.04 LTS)
- SSH access to instance
- Security group allowing ports: 22, 80, 443, 3000, 5000

### Deployment Steps

#### 1. Copy Project to EC2
```bash
# From your local machine
scp -i your-key.pem -r ecommerce-app ubuntu@your-ec2-ip:/home/ubuntu/
```

#### 2. SSH into EC2 and Run Deployment
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip

# Run deployment script
cd /home/ubuntu/ecommerce-app
chmod +x scripts/deploy-ec2-no-docker.sh
./scripts/deploy-ec2-no-docker.sh
```

The script will:
- Update system packages
- Install Node.js 18
- Install PM2 (process manager)
- Install project dependencies
- Build frontend
- Start backend and frontend services
- Enable auto-start on reboot

#### 3. Configure MongoDB Atlas URI

```bash
chmod +x scripts/update-mongodb-uri.sh

./scripts/update-mongodb-uri.sh "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority"
```

#### 4. Access Your Application
```
Frontend: http://your-ec2-public-ip:3000
Backend API: http://your-ec2-public-ip:5000
Health Check: http://your-ec2-public-ip:5000/api/health
```

---

## 🗄️ MongoDB Atlas Setup

### Create Free MongoDB Atlas Account

1. **Sign Up**: https://www.mongodb.com/cloud/atlas
2. **Create Project**: Click "New Project"
3. **Create Cluster**: 
   - Select Free Tier (M0)
   - Choose your region (closest to users)
   - Wait 5-10 minutes for cluster creation
4. **Add Database User**:
   - Go to Database Access
   - Click "Add New Database User"
   - Create username and password
   - Built-in Role: atlasAdmin
5. **Network Access**:
   - Go to Network Access
   - Click "Add IP Address"
   - For development: 0.0.0.0/0 (allow all)
   - For production: Add only your EC2 public IP
6. **Get Connection String**:
   - Click Connect button
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password

### Connection String Format
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
```

---

## 📊 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Shopping Cart
- `GET /api/cart/:sessionId` - Get cart
- `POST /api/cart/:sessionId/add` - Add to cart
- `DELETE /api/cart/:sessionId/remove/:itemId` - Remove from cart
- `PUT /api/cart/:sessionId/update/:itemId` - Update quantity

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders/checkout` - Create order
- `GET /api/orders/email/:email` - Get orders by email
- `PUT /api/orders/:id/status` - Update order status

### Health Check
- `GET /api/health` - API status

---

## 🔧 PM2 Process Management (EC2)

### View Services
```bash
pm2 list                              # Show all services
pm2 status                            # Show status
pm2 monit                             # Monitor resources
```

### View Logs
```bash
pm2 logs                              # All logs
pm2 logs ecommerce-backend            # Backend logs
pm2 logs ecommerce-frontend           # Frontend logs
pm2 logs --lines 100                  # Last 100 lines
pm2 logs --follow                     # Follow in real-time
```

### Control Services
```bash
pm2 start ecommerce-backend           # Start service
pm2 stop ecommerce-backend            # Stop service
pm2 restart ecommerce-backend         # Restart service
pm2 reload ecommerce-backend          # Zero-downtime reload
pm2 delete ecommerce-backend          # Delete service

pm2 stop all                          # Stop all services
pm2 restart all                       # Restart all services
```

### Auto-Start on Reboot
```bash
pm2 save                              # Save current process list
pm2 startup                           # Enable auto-start
# Output will show a command to run with sudo
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup...
```

---

## 🆘 Troubleshooting

### MongoDB Connection Failed

```bash
# Check MongoDB URI in .env
cat backend/.env | grep MONGODB_URI

# Verify MongoDB Atlas:
# 1. Cluster is running: https://cloud.mongodb.com/v2
# 2. Network access allows your IP
# 3. Database user credentials are correct
# 4. Password has no special characters (or is URL-encoded)

# View backend logs
pm2 logs ecommerce-backend
```

### Frontend Can't Connect to Backend

```bash
# Check backend is running
curl http://localhost:5000/api/health

# Check VITE_API_URL in frontend/.env
cat frontend/.env

# Verify CORS - Check backend logs
pm2 logs ecommerce-backend
```

### Services Not Running on EC2

```bash
# Check service status
pm2 list

# If services are down, restart them
pm2 restart all

# Check resource usage
pm2 monit

# View full logs
pm2 logs --follow
```

### Port Already in Use

```bash
# Find process on port 5000
sudo lsof -i :5000

# Kill process if needed
kill -9 <PID>

# Or change PORT in backend/.env and restart
```

---

## 🔒 Security Best Practices

### Development
- [ ] Keep .env files private (add to .gitignore)
- [ ] Use strong MongoDB passwords
- [ ] Don't commit credentials to git

### Production (EC2)
- [ ] Change default MongoDB credentials
- [ ] Whitelist only your EC2 IP in MongoDB Atlas
- [ ] Enable HTTPS/SSL certificate
- [ ] Use AWS Security Groups properly
- [ ] Enable firewall on EC2
- [ ] Set up regular backups
- [ ] Use environment variables for all secrets
- [ ] Monitor logs regularly
- [ ] Keep software updated

---

## 📊 Sample Data

The application includes 8 sample products:

- Wireless Headphones - $129.99
- Laptop Backpack - $49.99
- Cotton T-Shirt - $24.99
- Running Shoes - $89.99
- JavaScript Book - $39.99
- Smart Watch - $199.99
- Coffee Maker - $59.99
- Yoga Mat - $34.99

To add custom products, use MongoDB Atlas web interface or API.

---

## 🎯 Next Steps

### Enhancements
- [ ] Add user authentication
- [ ] Integrate real payment gateway
- [ ] Set up email notifications
- [ ] Add product search
- [ ] Enable customer reviews
- [ ] Create admin dashboard

### Deployment Improvements
- [ ] Set up CI/CD pipeline
- [ ] Enable auto-scaling
- [ ] Configure load balancing
- [ ] Set up CloudWatch monitoring
- [ ] Enable automated backups

---

## 📞 Support Resources

- **Node.js Docs**: https://nodejs.org/docs/
- **Express.js Docs**: https://expressjs.com/
- **React Docs**: https://react.dev/
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **PM2 Docs**: https://pm2.keymetrics.io/

---

## 📝 License

This project is provided as-is for educational and demonstration purposes.

---

**Version**: 2.0.0 (No Docker)  
**Last Updated**: May 2026  
**Status**: Production Ready

### Local Development Setup

#### 1. Clone/Setup the Project

```bash
cd ecommerce-app
```

#### 2. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

#### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

#### 4. Create Environment Files

**Backend (.env)**
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/ecommerce
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env)**
```bash
cd ../frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000
```

#### 5. Start MongoDB Locally

```bash
# Using Docker
docker run -d -p 27017:27017 --name ecommerce-mongodb mongo:6.0
```

#### 6. Start Backend Server

```bash
cd backend
npm run dev
```

Backend will be available at: `http://localhost:5000`

#### 7. Start Frontend Development Server

In a new terminal:
```bash
cd frontend
npm run dev
```

Frontend will be available at: `http://localhost:3000`

---

## 🐳 Docker Deployment (Local)

### Using Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Access the Application:**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

**View Container Status:**
```bash
docker-compose ps
```

---

## ☁️ AWS EC2 Deployment

### Step 1: Prepare EC2 Instance

1. **Launch EC2 Instance**
   - AMI: Ubuntu 22.04 LTS
   - Instance Type: t3.medium (minimum)
   - Security Group: Allow ports 80, 443, 3000, 5000, 27017 (27017 only for internal)
   - Storage: 20 GB minimum

2. **Connect to Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

### Step 2: Copy Application Files

```bash
# From your local machine
scp -i your-key.pem -r ecommerce-app ubuntu@your-ec2-ip:/home/ubuntu/
```

### Step 3: Run Deployment Script

```bash
# Connect to EC2
ssh -i your-key.pem ubuntu@your-ec2-ip

# Make deployment script executable
chmod +x /home/ubuntu/ecommerce-app/scripts/deploy-ec2.sh

# Run deployment script
cd /home/ubuntu/ecommerce-app
./scripts/deploy-ec2.sh
```

### Step 4: Configure MongoDB URI (Most Important!)

The deployment automatically creates a `.env` file with the default MongoDB URI. **To change the MongoDB connection:**

```bash
# Option 1: Edit .env file directly
nano /home/ubuntu/ecommerce-app/.env

# Update MONGODB_URI to your database:
MONGODB_URI=mongodb://username:password@your-mongodb-host:27017/ecommerce
```

```bash
# Option 2: Use update script
./scripts/update-app.sh "mongodb://new-mongo-uri:27017/ecommerce"
```

**After updating MongoDB URI:**
```bash
# Restart containers to apply changes
docker-compose restart

# Verify backend health
curl http://localhost:5000/api/health
```

---

## 📝 Environment Variables Reference

### Backend Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| MONGODB_URI | mongodb://mongodb:27017/ecommerce | MongoDB connection string |
| PORT | 5000 | Backend server port |
| NODE_ENV | production | Environment mode |
| FRONTEND_URL | http://localhost:3000 | Frontend URL for CORS |

### Frontend Configuration

| Variable | Default | Description |
| VITE_API_URL | http://localhost:5000 | Backend API URL |

---

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `GET /api/products/categories` - Get product categories
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Shopping Cart
- `GET /api/cart/:sessionId` - Get cart
- `POST /api/cart/:sessionId/add` - Add to cart
- `DELETE /api/cart/:sessionId/remove/:itemId` - Remove from cart
- `PUT /api/cart/:sessionId/update/:itemId` - Update quantity
- `DELETE /api/cart/:sessionId/clear` - Clear cart

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders/checkout` - Create order (checkout)
- `PUT /api/orders/:id/status` - Update order status
- `GET /api/orders/email/:email` - Get orders by email

### Health Check
- `GET /api/health` - API health status

---

## 🔧 Management Commands

### View Application Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### Restart Services

```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart backend
```

### Stop Application

```bash
docker-compose down
```

### Remove All Data

```bash
docker-compose down -v  # -v removes volumes including database
```

---

## 💾 Database Backup & Restore

### Create Backup

```bash
chmod +x /home/ubuntu/ecommerce-app/scripts/backup-db.sh
./scripts/backup-db.sh

# Backup saved to: ./backups/ecommerce_backup_*.gz
```

### Restore from Backup

```bash
chmod +x /home/ubuntu/ecommerce-app/scripts/restore-db.sh
./scripts/restore-db.sh ./backups/ecommerce_backup_*.gz
```

---

## 📊 Database Initialization

The application automatically initializes the MongoDB database with sample products on first run:

- **Products**: 8 sample products across different categories
- **Collections Created**:
  - `products` - Product catalog
  - `orders` - Order history
  - `carts` - Shopping carts

To manually initialize or reset the database:

```bash
docker-compose down -v
docker-compose up -d
# Database will be reinitialized with sample data
```

---

## 🌐 Access the Application

### Local Development
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### EC2 Deployment
- Frontend: http://your-ec2-ip:3000
- Backend API: http://your-ec2-ip:5000

---

## 🔍 Troubleshooting

### Backend Not Connecting to MongoDB

```bash
# Check if MongoDB is running
docker-compose ps

# Verify MongoDB URI in backend/.env
cat backend/.env | grep MONGODB_URI

# Restart backend with updated URI
docker-compose restart backend

# Check logs
docker-compose logs backend
```

### Frontend Cannot Connect to Backend

1. Verify backend URL in `frontend/.env`
2. Check if backend is running: `curl http://localhost:5000/api/health`
3. Verify CORS settings in `backend/server.js`
4. Restart frontend: `docker-compose restart frontend`

### Port Already in Use

```bash
# Kill process on port (example: 5000)
sudo lsof -ti:5000 | xargs kill -9

# Change port in docker-compose.yml if needed
```

### Database Not Initialized

```bash
# Remove and recreate containers
docker-compose down -v
docker-compose up -d
sleep 30
# Check logs for initialization
docker-compose logs mongodb
```

---

## 📦 Updating the Application

### Update after Code Changes

```bash
# Pull latest code (if using git)
cd /home/ubuntu/ecommerce-app
git pull origin main

# Rebuild and restart
./scripts/update-app.sh

# Or manually:
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Change MongoDB Connection

```bash
cd /home/ubuntu/ecommerce-app

# Edit .env file
nano .env
# Update MONGODB_URI line

# Restart backend
docker-compose restart backend
```

---

## 🔐 Production Considerations

### Security
- Change default MongoDB credentials
- Use environment secrets for sensitive data
- Enable HTTPS/SSL certificates
- Implement authentication for admin endpoints
- Rate limiting on API endpoints
- Input validation and sanitization

### Performance
- Enable caching headers
- Use CDN for static assets
- Database indexing
- Load balancing for multiple instances
- Database connection pooling

### Monitoring
- Set up CloudWatch logs
- Monitor container health
- Database backup automation
- Alert on high resource usage

---

## 📚 Project Structure

```
ecommerce-app/
├── backend/
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── controllers/         # Route handlers
│   ├── middleware/          # Custom middleware
│   ├── server.js            # Express server
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── styles/          # CSS files
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
├── scripts/                 # Deployment & management scripts
├── docker-compose.yml       # Docker services
├── Dockerfile.backend
├── Dockerfile.frontend
├── nginx.conf              # Nginx configuration
└── README.md
```

---

## 🆘 Getting Help

For issues or questions:

1. Check the logs: `docker-compose logs -f`
2. Verify environment variables: `cat .env`
3. Test API: `curl http://localhost:5000/api/health`
4. Check container status: `docker-compose ps`

---

## 📝 License

This project is provided as-is for educational and demonstration purposes.

---

## 🎯 Next Steps

1. Customize product data in `init-db.js`
2. Add user authentication
3. Integrate with real payment gateway
4. Set up email notifications
5. Configure CloudFront CDN
6. Set up RDS for managed database
7. Implement monitoring and logging

---

**Last Updated**: May 2024
**Version**: 1.0.0
