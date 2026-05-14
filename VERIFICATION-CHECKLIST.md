# E-Commerce Application - Installation & Verification Checklist

## ✅ Pre-Deployment Checklist

### Before Starting Deployment

- [ ] EC2 instance created and running
- [ ] Security group configured (ports 80, 443, 3000, 5000 open)
- [ ] SSH key pair created and accessible
- [ ] Connected to EC2 via SSH successfully
- [ ] Internet connectivity confirmed
- [ ] Sufficient storage space (20 GB minimum)

---

## ✅ Local Development Checklist

### Prerequisites Installed

- [ ] Docker installed (`docker --version`)
- [ ] Docker Compose installed (`docker-compose --version`)
- [ ] Git installed (`git --version`)
- [ ] Node.js v18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)

### Clone/Setup Project

- [ ] Project downloaded/cloned
- [ ] Navigated to project directory
- [ ] File structure verified (backend/, frontend/, scripts/)

---

## ✅ Backend Setup Verification

### Backend Initialization

```bash
# Navigate to backend
cd backend

# Check package.json exists
ls -la package.json

# Dependencies installed
npm install

# Verify key dependencies
npm list express mongoose cors dotenv

# Check .env file
cat .env.example

cd ..
```

### Verification Steps

- [ ] `backend/package.json` exists
- [ ] `backend/server.js` exists
- [ ] `backend/models/` contains Product.js, Order.js, Cart.js
- [ ] `backend/routes/` contains products.js, orders.js, cart.js
- [ ] `backend/controllers/` contains all controller files
- [ ] `npm install` completed successfully
- [ ] No error messages during installation

---

## ✅ Frontend Setup Verification

### Frontend Initialization

```bash
# Navigate to frontend
cd frontend

# Check package.json exists
ls -la package.json

# Dependencies installed
npm install

# Verify key dependencies
npm list react react-dom axios vite

# Check structure
ls -la src/components/
ls -la src/styles/

cd ..
```

### Verification Steps

- [ ] `frontend/package.json` exists
- [ ] `frontend/src/App.jsx` exists
- [ ] `frontend/src/main.jsx` exists
- [ ] Components directory has all 4 components
- [ ] Styles directory has all CSS files
- [ ] `npm install` completed successfully
- [ ] No error messages during installation

---

## ✅ Docker Setup Verification

### Docker Installation

```bash
# Verify Docker
docker --version
docker run hello-world

# Verify Docker Compose
docker-compose --version

# Check for Docker daemon issues
docker ps
```

### Verification Steps

- [ ] Docker installed and running
- [ ] Docker Compose installed
- [ ] `docker ps` returns container list (may be empty)
- [ ] No permission denied errors (run with sudo if needed)

### Docker Image Files

- [ ] `Dockerfile.backend` exists
- [ ] `Dockerfile.frontend` exists
- [ ] `docker-compose.yml` exists
- [ ] `nginx.conf` exists
- [ ] `init-db.js` exists (MongoDB initialization)

---

## ✅ Environment Configuration Verification

### Create .env Files

```bash
# Root .env
cp .env.example .env

# Backend .env
cp backend/.env.example backend/.env

# Frontend .env
cp frontend/.env.example frontend/.env
```

### Verify Configuration

```bash
# Check root .env
cat .env | grep MONGODB_URI

# Check backend .env
cat backend/.env | grep MONGODB_URI

# Check frontend .env
cat frontend/.env | grep VITE_API_URL
```

### Verification Steps

- [ ] Root `.env` created from `.env.example`
- [ ] Backend `.env` created from `.env.example`
- [ ] Frontend `.env` created from `.env.example`
- [ ] MONGODB_URI is set in root `.env`
- [ ] MONGODB_URI is set in backend `.env`
- [ ] VITE_API_URL is set in frontend `.env`
- [ ] All files have correct permissions (readable)

---

## ✅ Local Docker Deployment Verification

### Start Services

```bash
# Build and start containers
docker-compose up -d

# Wait for initialization
sleep 30

# Check status
docker-compose ps
```

### Verify All Containers Running

```bash
# List running containers
docker-compose ps

# Should show 4 containers:
# - mongodb
# - backend
# - frontend
# - nginx (if configured)
```

