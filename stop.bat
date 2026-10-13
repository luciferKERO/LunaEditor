@echo off
title LUNA - Stopping Services
echo.
echo  Stopping LUNA services...
echo.

:: Kill uvicorn (backend)
taskkill /f /im uvicorn.exe 2>nul
taskkill /f /fi "WINDOWTITLE eq LUNA Backend API" 2>nul

:: Kill node (frontend)
taskkill /f /fi "WINDOWTITLE eq LUNA Frontend" 2>nul

echo.
echo  All LUNA services stopped.
echo.
pause
