@echo off
:: Lanceur automatique avec debloquage SmartScreen / Smart App Control
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -Command "if (Test-Path '.\PythonProGuide.exe') { Unblock-File -Path '.\PythonProGuide.exe' -ErrorAction SilentlyContinue }"
start "" ".\PythonProGuide.exe"
exit
