# E-Commerce Application - EC2 Deployment Guide (No Docker)

## 🎯 Quick Overview

This guide covers deploying a Node.js + React application with MongoDB Atlas on AWS EC2. **No Docker needed!**

---

## 📋 Prerequisites

- EC2 instance running Ubuntu 22.04 LTS
- Security group allows ports: 22, 80, 443, 3000, 5000
- MongoDB Atlas account (free tier available)
- SSH access to your EC2 instance

---

## ⚡ One-Command Deployment

```bash
# 1. Copy project to EC2
scp -i your-key.pem -r ecommerce-app ubuntu@your-ec2-ip:/home/ubuntu/

# 2. SSH to EC2
ssh -i your-key.pem ubuntu@your-ec2-ip

# 3. Deploy (this installs Node.js, PM2, and starts services)
cd /home/ubuntu/ecommerce-app
chmod +x scripts/deploy-ec2-no-docker.sh
./scripts/deploy-ec2-no-docker.sh

# 4. Update MongoDB URI
./scripts/update-mongodb-uri.sh "mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/ecommerce"
```

**Your application is now running at**:
```
Frontend: http://your-ec2-public-ip:3000
Backend: http://your-ec2-public-ip:5000
```

---

## 📝 Detailed Setup Steps

### Step 1: Prepare EC2 Instance

1. Launch Ubuntu 22.04 LTS instance
2. Create/import SSH key pair
3. Configure Security Group:
   - SSH (22): From your IP
   - HTTP (80): From 0.0.0.0/0
   - HTTPS (443): From 0.0.0.0/0
   - Port 3000: From 0.0.0.0/0 (optional)
   - Port 5000: From 0.0.0.0/0 (optional)

### Step 2: Copy Project Files

From your local machine:
```bash
scp -i your-key.pem -r ecommerce-app ubuntu@your-ec2-public-ip:/home/ubuntu/
```

### Step 3: SSH into EC2

```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

### Step 4: Run Deployment Script

```bash
cd /home/ubuntu/ecommerce-app
chmod +x scripts/deploy-ec2-no-docker.sh
./scripts/deploy-ec2-no-docker.sh
```

**The script will**:
- Update system packages
- Install Node.js 18
- Install PM2 (process manager)
- Install backend & frontend dependencies
- Build React frontend
- Start backend on port 5000
- Start frontend on port 3000
- Enable auto-start on server reboot

### Step 5: Configure MongoDB Atlas

#### Create MongoDB Atlas Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up / Log in
3. Create new project
4. Create cluster:
   - Free tier (M0)
   - Select region closest to your users
   - Wait for cluster to be created

#### Add Database User

1. Go to "Database Access"
2. Click "Add New Database User"
3. Create username and password
4. Built-in Role: Select "atlasAdmin"

#### Configure Network Access

1. Go to "Network Access"
2. Click "Add IP Address"
3. For development: 0.0.0.0/0 (allow all)
4. For production: Add only your EC2 public IP

#### Get Connection String

1. Click "Connect" on your cluster
2. Select "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database password

**Example**:
```
mongodb+srv://admin:mypassword123@cluster0.abcd1234.mongodb.net/ecommerce?retryWrites=true&w=majority
```

### Step 6: Update MongoDB URI on EC2

```bash
cd /home/ubuntu/ecommerce-app

chmod +x scripts/update-mongodb-uri.sh

./scripts/update-mongodb-uri.sh "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority"
```

**Verify the update**:
```bash
pm2 logs ecommerce-backend
```

Should see: "✓ MongoDB Connected Successfully"

---

## 🎯 Access Your Application

After deployment:

```
Frontend (React Web UI): http://your-ec2-public-ip:3000
Backend API: http://your-ec2-public-ip:5000
Health Check: curl http://your-ec2-public-ip:5000/api/health
```

---

## 🔧 Managing Services on EC2

### View All Services
```bash
pm2 list
pm2 status
```

### View Logs
```bash
pm2 logs                          # All logs
pm2 logs ecommerce-backend        # Backend only
pm2 logs ecommerce-frontend       # Frontend only
pm2 logs --lines 50 --follow      # Last 50 lines, follow in real-time
```

### Control Services
```bash
pm2 start ecommerce-backend       # Start backend
pm2 stop ecommerce-backend        # Stop backend
pm2 restart ecommerce-backend     # Restart backend
pm2 restart all                   # Restart all services
pm2 stop all                      # Stop all services
```

### Auto-Start on Server Reboot
```bash
pm2 save                          # Save current process list
pm2 startup                       # Show startup command
# Copy and run the command output by pm2 startup
```

---

## 📊 Environment Configuration

### Backend .env File
```
/home/ubuntu/ecommerce-app/backend/.env
```

Content:
```env
MONGODB_URI=mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
PORT=5000
NODE_ENV=production
FRONTEND_URL=http://your-ec2-public-ip:3000
```

### Frontend .env File
```
/home/ubuntu/ecommerce-app/frontend/.env
```

Content:
```env
VITE_API_URL=http://your-ec2-public-ip:5000
```

### Update MongoDB URI

Edit the .env file directly:
```bash
nano /home/ubuntu/ecommerce-app/backend/.env

