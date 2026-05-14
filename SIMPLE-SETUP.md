# E-Commerce Application - Simplified Setup (No Docker)

## 🎯 What You Need

1. **Node.js 18+** (installed on your machine/EC2)
2. **MongoDB Atlas account** (free tier available)
3. **EC2 instance** (optional, for deployment)
4. **Text editor** (VS Code recommended)

---

## ⚡ Quick Start (Local Development)

### Step 1: Setup Project

```bash
cd ecommerce-app
chmod +x scripts/setup-local.sh
./scripts/setup-local.sh
```

### Step 2: Configure MongoDB Atlas

Go to https://www.mongodb.com/cloud/atlas and:
1. Create free account
2. Create new cluster (M0 free tier)
3. Add database user
4. Whitelist your IP: Network Access → 0.0.0.0/0
5. Get connection string: Connect → Connect your application

### Step 3: Add MongoDB URI

```bash
# Backend .env
cd backend
echo "MONGODB_URI=mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/ecommerce" >> .env

# Frontend .env
cd ../frontend
echo "VITE_API_URL=http://localhost:5000" > .env
```

### Step 4: Start Services

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend (wait 5 seconds first)
cd frontend
npm run dev
```

### Access Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

---

## ☁️ EC2 Deployment (5 minutes)

### Step 1: Launch EC2 Instance

- **OS**: Ubuntu 22.04 LTS
- **Type**: t2.micro (free) or t3.small (recommended)
- **Storage**: 10 GB
- **Security Group**: Open ports 22, 80, 443, 3000, 5000

### Step 2: Deploy Application

```bash
# From your local machine
scp -i your-key.pem -r ecommerce-app ubuntu@your-ec2-ip:/home/ubuntu/

# SSH to EC2
ssh -i your-key.pem ubuntu@your-ec2-ip

# Run deployment
cd /home/ubuntu/ecommerce-app
chmod +x scripts/deploy-ec2-no-docker.sh
./scripts/deploy-ec2-no-docker.sh
```

### Step 3: Update MongoDB URI

```bash
chmod +x scripts/update-mongodb-uri.sh
./scripts/update-mongodb-uri.sh "mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority"
```

### Step 4: Access Your Application

```
Frontend: http://your-ec2-public-ip:3000
Backend API: http://your-ec2-public-ip:5000
```

---

## 📝 Configuration

### Backend .env
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecommerce
PORT=5000
NODE_ENV=production
FRONTEND_URL=http://your-ec2-ip:3000
```

### Frontend .env
```env
VITE_API_URL=http://your-ec2-ip:5000
```

---

## 🔧 Common Commands

### Local Development
```bash
# Start backend
cd backend && npm run dev

# Start frontend
cd frontend && npm run dev

# Test API
curl http://localhost:5000/api/health
```

### EC2 Management (via PM2)
```bash
# View processes
pm2 list

# View logs
pm2 logs

# Restart services
pm2 restart all

# Stop services
pm2 stop all

# View specific service logs
pm2 logs ecommerce-backend
```

### Update MongoDB URI
```bash
# On EC2
./scripts/update-mongodb-uri.sh "your-new-uri"
```

---

## ✅ Verify Everything Works

### Local Development
```bash
# Backend running on 5000?
curl http://localhost:5000/api/health

# Frontend accessible on 3000?
curl http://localhost:3000

# Products loading from database?
curl http://localhost:5000/api/products | head -50
```

### EC2 Deployment
```bash
# Check services
pm2 list

# Backend health
curl http://your-ec2-ip:5000/api/health

# View logs
pm2 logs ecommerce-backend
```

---

## 📁 Project Structure

```
ecommerce-app/
├── backend/                    # Node.js/Express API
│   ├── models/                 # MongoDB schemas
│   ├── routes/                 # API routes
│   ├── controllers/            # Business logic
│   ├── server.js               # Entry point
│   └── .env.example
├── frontend/                   # React web app
│   ├── src/
│   │   ├── components/
│   │   ├── styles/
│   │   └── App.jsx
│   └── .env.example
├── scripts/
│   ├── deploy-ec2-no-docker.sh # EC2 deployment
│   ├── update-mongodb-uri.sh   # Update MongoDB
│   └── setup-local.sh          # Local setup
└── README.md
```

---

## 🆘 Troubleshooting

### MongoDB Connection Error
```bash
# Check MongoDB URI
cat backend/.env | grep MONGODB_URI

# Verify MongoDB Atlas cluster is running
# Visit: mongodb.com/cloud/atlas → Check cluster status

# Check network access on MongoDB Atlas
# Whitelist your IP: https://cloud.mongodb.com/v2/xxx#security/network/accessList
```

### Frontend Can't Reach Backend
```bash
# Verify backend is running
curl http://localhost:5000/api/health

# Check VITE_API_URL in frontend/.env
cat frontend/.env

# Restart frontend
npm run dev
```

### Port Already in Use
```bash
# Kill process on port 5000
sudo lsof -ti:5000 | xargs kill -9

# Or change port in backend/server.js
```

---

## 🚀 Next Steps

1. ✅ Create MongoDB Atlas account (free)
2. ✅ Deploy application (local or EC2)
3. ✅ Configure MongoDB URI
4. ✅ Start using the application
5. ✅ Customize products in MongoDB Atlas

---

**For detailed documentation, see README.md and MONGODB-ATLAS-SETUP.md**

---

**Quick Links**:
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Node.js: https://nodejs.org/
- Express.js: https://expressjs.com/
- React: https://react.dev/
