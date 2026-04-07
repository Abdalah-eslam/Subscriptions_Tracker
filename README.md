# 📱 Subscriptions Tracker API

> **Enterprise-Grade Subscription Management** | Production-ready Node.js REST API with advanced security & automation

[![Node.js](https://img.shields.io/badge/Node.js-14+-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.1+-green?logo=mongodb)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🎯 Features

✅ Secure JWT authentication with bcryptjs  
✅ Complete subscription CRUD operations  
✅ Multi-currency support (10+ currencies)  
✅ Flexible billing cycles (daily/weekly/monthly/yearly)  
✅ Email notifications via Nodemailer  
✅ Workflow automation with Upstash  
✅ Rate limiting & DDoS protection (Arcjet)  
✅ Input validation & error handling  

---

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- MongoDB
- npm

### Installation
```bash
git clone <repo-url>
cd Subscriptions_Tracker
npm install
```

### Environment Setup
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/subscriptions_tracker
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
ARCJET_KEY=your_arcjet_key
UPSTASH_WORKFLOW_URL=your_url
UPSTASH_WORKFLOW_TOKEN=your_token
```

### Run Server
```bash
npm run dev       # Development
npm start         # Production
```

---

## 📡 API Endpoints

**Base**: `http://localhost:3000/api/v1`

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/auth/register` | POST | 🔐 Register user |
| `/auth/login` | POST | 🔑 Login & get token |
| `/subscriptions` | GET/POST | 📊 List/Create subs |
| `/subscriptions/:id` | PUT/DELETE | ✏️ Update/Delete sub |
| `/users/profile` | GET/PUT | 👤 Profile management |
| `/workflows` | GET/POST/PUT/DELETE | ⚙️ Workflow automation |

---

## 🏗️ Project Structure

```
config/               # Configuration (env, email, security)
controllers/          # Business logic
routes/               # API routes
models/               # Database schemas
middlewares/          # Auth, error handling, rate limiting
database/             # MongoDB connection
utils/                # Email & utilities
```

---

## 💻 Tech Stack

**Backend**: Express.js | **Database**: MongoDB + Mongoose  
**Auth**: JWT + bcryptjs | **Email**: Nodemailer  
**Security**: Arcjet | **Automation**: Upstash | **Dev**: Nodemon, ESLint

---

## 🔐 Security

- JWT-based authentication
- Password hashing with bcryptjs
- Rate limiting & DDoS protection
- Input validation & sanitization
- Secure error handling
- CORS & proxy protection

---

## 📊 Database Models

**User**: name, email, password, timestamps  
**Subscription**: name, price, currency, frequency, category, status, dates, userId

---

## 📝 Example Requests

**Register User**:
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"Pass123!"}'
```

**Create Subscription**:
```bash
curl -X POST http://localhost:3000/api/v1/subscriptions \
  -H "Authorization: Bearer JWT_TOKEN" \
  -d '{"name":"Netflix","price":15.99,"currency":"USD","frequency":"monthly"}'
```

---

## 🛠️ Development

```bash
npm install          # Install dependencies
npm run dev          # Start with auto-reload
npm run lint         # Check code quality
npm start            # Production mode
```

---

## 🤝 Contributing

1. Fork repo → 2. Create branch → 3. Commit changes → 4. Push → 5. Open PR

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

---

<p align="center">
  <strong>Built with ❤️ for subscription management</strong> | ⭐ Star if helpful!
</p>