# Update MONGODB_URI line
# Press Ctrl+O to save, Ctrl+X to exit

# Restart backend
pm2 restart ecommerce-backend
```

Or use the update script:
```bash
./scripts/update-mongodb-uri.sh "your-new-mongodb-uri"
```

---

## 🆘 Troubleshooting

### MongoDB Connection Issues

**Problem**: Backend can't connect to MongoDB
```bash
# Check MongoDB URI
cat /home/ubuntu/ecommerce-app/backend/.env | grep MONGODB_URI

# Verify MongoDB Atlas:
# 1. Cluster is running: https://cloud.mongodb.com/v2
# 2. Network access whitelisted: https://cloud.mongodb.com/v2/xxx#security/network/accessList
# 3. Database user credentials correct
# 4. Password doesn't contain special chars (or is URL-encoded)

# View backend logs for errors
pm2 logs ecommerce-backend --lines 100

# Restart backend after fixing
pm2 restart ecommerce-backend
```

### Frontend Can't Reach Backend

**Problem**: Frontend shows "cannot connect to API"
```bash
# Check if backend is running
pm2 list

# Test API health
curl http://localhost:5000/api/health

# Check VITE_API_URL in frontend .env
cat /home/ubuntu/ecommerce-app/frontend/.env

# Rebuild and restart frontend
cd /home/ubuntu/ecommerce-app/frontend
npm run build
pm2 restart ecommerce-frontend
```

### Port Already in Use

**Problem**: "Port 5000 already in use"
```bash
# Find process using port 5000
sudo lsof -i :5000

# Kill the process
kill -9 <PID>

# Restart services
pm2 restart all
```

### Services Won't Start

**Problem**: Services don't start after deployment
```bash
# Check logs
pm2 logs

# Check disk space
df -h

# Check RAM usage
free -h

# Check if Node.js installed correctly
node --version
npm --version

# Try installing dependencies again
cd /home/ubuntu/ecommerce-app/backend && npm install
cd /home/ubuntu/ecommerce-app/frontend && npm install

# Restart services
pm2 restart all
```

---

## 🔒 Security Configuration

### Production Checklist

- [ ] Change MongoDB credentials from default
- [ ] Whitelist only your EC2 IP in MongoDB Atlas Network Access
- [ ] Configure EC2 Security Group properly
- [ ] Set NODE_ENV=production in backend
- [ ] Use strong passwords
- [ ] Enable HTTPS/SSL (use Let's Encrypt)
- [ ] Set up CloudWatch monitoring
- [ ] Enable database backups
- [ ] Keep system updated

### Firewall Setup (Optional)

```bash
sudo ufw enable
sudo ufw allow 22/tcp      # SSH
sudo ufw allow 80/tcp      # HTTP
sudo ufw allow 443/tcp     # HTTPS
sudo ufw allow 3000/tcp    # Frontend (optional)
sudo ufw allow 5000/tcp    # Backend (optional)
```

---

## 📈 Performance Monitoring

### Check Resource Usage

```bash
# Real-time monitoring
pm2 monit

# Check CPU and memory
top -bn1 | head -20

# Check disk space
df -h

# Check network connections
netstat -tulpn | grep LISTEN
```

---

## 🔄 Updating Application

### Update Code

```bash
cd /home/ubuntu/ecommerce-app

# If using git
git pull origin main

# Rebuild frontend
cd frontend && npm run build

# Restart services
pm2 restart all
```

### Update Dependencies

```bash
cd /home/ubuntu/ecommerce-app/backend
npm update

cd ../frontend
npm update

# Rebuild and restart
npm run build
pm2 restart all
```

### Update MongoDB URI

```bash
./scripts/update-mongodb-uri.sh "mongodb+srv://new-user:password@cluster0.xxxxx.mongodb.net/ecommerce"
```

---

## 💾 Backup & Maintenance

### Backup Application Files

```bash
cd /home/ubuntu
tar -czf ecommerce-app-backup-$(date +%Y%m%d).tar.gz ecommerce-app/
```

### Backup MongoDB Data (MongoDB Atlas)

MongoDB Atlas automatically backs up your data. Download from Atlas dashboard:
1. Go to https://cloud.mongodb.com/v2
2. Select cluster
3. Go to Backup tab
4. Download snapshot

### Monitor Logs Regularly

```bash
# View application logs
pm2 logs --lines 100 | tail -50

