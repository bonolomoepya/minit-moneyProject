# Minit Money – Practical Developer Test

Welcome 👋 and thank you for checking out my submission for the Minit Money practical developer test!

This project includes:

- **Mobile App** built with React Native Expo  
- **Web Dashboard** built with ReactJS, Chakra UI, and Vite  
- **Backend** with Node.js, Apollo Server, Prisma, and PostgreSQL  

---

## Tech Stack

- React Native Expo (mobile)  
- ReactJS + Chakra UI + Vite (web)  
- Node.js + Apollo GraphQL + Prisma + PostgreSQL (backend)  
- Apollo Client for GraphQL communication  

---

## How to Run

### 1. Backend Setup

```bash
cd server
npm install

# Setup environment variables
cp .env.example .env
# Edit .env and add your DATABASE_URL (e.g. postgresql://user:pass@localhost:5432/dbname)

# Run Prisma migrations
npx prisma migrate dev

# Start the backend server
node index.js
cd mobile
npm install
npx expo start
