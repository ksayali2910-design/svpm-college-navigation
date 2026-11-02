@echo off
title SVPM NAVI-X Local Server
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  echo Starting SVPM NAVI-X at http://localhost:8000
  echo Keep this window open. Press Ctrl+C to stop the server.
  py -m http.server 8000
) else (
  where python >nul 2>nul
  if %errorlevel%==0 (
    echo Starting SVPM NAVI-X at http://localhost:8000
    echo Keep this window open. Press Ctrl+C to stop the server.
    python -m http.server 8000
  ) else (
    echo Python was not found. Install Python 3 or use another local web server.
    pause
  )
)
