# E-Commerce Application Configuration
# MongoDB Atlas + Node.js + React (No Docker)

## MongoDB Atlas Setup

### 1. Create MongoDB Atlas Account
- Visit: https://www.mongodb.com/cloud/atlas
- Sign up for free account
- Create a new project

### 2. Create a Cluster
- Click "Create" → Select Free Tier M0
- Choose your region (closest to your users)
- Wait for cluster to be created (~10 minutes)

### 3. Set Up Network & User
- Go to Network Access → Add IP Address
  - For development: Add 0.0.0.0/0 (allow all)
  - For production: Add your EC2 public IP only
- Go to Database Access → Add New Database User
  - Username: (choose a name)
  - Password: (generate secure password)
  - Built-in Role: atlasAdmin

### 4. Get Connection String
- Click "Connect" button on cluster
- Choose "Connect your application"
- Copy the connection string
- Replace `<password>` and `<username>` with your credentials

### Example Connection String
```
mongodb+srv://admin:mypassword123@cluster0.abc123def.mongodb.net/ecommerce?retryWrites=true&w=majority
```

## Environment Variables

### Backend (.env file)
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
PORT=5000
NODE_ENV=production
FRONTEND_URL=http://your-ec2-ip:3000
```

### Frontend (.env file)
```env
VITE_API_URL=http://your-ec2-ip:5000
```

## Local Development

### 1. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Create .env files
```bash
# Backend
cd backend
cp .env.example .env
# Edit .env and add your MongoDB Atlas URI

# Frontend
cd ../frontend
cp .env.example .env
```

### 3. Start Services
```bash
# Terminal 1 - Backend (port 5000)
cd backend
npm run dev

# Terminal 2 - Frontend (port 3000)
cd frontend
npm run dev
```

### 4. Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## EC2 Deployment

### 1. Launch EC2 Instance
- AMI: Ubuntu 22.04 LTS
- Instance Type: t2.micro (free tier) or t3.small
- Storage: 10 GB
- Security Group: Allow ports 22 (SSH), 80, 443, 3000, 5000

### 2. Connect & Deploy
```bash
# SSH to your EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Copy project to EC2
scp -i your-key.pem -r ecommerce-app ubuntu@your-ec2-ip:/home/ubuntu/

# SSH back and run deployment
ssh -i your-key.pem ubuntu@your-ec2-ip
cd /home/ubuntu/ecommerce-app
chmod +x scripts/deploy-ec2-no-docker.sh
./scripts/deploy-ec2-no-docker.sh
```

### 3. Configure MongoDB URI
```bash
cd /home/ubuntu/ecommerce-app
chmod +x scripts/update-mongodb-uri.sh
./scripts/update-mongodb-uri.sh "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority"
```

### 4. Access Application
```
Frontend: http://your-ec2-public-ip:3000
Backend: http://your-ec2-public-ip:5000
```

## Project Management (PM2)

PM2 automatically manages Node.js processes on EC2.

### View Logs
```bash
pm2 logs                           # All logs
pm2 logs ecommerce-backend         # Backend only
pm2 logs ecommerce-frontend        # Frontend only
```

### Control Services
```bash
pm2 list                           # Show all services
pm2 start ecommerce-backend        # Start backend
pm2 stop ecommerce-backend         # Stop backend
pm2 restart ecommerce-backend      # Restart backend
pm2 stop all                        # Stop all services
pm2 restart all                    # Restart all services
```

### Auto-restart on Server Reboot
```bash
pm2 save                           # Save process list
pm2 startup                        # Enable auto-start on reboot
```

## Important Security Notes

⚠️ **Production Security Checklist**
- [ ] Change default MongoDB credentials
- [ ] Add only your EC2 IP to MongoDB Atlas network access (not 0.0.0.0/0)
- [ ] Enable HTTPS/SSL certificate
- [ ] Use environment variables for all credentials
- [ ] Never commit .env file to git
- [ ] Enable firewall on EC2
- [ ] Set up regular MongoDB backups
- [ ] Monitor for suspicious activity

## Troubleshooting

### MongoDB Connection Failed
```bash
# Check .env file
cat /home/ubuntu/ecommerce-app/backend/.env | grep MONGODB_URI

# Verify credentials are correct
# Check MongoDB Atlas dashboard for:
# - User credentials
# - Network access IP whitelist
# - Cluster status (should be running)

# View backend logs
pm2 logs ecommerce-backend
```

### Frontend Can't Reach Backend
```bash
# Check VITE_API_URL
cat /home/ubuntu/ecommerce-app/frontend/.env

# Test API health
curl http://your-ec2-ip:5000/api/health

# Check if backend is running
pm2 list
```

### Port Already in Use
```bash
# Find process using port 5000
sudo lsof -i :5000

# Kill the process if needed
kill -9 <PID>

# Restart backend
pm2 restart ecommerce-backend
```

## Next Steps

1. ✅ Create MongoDB Atlas account and cluster
2. ✅ Deploy on EC2 using `deploy-ec2-no-docker.sh`
3. ✅ Update MongoDB URI using `update-mongodb-uri.sh`
4. ✅ Access application via browser
5. ✅ Customize products in MongoDB Atlas dashboard

---

For detailed information, see the main README.md file.
