# Port Configuration Guide

This document outlines the port configuration for all activities to avoid conflicts.

---

## Port Assignments

| Activity | Backend Port | Frontend Port | Status |
|----------|-------------|---------------|--------|
| Activity 1 | 3001 | 3101 | ✅ Configured |
| Activity 2 | 3002 | 3102 | ✅ Configured |
| Activity 3 | 3006 | 3106 | ✅ Configured |
| Activity 4 | 3004 | 3104 | ✅ Configured |
| Activity 5 | 3005 | 3105 | ✅ Configured |

---

## Quick Commands

### Check Which Ports Are In Use

**Windows:**
```powershell
netstat -ano | findstr "3001 3002 3004 3005 3006 3101 3102 3104 3105 3106"
```

**Mac/Linux:**
```bash
lsof -i :3001,:3002,:3004,:3005,:3006,:3101,:3102,:3104,:3105,:3106
```

### Kill All Activity Processes

**Windows - Easy Way:**
```powershell
# Run the provided PowerShell script
.\kill-all-ports.ps1
```

**Windows - Manual Way:**
```powershell
# Kill all Node.js processes
taskkill /F /IM node.exe

# Or kill specific port (replace 3001 with your port)
netstat -ano | findstr :3001
taskkill /F /PID <PID_NUMBER>
```

**Mac/Linux:**
```bash
# Kill all Node.js processes
killall node

# Or kill specific port (replace 3001 with your port)
lsof -ti:3001 | xargs kill -9
```

---

## Starting Activities

### Activity 1 - To-Do List
```bash
# Backend (Terminal 1)
cd ACTIVITY1/backend
npm run start:dev

# Frontend (Terminal 2)
cd ACTIVITY1/frontend
npm start
```
- Backend: http://localhost:3001
- Frontend: http://localhost:3101

### Activity 2 - Lanesra Note
```bash
# Backend (Terminal 1)
cd ACTIVITY2/backend
npm run start:dev

# Frontend (Terminal 2)
cd ACTIVITY2/frontend
npm start
```
- Backend: http://localhost:3002
- Frontend: http://localhost:3102

### Activity 3 - Bookshelf
```bash
# Backend (Terminal 1)
cd ACTIVITY3/bookshelf-backend
npm run start:dev

# Frontend (Terminal 2)
cd ACTIVITY3/bookshelf-frontend
npm start
```
- Backend: http://localhost:3006
- Frontend: http://localhost:3106

### Activity 4 - Weather Proxy API
```bash
# Backend (Terminal 1)
cd ACTIVITY4/backend
npm run start:dev

# Frontend (Terminal 2)
cd ACTIVITY4/frontend
npm start
```
- Backend: http://localhost:3004
- Frontend: http://localhost:3104

### Activity 5 - Blog Platform
```bash
# Backend (Terminal 1)
cd ACTIVITY5/Activity5/backend-nestjs
npm run start:dev

# Frontend (Terminal 2)
cd ACTIVITY5/Activity5/frontend
npm start
```
- Backend: http://localhost:3005
- Frontend: http://localhost:3105

---

## Troubleshooting

### Port Already in Use Error

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::3001
```

**Solution:**
1. Run the kill-all-ports.ps1 script:
   ```powershell
   .\kill-all-ports.ps1
   ```

2. Or manually kill the process:
   ```powershell
   netstat -ano | findstr :3001
   taskkill /F /PID <PID_NUMBER>
   ```

3. Restart your application

### Multiple Activities Running

You can run multiple activities simultaneously since they all use different ports. Just make sure you have enough system resources.

### Frontend Can't Connect to Backend

1. Verify backend is running on the correct port
2. Check the `.env` file in the frontend directory
3. Ensure the API URL matches the backend port
4. Clear browser cache and refresh (Ctrl+F5)

---

## Environment Files

### Backend .env Files

**Activity 1 Backend (.env):**
```env
PORT=3001
```

**Activity 2 Backend (.env):**
```env
PORT=3002
```

**Activity 3 Backend (.env):**
```env
PORT=3006
```

**Activity 4 Backend (.env):**
```env
PORT=3004
OPENWEATHER_API_KEY=your_api_key_here
```

**Activity 5 Backend (.env):**
```env
PORT=3005
```

### Frontend .env Files

**Activity 1 Frontend (.env):**
```env
PORT=3101
REACT_APP_API_URL=http://localhost:3001
```

**Activity 2 Frontend (.env):**
```env
PORT=3102
REACT_APP_API_URL=http://localhost:3002
```

**Activity 3 Frontend (.env):**
```env
DANGEROUSLY_DISABLE_HOST_CHECK=true
PORT=3106
REACT_APP_API_URL=http://localhost:3006
```

**Activity 4 Frontend (.env):**
```env
PORT=3104
REACT_APP_API_URL=http://localhost:3004
```

**Activity 5 Frontend (.env):**
```env
PORT=3105
REACT_APP_API_URL=http://localhost:3005
```

---

## Notes

- All backend ports are in the 3000-3006 range
- All frontend ports are in the 3100-3106 range
- Activity 3 requires `DANGEROUSLY_DISABLE_HOST_CHECK=true` due to react-scripts 5.0.1 compatibility
- Activity 4 requires an OpenWeatherMap API key
- Activity 5 image URLs have been fixed to use port 3005

---

**Last Updated:** January 2024
