# Pennywise 💰

Pennywise is a mobile application built with **React Native (Expo)** and a **Node.js/Express + MongoDB (Mongoose)** backend designed to help friends, roommates, and travel groups manage shared expenses, split bills, and settle balances seamlessly.

---

## 📁 Repository Structure

```
pennywise/
├── backend/                   # Node.js + Express + MongoDB REST API
│   ├── src/
│   │   ├── config/            # Database and environment configurations
│   │   ├── controllers/       # HTTP request handlers & response orchestration
│   │   ├── middleware/        # JWT auth, validation, and error-handling middleware
│   │   ├── models/            # Mongoose ODM data models
│   │   ├── routes/            # Express endpoint routing declarations
│   │   ├── services/          # Business logic & debt calculation algorithms
│   │   ├── utils/             # Helper utilities, constants, token generators
│   │   ├── app.js             # Express application configuration
│   │   └── server.js          # HTTP server listener and DB bootstrap
│   ├── .env.example           # Backend environment variables template
│   ├── .env                   # Local backend environment variables
│   ├── .gitignore             # Backend git exclusions
│   └── package.json           # Backend dependencies and scripts
│
├── frontend/                  # React Native mobile client (Expo)
│   ├── assets/                # App icons, splash screens, and image assets
│   ├── src/
│   │   ├── components/        # Reusable UI components (common, expense, group)
│   │   ├── context/           # React Context state management (Auth, Group, Theme)
│   │   ├── hooks/             # Custom React hooks (useAuth, useExpenses, useGroups)
│   │   ├── navigation/        # Stack and Bottom Tab navigators
│   │   ├── screens/           # Application views (Auth, Dashboard, Groups, Expenses)
│   │   ├── services/          # Axios API clients and AsyncStorage persistence
│   │   ├── theme/             # Design tokens: palette, typography, spacing
│   │   └── utils/             # Formatters, debt simplifier, input validators
│   ├── App.js                 # App root provider wrapper & entry point
│   ├── app.json               # Expo configuration manifest
│   ├── babel.config.js        # Babel configuration for Expo
│   ├── .env.example           # Frontend environment variables template
│   ├── .env                   # Local frontend environment variables
│   ├── .gitignore             # Frontend git exclusions
│   └── package.json           # Frontend dependencies and scripts
│
├── .gitignore                 # Root git exclusions
└── README.md                  # Project overview and run guide
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18+ recommended)
- MongoDB instance (Local or MongoDB Atlas)
- Expo Go app on your physical mobile device, or an iOS / Android simulator

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start development server
npm run dev
```
Backend runs on `http://localhost:5000` (Health check: `http://localhost:5000/api/health`).

### 3. Frontend Setup
```bash
# Navigate to frontend directory in another terminal
cd frontend

# Install dependencies
npm install

# Start Expo dev server
npx expo start
```
Scan the QR code with **Expo Go** (Android) or the **Camera app** (iOS).