### Verification Steps

- [ ] `docker-compose up -d` completed without errors
- [ ] MongoDB container is running
- [ ] Backend container is running
- [ ] Frontend container is running
- [ ] `docker-compose ps` shows all containers as "Up"

---

## ✅ Backend Health Check

### Test API Connection

```bash
# Health check endpoint
curl http://localhost:5000/api/health

# Should return: {"status":"OK","message":"E-commerce API is running",...}

# List products
curl http://localhost:5000/api/products | head -50

# Should return JSON with product array
```

### Verification Steps

- [ ] `curl http://localhost:5000/api/health` returns success
- [ ] HTTP status code is 200
- [ ] Response contains "status": "OK"
- [ ] `/api/products` endpoint returns product array
- [ ] Sample products are in the database (8 products)
- [ ] No connection errors in logs

### View Backend Logs

```bash
# See detailed logs
docker-compose logs backend

# Should NOT show:
# - MongoDB connection errors
# - Port already in use
# - Module not found errors
```

---

## ✅ Frontend Accessibility Verification

### Test Frontend Access

```bash
# Test frontend response
curl http://localhost:3000

# Should return HTML (200 status)

# Or use browser:
# http://localhost:3000
```

### Verification Steps

- [ ] Frontend accessible via browser at http://localhost:3000
- [ ] Page loads without errors
- [ ] Header displays "🛍️ E-Commerce Store"
- [ ] Products are visible on the page
- [ ] No console errors in browser (F12 → Console)
- [ ] Navigation buttons work (Products, Cart)

---

## ✅ MongoDB Verification

### Check Database Connection

```bash
# Check MongoDB logs
docker-compose logs mongodb

# Should show successful startup

# Verify database and collections
docker exec ecommerce-mongodb mongosh -u admin -p

# In mongosh:
# > use ecommerce
# > db.products.count()
# > exit
```

### Verification Steps

- [ ] MongoDB container started successfully
- [ ] No "bind" errors (port conflicts)
- [ ] Database created successfully
- [ ] Sample data loaded (8 products)
- [ ] Collections created (products, orders, carts)

---

## ✅ Database Sample Data Verification

### Verify Sample Products

```bash
# Check products in database
curl http://localhost:5000/api/products | jq '.data | length'

# Should return: 8
```

### Sample Products Expected

- [ ] Wireless Headphones - $129.99
- [ ] Laptop Backpack - $49.99
- [ ] Cotton T-Shirt - $24.99
- [ ] Running Shoes - $89.99
- [ ] JavaScript Book - $39.99
- [ ] Smart Watch - $199.99
- [ ] Coffee Maker - $59.99
- [ ] Yoga Mat - $34.99

---

## ✅ Application Workflow Testing

### Test User Workflow

1. **Browse Products**
   - [ ] Products display on home page
   - [ ] Filter by category works
   - [ ] Sorting options work

2. **View Product Details**
   - [ ] Click on product opens modal
   - [ ] Product details display correctly
   - [ ] Modal can be closed

3. **Add to Cart**
   - [ ] "Add to Cart" button works
   - [ ] Success message appears
   - [ ] Cart count updates

4. **Shopping Cart**
   - [ ] Navigate to cart page
   - [ ] Items display in cart
   - [ ] Quantity can be updated
   - [ ] Items can be removed
   - [ ] Total calculates correctly

5. **Checkout**
   - [ ] Fill in shipping details
   - [ ] Submit checkout form
   - [ ] Order confirmation displays
   - [ ] Order ID generated

---

## ✅ EC2 Deployment Verification

### Pre-Deployment

- [ ] EC2 instance SSH access working
- [ ] Project files copied to EC2
- [ ] Deployment script has execute permission
- [ ] .env file configured with correct MongoDB URI

### During Deployment

```bash
# Monitor deployment
cd /home/ubuntu/ecommerce-app
chmod +x scripts/deploy-ec2.sh
./scripts/deploy-ec2.sh

# Watch for:
# - Docker installation success
# - Docker Compose installation success
# - Container builds completed
# - Services started successfully
```

### Post-Deployment

- [ ] Deployment script completed without errors
- [ ] All containers started successfully
- [ ] Health check passed
- [ ] Frontend accessible via EC2 public IP:3000
- [ ] Backend accessible via EC2 public IP:5000

