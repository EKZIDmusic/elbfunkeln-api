# 🚀 Elbfunkeln API Setup Instructions

## ✅ What Has Been Created

This script has created a COMPLETE NestJS + Prisma backend with:

### Core Infrastructure
- ✅ NestJS project structure
- ✅ Prisma ORM with MariaDB
- ✅ Complete database schema
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ Swagger API documentation

### All Modules (13 total)
1. ✅ **Auth** - Registration, Login, JWT
2. ✅ **Users** - Profile, Favorites, Admin management
3. ✅ **Products** - CRUD, Search, Featured
4. ✅ **Categories** - Hierarchical categories
5. ✅ **Cart** - Shopping cart with calculations
6. ✅ **Orders** - Full order management
7. ✅ **Payments** - Stripe integration
8. ✅ **Shipping** - DHL integration
9. ✅ **Gift Cards** - Purchase & redemption
10. ✅ **Discounts** - Coupon codes
11. ✅ **Tickets** - Support system
12. ✅ **Newsletter** - Email subscriptions
13. ✅ **Analytics** - Dashboard & metrics

### Security & Features
- Rate limiting (100 req/min)
- Input validation
- CORS enabled
- Helmet security headers
- Compression
- Cookie parser

## 📋 Next Steps

### 1. Install Dependencies (if not done)
```bash
npm install
```

### 2. Setup Database
```bash
# Create MariaDB database
mysql -u root -p -e "CREATE DATABASE elbfunkeln CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Or with custom user
mysql -u root -p << SQL
CREATE DATABASE elbfunkeln CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'elbfunkeln_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON elbfunkeln.* TO 'elbfunkeln_user'@'localhost';
FLUSH PRIVILEGES;
SQL
```

### 3. Configure Environment
```bash
# Edit .env file
nano .env

# Update DATABASE_URL:
DATABASE_URL="mysql://root:your_password@localhost:3306/elbfunkeln"

# Generate secure JWT secret (already done, but you can regenerate):
JWT_SECRET="$(openssl rand -base64 32)"
```

### 4. Generate Prisma Client & Run Migrations
```bash
# Generate Prisma client
npm run prisma:generate

# Create database tables
npm run prisma:migrate dev --name init

# Open Prisma Studio (optional)
npm run prisma:studio
```

### 5. Seed Database (Optional)
```bash
# Create seed file (already created)
npm run seed
```

This creates:
- Admin user: admin@elbfunkeln.de / admin123
- Sample categories
- Sample products

### 6. Start Development Server
```bash
npm run start:dev
```

## 🌐 Access Your API

Once running:
- **API Base**: http://localhost:3000/api
- **Swagger Docs**: http://localhost:3000/api/docs
- **Health Check**: http://localhost:3000/api/health

## 🔐 Default Credentials

```
Email: admin@elbfunkeln.de
Password: admin123
```

**⚠️ CHANGE IMMEDIATELY IN PRODUCTION!**

## 📚 API Testing

### Register New User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "Max",
    "lastName": "Mustermann"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@elbfunkeln.de",
    "password": "admin123"
  }'
```

### Get Products (Public)
```bash
curl http://localhost:3000/api/products
```

### Get Profile (Protected)
```bash
curl http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🛠️ Available NPM Scripts

```bash
npm run start          # Start production server
npm run start:dev      # Start dev server with watch
npm run start:debug    # Start debug mode
npm run build          # Build for production

npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open Prisma Studio
npm run seed             # Seed database

npm run test           # Run unit tests
npm run test:watch     # Run tests in watch mode
npm run test:cov       # Generate coverage report
npm run test:e2e       # Run E2E tests
```

## 📁 Project Structure

```
elbfunkeln-api/
├── src/
│   ├── auth/                # Authentication
│   │   ├── strategies/      # JWT & Local strategies
│   │   ├── dto/            # Data transfer objects
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── users/              # User management
│   ├── products/           # Product catalog
│   ├── categories/         # Categories
│   ├── cart/               # Shopping cart
│   ├── orders/             # Order management
│   ├── payments/           # Stripe payments
│   ├── shipping/           # DHL shipping
│   ├── gift-cards/         # Gift cards
│   ├── discounts/          # Discount codes
│   ├── tickets/            # Support tickets
│   ├── newsletter/         # Newsletter
│   ├── analytics/          # Analytics
│   ├── email/              # Email service
│   ├── common/             # Shared utilities
│   │   ├── guards/         # Auth guards
│   │   ├── decorators/     # Custom decorators
│   │   └── interfaces/     # TypeScript interfaces
│   ├── prisma/             # Prisma service
│   ├── app.module.ts       # Root module
│   └── main.ts             # Bootstrap
├── prisma/
│   ├── schema.prisma       # Database schema
│   ├── seed.ts             # Seed data
│   └── migrations/         # Migration files
├── .env                    # Environment variables
├── package.json
└── tsconfig.json
```

## 🔧 Configuration

### Stripe Setup
1. Get API keys from https://dashboard.stripe.com/apikeys
2. Update `.env`:
```env
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### DHL Setup
1. Register at https://entwickler.dhl.de/
2. Get API credentials
3. Update `.env`:
```env
DHL_API_KEY="your_api_key"
DHL_API_SECRET="your_api_secret"
DHL_SANDBOX=true
```

### Email Setup
Configure SMTP in `.env`:
```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Check MariaDB is running
sudo systemctl status mariadb

# Test connection
mysql -u root -p -e "SELECT 1;"
```

### Port Already in Use
```bash
# Change port in .env
PORT=3001
```

### Prisma Migration Issues
```bash
# Reset database
npm run prisma:migrate reset

# Or manually
mysql -u root -p -e "DROP DATABASE elbfunkeln; CREATE DATABASE elbfunkeln;"
npm run prisma:migrate dev
```

## 🚀 Production Deployment

### Build
```bash
npm run build
```

### Environment Variables
Set all production variables:
- Strong JWT_SECRET
- Production database URL
- Real Stripe keys
- DHL production credentials
- SMTP credentials

### Start Production Server
```bash
NODE_ENV=production npm run start:prod
```

### Using PM2 (Recommended)
```bash
npm install -g pm2
pm2 start dist/main.js --name elbfunkeln-api
pm2 startup
pm2 save
```

## 📝 Additional Notes

- All passwords are hashed with bcrypt
- JWT tokens expire after 7 days (configurable)
- Free shipping threshold: €50
- VAT rate: 19%
- All endpoints support pagination
- Rate limiting: 100 requests per minute

## 🆘 Support

For issues:
1. Check logs: `npm run start:dev`
2. Review Swagger docs: http://localhost:3000/api/docs
3. Check Prisma Studio: `npm run prisma:studio`

## ✅ Verification Checklist

- [ ] Database created and connected
- [ ] Migrations run successfully
- [ ] Server starts without errors
- [ ] Swagger docs accessible
- [ ] Can register new user
- [ ] Can login and get JWT token
- [ ] Protected endpoints require auth
- [ ] Admin endpoints require admin role

## 🎉 You're Ready!

Your complete Elbfunkeln E-Commerce API is ready to use!

Happy coding! 🚀
