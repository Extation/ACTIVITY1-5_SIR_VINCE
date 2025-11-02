# Weather Proxy API - Complete Setup Guide

This guide will walk you through setting up and running the Weather Proxy API application step by step.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Overview](#project-overview)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Running the Application](#running-the-application)
6. [Testing the Application](#testing-the-application)
7. [Common Issues](#common-issues)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16 or higher)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`
  
- **npm** (comes with Node.js)
  - Verify installation: `npm --version`

- **OpenWeatherMap API Key** (free)
  - Sign up at: https://openweathermap.org/api
  - Get your API key from the dashboard

## Project Overview

This application consists of two main parts:

1. **Backend** (Port 3000): NestJS API server with SQLite database
2. **Frontend** (Port 3001): React application

## Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- NestJS framework
- TypeORM for database
- SQLite3 database
- Swagger for API documentation
- Axios for HTTP requests

**Note**: Installation may take 2-5 minutes depending on your internet connection.

### Step 3: Configure Environment Variables

1. Open the `backend/.env` file
2. Replace `your_api_key_here` with your actual OpenWeatherMap API key:

```env
OPENWEATHER_API_KEY=your_actual_api_key_here
OPENWEATHER_API_URL=https://api.openweathermap.org/data/2.5/weather
PORT=3000
DATABASE_PATH=./weather.db
```

**Important**: Without a valid API key, the weather fetching will not work!

### Step 4: Verify Backend Structure

Your backend directory should look like this:

```
backend/
├── src/
│   ├── weather/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── weather.controller.ts
│   │   ├── weather.service.ts
│   │   └── weather.module.ts
│   ├── app.module.ts
│   └── main.ts
├── .env
├── package.json
├── tsconfig.json
└── nest-cli.json
```

### Step 5: Start Backend Server

```bash
npm run start:dev
```

**Expected Output:**
```
[Nest] 12345  - 01/15/2024, 10:30:00 AM     LOG [NestFactory] Starting Nest application...
[Nest] 12345  - 01/15/2024, 10:30:00 AM     LOG [InstanceLoader] AppModule dependencies initialized
[Nest] 12345  - 01/15/2024, 10:30:00 AM     LOG [InstanceLoader] TypeOrmModule dependencies initialized
[Nest] 12345  - 01/15/2024, 10:30:00 AM     LOG [InstanceLoader] WeatherModule dependencies initialized
[Nest] 12345  - 01/15/2024, 10:30:01 AM     LOG [NestApplication] Nest application successfully started
🚀 Application is running on: http://localhost:3000
📚 Swagger documentation: http://localhost:3000/api/docs
```

**Keep this terminal window open!** The backend server needs to keep running.

## Frontend Setup

### Step 1: Open New Terminal

Open a **new terminal window** (keep the backend running in the first one).

### Step 2: Navigate to Frontend Directory

```bash
cd frontend
```

### Step 3: Install Dependencies

```bash
npm install
```

This will install:
- React and React-DOM
- React Scripts (Create React App)
- Axios for API calls

**Note**: Installation may take 2-5 minutes.

### Step 4: Verify Frontend Structure

Your frontend directory should look like this:

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── WeatherSearch.js
│   │   ├── WeatherSearch.css
│   │   ├── WeatherDisplay.js
│   │   ├── WeatherDisplay.css
│   │   ├── WeatherHistory.js
│   │   └── WeatherHistory.css
│   ├── services/
│   │   └── weatherService.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── .env
└── package.json
```

### Step 5: Start Frontend Server

```bash
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view weather-proxy-frontend in the browser.

  Local:            http://localhost:3001
  On Your Network:  http://192.168.1.x:3001

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

Your default browser should automatically open to `http://localhost:3001`

## Running the Application

### Quick Start Commands

**Terminal 1 (Backend):**
```bash
cd backend
npm run start:dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

### Accessing the Application

1. **Frontend UI**: http://localhost:3001
2. **Backend API**: http://localhost:3000
3. **Swagger Docs**: http://localhost:3000/api/docs

## Testing the Application

### Test 1: Search for Weather

1. Open http://localhost:3001 in your browser
2. Enter a city name (e.g., "London")
3. Click "Search" button
4. You should see:
   - Temperature in Celsius
   - Weather condition with icon
   - Humidity percentage
   - Wind speed

### Test 2: View Search History

1. After searching for a few cities
2. Scroll down to see "Search History" section
3. All your searches should be listed with timestamps

### Test 3: Clear History

1. Click "Clear History" button
2. Confirm the action
3. History should be cleared

### Test 4: API Documentation

1. Open http://localhost:3000/api/docs
2. You should see Swagger UI with all endpoints
3. Try the "Try it out" feature:
   - Click on GET /api/weather
   - Click "Try it out"
   - Enter a city name
   - Click "Execute"
   - View the response

### Test 5: Direct API Call

Test the API directly using curl or browser:

```bash
# Using curl
curl "http://localhost:3000/api/weather?city=London"

# Or open in browser
http://localhost:3000/api/weather?city=London
```

Expected response:
```json
{
  "city": "London",
  "temperature": 15.5,
  "condition": "Clouds",
  "description": "scattered clouds",
  "humidity": 72,
  "windSpeed": 4.5,
  "country": "GB",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Common Issues

### Issue 1: "Cannot find module" errors in backend

**Solution:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Issue 2: "Port 3000 already in use"

**Solution:**
```bash
# Find and kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

Or change the port in `backend/.env`:
```env
PORT=3001
```

### Issue 3: "API key not configured" error

**Solution:**
1. Check `backend/.env` file
2. Ensure OPENWEATHER_API_KEY is set correctly
3. Verify your API key is active on OpenWeatherMap
4. Restart the backend server

### Issue 4: Frontend cannot connect to backend

**Solution:**
1. Verify backend is running on port 3000
2. Check `frontend/.env` has correct API URL:
   ```env
   REACT_APP_API_URL=http://localhost:3000
   ```
3. Restart frontend server

### Issue 5: "City not found" error

**Solution:**
- Check spelling of city name
- Try different city names
- Some cities require country code (e.g., "London,UK")

### Issue 6: Database errors

**Solution:**
```bash
cd backend
rm weather.db
npm run start:dev
```

The database will be recreated automatically.

## Stopping the Application

### Stop Backend
In the backend terminal, press: `Ctrl + C`

### Stop Frontend
In the frontend terminal, press: `Ctrl + C`

## Next Steps

1. **Customize the UI**: Edit files in `frontend/src/components/`
2. **Add Features**: Modify backend controllers and services
3. **Deploy**: Build for production using `npm run build`

## Need Help?

- Check the main README.md for more information
- Review Swagger documentation at http://localhost:3000/api/docs
- Check console logs for error messages

## Success Checklist

- [ ] Node.js and npm installed
- [ ] OpenWeatherMap API key obtained
- [ ] Backend dependencies installed
- [ ] Backend .env configured with API key
- [ ] Backend server running on port 3000
- [ ] Frontend dependencies installed
- [ ] Frontend server running on port 3001
- [ ] Can search for weather successfully
- [ ] Search history is working
- [ ] Swagger documentation accessible

If all items are checked, congratulations! Your Weather Proxy API is fully operational! 🎉