---

## ✅ MongoDB URI Configuration for EC2

### Test with Different Databases

**Option 1: Built-in (Default)**
```bash
# Already configured - uses Docker MongoDB
# No action needed
```

**Option 2: AWS DocumentDB**
```bash
# Edit .env
MONGODB_URI=mongodb://username:password@docdb-endpoint.us-east-1.docdb.amazonaws.com:27017/ecommerce?ssl=true

# Restart backend
docker-compose restart backend
```

**Option 3: MongoDB Atlas**
```bash
# Edit .env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# Restart backend
docker-compose restart backend
```

### Verification After Configuration Change

- [ ] .env updated with new MONGODB_URI
- [ ] Backend restarted
- [ ] Health check passes
- [ ] Products still load from new database
- [ ] No connection errors in logs

---

## ✅ Performance Verification

### Check Resource Usage

```bash
# Monitor containers
docker stats

# Should show:
# - Low CPU usage (< 5%)
# - Reasonable memory usage
# - Network activity when accessing app
```

### Performance Checks

- [ ] Page loads within 3 seconds
- [ ] API responses within 500ms
- [ ] No memory leaks observed
- [ ] Containers don't crash unexpectedly

---

## ✅ Security Verification

### Basic Security Checks

```bash
# Check if services are publicly accessible
netstat -tulpn | grep LISTEN

# Verify CORS is configured
curl -i http://localhost:5000/api/products

# Check for exposed credentials
grep -r "password" .env
# Should only show in .env files, not in code
```

### Security Checklist

- [ ] .env file contains credentials (not in code)
- [ ] .gitignore includes .env file
- [ ] MongoDB credentials are set
- [ ] CORS headers are configured
- [ ] No hardcoded passwords in code
- [ ] API validates input
- [ ] Error messages don't leak sensitive info

---

## ✅ Backup & Restore Verification

### Test Backup

```bash
# Create backup
cd /home/ubuntu/ecommerce-app
chmod +x scripts/backup-db.sh
./scripts/backup-db.sh

# Verify backup file created
ls -lh backups/
```

### Test Restore

```bash
# Create test backup
./scripts/backup-db.sh

# Simulate data loss (optional)
docker-compose down -v

# Restore from backup
./scripts/restore-db.sh ./backups/ecommerce_backup_*.gz

# Verify data restored
curl http://localhost:5000/api/products | jq '.data | length'
# Should return: 8
```

### Backup/Restore Checklist

- [ ] Backup script runs without errors
- [ ] Backup files created in ./backups/ directory
- [ ] Restore script runs without errors
- [ ] Data restored successfully
- [ ] Products count is 8 after restore

---

## ✅ Final Verification Summary

### Deployment Success Criteria

- [ ] All 4 Docker containers running
- [ ] Backend health check passes
- [ ] Frontend loads in browser
- [ ] Database contains 8 sample products
- [ ] Shopping cart functionality works
- [ ] Checkout process completes
- [ ] Order confirmation displays
- [ ] Environment variables configured correctly
- [ ] MongoDB URI can be changed easily
- [ ] No errors in container logs

### Next Steps After Verification

1. **Start Using**: Access at http://localhost:3000 or http://ec2-ip:3000
2. **Customize**: Edit init-db.js to add your own products
3. **Deploy**: Copy .env setup across environments
4. **Monitor**: Use `docker-compose logs -f` to monitor
5. **Scale**: Update docker-compose.yml for production

---

## 📋 Quick Verification Commands

```bash
# One-command verification
docker-compose ps && \
curl http://localhost:5000/api/health && \
curl -s http://localhost:5000/api/products | jq '.count' && \
echo "✅ All systems operational!"
```

---

## 🎉 Deployment Checklist Complete!

When all items are checked, your e-commerce application is:
✅ Fully installed
✅ Properly configured  
✅ Successfully deployed
✅ Ready for production use

**Start using the application at**: http://localhost:3000

---

For issues, check:
1. `docker-compose logs` for errors
2. `README.md` for detailed documentation
3. `EC2-DEPLOYMENT-GUIDE.md` for EC2 specific help
4. `.env` file for configuration
