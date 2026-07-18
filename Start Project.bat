@echo off
title AI Travel Agent - Launcher
color 0A

echo.
echo  =====================================================
echo       AI Travel Agent - Project Launcher
echo  =====================================================
echo.

:: ---- Check if Python is installed ----
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo  [OK] Python found. Starting local server on port 3000...
    echo.
    echo  Opening browser at http://localhost:3000
    echo  Press CTRL+C to stop the server.
    echo.
    start "" "http://localhost:3000"
    cd /d "%~dp0"
    python -m http.server 3000
    goto END
)

:: ---- Check if Node.js / npx is installed ----
npx --version >nul 2>&1
if %errorlevel% == 0 (
    echo  [OK] Node.js found. Starting local server on port 3000...
    echo.
    echo  Opening browser at http://localhost:3000
    echo  Press CTRL+C to stop the server.
    echo.
    start "" "http://localhost:3000"
    cd /d "%~dp0"
    npx serve . -p 3000
    goto END
)

:: ---- Fallback: open index.html directly in browser ----
echo  [INFO] No server found. Opening index.html directly in browser...
echo.
start "" "%~dp0index.html"

:END
echo.
pause
