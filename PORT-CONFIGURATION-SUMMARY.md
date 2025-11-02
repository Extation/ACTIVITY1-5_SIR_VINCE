# Port Configuration Summary

## Overview
This document tracks the port allocation across all activities to prevent EADDRINUSE conflicts.

## Port Allocation Strategy

| Activity | Backend Port | Frontend Port | Status |
|----------|-------------|---------------|---------|
| Activity 1 | 3001 | 3101 | ✅ Completed |
| Activity 2 | 3002 | 3102 | ✅ Completed |
| Activity 3 | 3003 | 3103 | ✅ Completed |
| Activity 4 | 3004 | 3104 | ✅ Completed |
| Activity 5 | 3005 | 3105 | ✅ Completed |

---

## Activity 1 - To-Do List Application

### ✅ Completed Changes

**Backend (Port 3001):**
- ✅ Created `ACTIVITY1/backend/.env` with PORT=3001
- ✅ Updated `ACTIVITY1/backend/src/main.ts` CORS to allow `http://localhost:3101`

**Frontend (Port 3101):**
- ✅ Created `ACTIVITY1/frontend/.env` with PORT=3101 and REACT_APP_API_URL=http://localhost:3001
- ✅ Updated `ACTIVITY1/frontend/src/services/taskService.ts` to use environment variable

---

## Activity 2 - Lanesra Note Application

### ✅ Completed Changes

**Backend (Port 3002):**
- ✅ Created `ACTIVITY2/backend/.env` with PORT=3002

**Frontend (Port 3102):**
- ✅ Created `ACTIVITY2/frontend/.env` with PORT=3102 and REACT_APP_API_URL=http://localhost:3002
- ✅ Updated `ACTIVITY2/frontend/src/services/authService.ts` to use environment variable
- ✅ Updated `ACTIVITY2/frontend/src/services/noteService.ts` to use environment variable

---

## Activity 3 - Bookshelf Application

### ✅ Completed Changes

**Backend (Port 3003):**
- ✅ Created `ACTIVITY3/bookshelf-backend/.env` with PORT=3003

**Frontend (Port 3103):**
- ✅ Created `ACTIVITY3/bookshelf-frontend/.env` with PORT=3103 and REACT_APP_API_URL=http://localhost:3003
- ✅ Updated `ACTIVITY3/bookshelf-frontend/src/components/Books.js` to use environment variable
- ✅ Updated `ACTIVITY3/bookshelf-frontend/src/components/Authors.js` to use environment variable
- ✅ Updated `ACTIVITY3/bookshelf-frontend/src/components/Categories.js` to use environment variable

---

## Activity 4 - Weather Proxy API

### ✅ Completed Changes

**Backend (Port 3004):**
- ✅ Created `ACTIVITY4/backend/.env` with PORT=3004
- ✅ Updated `ACTIVITY4/backend/src/main.ts` CORS to use environment variable

**Frontend (Port 3104):**
- ✅ Created `ACTIVITY4/frontend/.env` with PORT=3104 and REACT_APP_API_URL=http://localhost:3004
- ✅ Verified `ACTIVITY4/frontend/src/services/weatherService.js` already uses environment variable

---

## Activity 5 - Blog Platform

### ✅ Completed Changes

**Backend (Port 3005):**
- ✅ Created `ACTIVITY5/Activity5/backend-nestjs/.env` with PORT=3005
- ✅ Updated `ACTIVITY5/Activity5/backend-nestjs/src/main.ts` to use PORT from environment
- ✅ Updated CORS configuration to use environment variable

**Frontend (Port 3105):**
- ✅ Created `ACTIVITY5/Activity5/frontend/.env` with PORT=3105 and REACT_APP_API_URL=http://localhost:3005
- ✅ Updated `ACTIVITY5/Activity5/frontend/src/services/api.js` to use environment variable

---

## Testing Checklist

After completing all port configurations:

- [ ] Test Activity 1: Start backend on 3001, frontend on 3101
- [ ] Test Activity 2: Start backend on 3002, frontend on 3102
- [ ] Test Activity 3: Start backend on 3003, frontend on 3103
- [ ] Test Activity 4: Start backend on 3004, frontend on 3104
- [ ] Test Activity 5: Start backend on 3005, frontend on 3105
- [ ] Test running all activities simultaneously
- [ ] Verify no EADDRINUSE errors occur

---

## How to Start Each Activity

### Activity 1
```bash
# Terminal 1 - Backend
cd ACTIVITY1/backend
npm install
npm run start:dev

# Terminal 2 - Frontend
cd ACTIVITY1/frontend
npm install
npm start
```

### Activity 2
```bash
# Terminal 1 - Backend
cd ACTIVITY2/backend
npm install
npm run start:dev

# Terminal 2 - Frontend
cd ACTIVITY2/frontend
npm install
npm start
```

### Activity 3
```bash
# Terminal 1 - Backend
cd ACTIVITY3/bookshelf-backend
npm install
npm run start:dev

# Terminal 2 - Frontend
cd ACTIVITY3/bookshelf-frontend
npm install
npm start
```

### Activity 4
```bash
# Terminal 1 - Backend
cd ACTIVITY4/backend
npm install
npm run start:dev

# Terminal 2 - Frontend
cd ACTIVITY4/frontend
npm install
npm start
```

### Activity 5
```bash
# Terminal 1 - Backend
cd ACTIVITY5/Activity5/backend-nestjs
npm install
npm run start:dev

# Terminal 2 - Frontend
cd ACTIVITY5/Activity5/frontend
npm install
npm start
```

---

## Notes

- All `.env` files are gitignored by default
- Environment variables take precedence over hardcoded values
- Fallback ports are provided in case `.env` is missing
- CORS configurations updated to match new frontend ports

---

**Last Updated:** January 2024
