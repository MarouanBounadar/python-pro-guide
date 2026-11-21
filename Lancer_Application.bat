@echo off
:: Lanceur automatique avec debloquage SmartScreen / Smart App Control
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -Command "if (Test-Path '.\dist\PythonProGuide.exe') { Unblock-File -Path '.\dist\PythonProGuide.exe' -ErrorAction SilentlyContinue }"
if exist ".\dist\PythonProGuide.exe" (
    start "" ".\dist\PythonProGuide.exe"
) else (
    start "" "index.html"
)
exit