# Check for errors
pm2 logs ecommerce-backend | grep -i error
```

---

## 📞 Common Commands Reference

```bash
# SSH to EC2
ssh -i your-key.pem ubuntu@your-ec2-public-ip

# Navigate to project
cd /home/ubuntu/ecommerce-app

# View services
pm2 list
pm2 status

# View logs
pm2 logs
pm2 logs ecommerce-backend --follow

# Restart services
pm2 restart all
pm2 restart ecommerce-backend

# Stop services
pm2 stop all

# Start services
pm2 start all

# Update MongoDB URI
./scripts/update-mongodb-uri.sh "your-mongodb-uri"

# Check disk space
df -h

# Check resource usage
pm2 monit
```

---

## 🚀 Next Steps After Deployment

1. ✅ Verify application is running
2. ✅ Test products load from database
3. ✅ Try adding items to cart
4. ✅ Complete a test purchase
5. ✅ Set up monitoring/logging
6. ✅ Configure automated backups
7. ✅ Set up domain name (Route 53)
8. ✅ Configure SSL/HTTPS (ACM)

---

For more details, see the main **README.md** file.

---

**Version**: 2.0.0 (No Docker)  
**Updated**: May 2026

## Quick Commands

### View Application Status
```bash
docker-compose ps
```

### View Logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### Restart All Services
```bash
docker-compose restart
```

### Restart Specific Service
```bash
docker-compose restart backend
```

### Stop Application
```bash
docker-compose down
```

### Start Application
```bash
docker-compose up -d
```

### Test API Health
```bash
curl http://localhost:5000/api/health
```

## Accessing the Application

### After Deployment
```
Frontend: http://your-ec2-public-ip:3000
Backend API: http://your-ec2-public-ip:5000
```

### Test Products Endpoint
```bash
curl http://your-ec2-public-ip:5000/api/products
```

## Environment File Editing

### View Current Configuration
```bash
cat .env
```

### Edit Configuration
```bash
nano .env
# Make changes, save with Ctrl+O, Enter, Ctrl+X
```

### Apply Changes
```bash
docker-compose restart backend
```

## Database Backup

### Create Backup
```bash
./scripts/backup-db.sh
```

### Restore Backup
```bash
./scripts/restore-db.sh ./backups/ecommerce_backup_YYYYMMDD_HHMMSS.gz
```

## Security

### SSH into Container
```bash
docker exec -it ecommerce-backend sh
```

### Check Container Resource Usage
```bash
docker stats
```

### View Container IP Address
```bash
docker inspect ecommerce-backend | grep IPAddress
```

## Troubleshooting

### MongoDB Connection Issues
```bash
# Check backend logs for MongoDB errors
docker-compose logs backend | grep -i mongodb

# Verify MongoDB is running
docker-compose ps mongodb

# Test MongoDB connection
docker exec ecommerce-mongodb mongosh -u admin -p
```

### Backend Not Responding
```bash
# Check if process is running
docker-compose ps backend

# View detailed logs
docker-compose logs -f backend --tail=100

# Restart backend
docker-compose restart backend
```

### Frontend Not Loading
```bash
# Check Nginx logs
docker-compose logs frontend

# Verify frontend is running
curl http://localhost/
```

### Port Conflicts
```bash
# Find what's using port 3000
lsof -i :3000

# Find what's using port 5000
lsof -i :5000

# Kill process if needed
kill -9 <PID>
```

## Update Application Code

### If Using Git
```bash
cd /home/ubuntu/ecommerce-app
git pull origin main
docker-compose restart
```

### If Using Manual Updates
```bash
# Copy new files and rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## Performance Optimization

### Increase Container Resources
Edit `docker-compose.yml` and add:
```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

### Scale Services
```bash
docker-compose up -d --scale backend=3
```

## Monitoring

### Real-time Resource Usage
```bash
docker stats --no-stream
```

### Check System Resources
```bash
free -h
df -h
top -bn1 | head -20
```

### Check Open Ports
```bash
netstat -tulpn | grep LISTEN
```

## Development vs Production

### Development Setup
```bash
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ecommerce
```

### Production Setup
```bash
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ecommerce
```

---

**For detailed documentation, see README.md**
