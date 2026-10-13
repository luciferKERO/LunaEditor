@echo off
title LUNA AI Video Editing Studio
color 0A

echo.
echo  ╔══════════════════════════════════════╗
echo  ║   LUNA AI Video Editing Studio       ║
echo  ║   Starting all services...           ║
echo  ╚══════════════════════════════════════╝
echo.

:: Check prerequisites
where pnpm >nul 2>&1 || (echo [ERROR] pnpm not found. Install: npm i -g pnpm && pause && exit /b 1)
where python >nul 2>&1 || (echo [ERROR] python not found. Install Python 3.11+ && pause && exit /b 1)

:: Set root directory
set ROOT=%~dp0

:: Install Python deps if needed
echo [1/3] Installing Python dependencies...
cd /d "%ROOT%apps\api"
pip install -q -r requirements.txt 2>nul

:: Start backend API (new window)
echo [2/3] Starting Backend API on port 8000...
start "LUNA Backend API" cmd /k "cd /d %ROOT%apps\api && title LUNA Backend API && color 0B && echo LUNA Backend API starting... && python -m uvicorn main:app --reload --port 8000"

:: Wait a moment for backend to initialize
timeout /t 3 /nobreak >nul

:: Start frontend (new window)
echo [3/3] Starting Frontend on port 3000...
start "LUNA Frontend" cmd /k "cd /d %ROOT%apps\web && title LUNA Frontend && color 0D && echo LUNA Frontend starting... && pnpm dev"

:: Wait for frontend to be ready
timeout /t 5 /nobreak >nul

:: Open browser
echo.
echo  Opening browser...
start http://localhost:3000

echo.
echo  ╔══════════════════════════════════════╗
echo  ║   All services started!              ║
echo  ║                                      ║
echo  ║   Frontend:  http://localhost:3000    ║
echo  ║   Backend:   http://localhost:8000    ║
echo  ║   Health:    http://localhost:8000/health
echo  ║                                      ║
echo  ║   Close this window to keep running  ║
echo  ║   Close ALL windows to stop          ║
echo  ╚══════════════════════════════════════╝
echo.
pause
