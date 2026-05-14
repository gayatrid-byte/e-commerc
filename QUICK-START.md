# E-Commerce Application - Quick Start Guide (No Docker)

## ⚡ Quick Start - Local Development (3 steps)

### Step 1: Setup Project
```bash
cd ecommerce-app
chmod +x scripts/setup-local.sh
./scripts/setup-local.sh
```

### Step 2: Add MongoDB Atlas URI
```bash
# Get from https://www.mongodb.com/cloud/atlas
nano backend/.env

# Add this line:
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecommerce
```

### Step 3: Start Services
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

**Access Application**: http://localhost:3000

---

## ☁️ EC2 Deployment (3 steps)

### Step 1: Deploy on EC2
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

### Step 2: Configure MongoDB Atlas
```bash
# Get your MongoDB Atlas connection string from:
# https://www.mongodb.com/cloud/atlas → Connect → Connect your application

# Update MongoDB URI on EC2
chmod +x scripts/update-mongodb-uri.sh
./scripts/update-mongodb-uri.sh "mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/ecommerce"
```

### Step 3: Access Application
```
Frontend: http://your-ec2-public-ip:3000
Backend: http://your-ec2-public-ip:5000
```

---

## 🎯 Verify Everything is Working

```bash
# Check all containers are running
docker-compose ps

# Test backend API
curl http://localhost:5000/api/health

# View backend logs
docker-compose logs backend

# View MongoDB logs
docker-compose logs mongodb
```

---

## 🛑 Stop/Start Commands

```bash
# Stop all services
docker-compose down

# Start all services
docker-compose up -d

# Restart specific service
docker-compose restart backend

# View logs in real-time
docker-compose logs -f
```

---

## 📝 Environment Variables Reference

Place these in `.env` file in project root:

```env
# MongoDB Configuration (MOST IMPORTANT!)
MONGODB_URI=mongodb://mongodb:27017/ecommerce

# Server Configuration
PORT=5000
NODE_ENV=production

# URLs
FRONTEND_URL=http://localhost:3000
VITE_API_URL=http://localhost:5000
```

---

## 🚨 Troubleshooting

**Q: Backend not connecting to MongoDB**
```bash
# Check MongoDB logs
docker-compose logs mongodb

# Verify MONGODB_URI in .env
cat .env | grep MONGODB_URI

# Restart backend
docker-compose restart backend
```

**Q: Frontend showing "cannot connect to API"**
```bash
# Check VITE_API_URL in frontend/.env
cat frontend/.env

# Test API health
curl http://localhost:5000/api/health

# Restart frontend
docker-compose restart frontend
```

**Q: Port already in use**
```bash
# Kill process on port 5000
sudo lsof -ti:5000 | xargs kill -9

# Restart services
docker-compose restart
```

**Q: Permission denied on script**
```bash
chmod +x scripts/deploy-ec2.sh
./scripts/deploy-ec2.sh
```

---

## 📚 Full Documentation

- **README.md** - Complete documentation
- **EC2-DEPLOYMENT-GUIDE.md** - Detailed EC2 guide
- **PROJECT-SUMMARY.md** - Project overview

---

## 🎉 You're Ready!

1. **Local**: `docker-compose up -d` → http://localhost:3000
2. **EC2**: Run `./scripts/deploy-ec2.sh` → http://your-ec2-ip:3000
3. **Change DB**: Update `MONGODB_URI` in `.env` → Restart backend

---

**Need Help?** Check the full README.md or EC2-DEPLOYMENT-GUIDE.md
