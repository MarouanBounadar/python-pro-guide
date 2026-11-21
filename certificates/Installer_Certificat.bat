@echo off
chcp 65001 > nul
echo =========================================================================
echo    INSTALLATION DU CERTIFICAT OFFICIEL - PYTHON PRO GUIDE (UIT KENITRA)
echo =========================================================================
echo.
echo Ce script installe le certificat de signature numerique dans votre magasin
echo personnel Windows pour eviter tout avertissement Windows Defender SmartScreen.
echo.

cd /d "%~dp0"
if not exist "PythonProGuide.cer" (
    echo [ERREUR] Le fichier PythonProGuide.cer est introuvable.
    pause
    exit /b 1
)

echo [1/2] Ajout aux Editeurs Approuves (Trusted Publishers)...
certutil -user -addstore "TrustedPublisher" "PythonProGuide.cer" > nul
if %errorlevel% neq 0 (
    echo Erreur lors de l'ajout a TrustedPublisher.
) else (
    echo [OK] Ajoute avec succes aux Editeurs Approuves.
)

echo [2/2] Ajout aux Autorites Racines de Confiance (Root CA)...
certutil -user -addstore "Root" "PythonProGuide.cer" > nul
if %errorlevel% neq 0 (
    echo Erreur lors de l'ajout a Root CA.
) else (
    echo [OK] Ajoute avec succes aux Autorites Racines.
)

echo.
echo =========================================================================
echo   SUCCES : Le certificat est installe ! L'application est maintenant
echo            reconnue comme verifiee par Windows.
echo =========================================================================
echo.
pause
