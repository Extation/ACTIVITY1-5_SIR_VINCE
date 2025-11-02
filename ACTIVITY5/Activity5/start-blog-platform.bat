@echo off
echo ========================================
echo   Blog Platform - Full Stack Startup
echo ========================================
echo.
echo Starting Backend API Server...
echo.
start "Backend API" cmd /k "cd backend-nestjs && npm run start:dev"
echo Waiting for backend to be ready...
:check_backend
curl -s http://localhost:3001/api/health >nul 2>&1
if %errorlevel% neq 0 (
    timeout /t 2 /nobreak >nul
    goto check_backend
)
echo Backend is ready!
echo.
echo Starting Frontend React App...
echo.
start "Frontend React" cmd /k "cd frontend && npm start"
echo.
echo ========================================
echo   Blog Platform is starting up!
echo ========================================
echo.
echo Backend API: http://localhost:3001
echo Frontend App: http://localhost:3000
echo.
echo Wait for both servers to start, then:
echo - Open http://localhost:3000 in your browser
echo - Backend API is available at http://localhost:3001
echo.
echo Press any key to exit...
pause >nul
