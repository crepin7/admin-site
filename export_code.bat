@echo off
REM ==========================================================
REM Script : export_code.bat
REM Objectif : concaténer tous les fichiers source lisibles
REM dans un seul fichier codesource.txt
REM ==========================================================

setlocal enabledelayedexpansion

REM Nom du fichier de sortie
set OUTPUT=codesource.txt

REM Supprimer le fichier existant
if exist "%OUTPUT%" del "%OUTPUT%"

REM Extensions de fichiers à inclure
set EXTENSIONS=java kt kts xml js html css json txt pro properties toml gitignore py cpp h c
REM set EXTENSIONS=java kt kts js html css json txt pro properties toml gitignore py cpp h c

REM Exclusion de certains dossiers inutiles
set EXCLUDE_DIRS=.git build out .gradle .idea node_modules

echo ===============================================
echo 📂 Début de l'export du code source...
echo ===============================================

for %%E in (%EXTENSIONS%) do (
    echo 🔍 Recherche des fichiers *.%%E ...
    for /r %%A in (*.%%E) do (
        set SKIP=0
        REM Vérifier si le fichier est dans un dossier à exclure
        for %%D in (%EXCLUDE_DIRS%) do (
            echo %%A | findstr /i "\\%%D\\" >nul && set SKIP=1
        )
        if !SKIP! equ 0 (
            echo =============================================== >> "%OUTPUT%"
            echo Fichier : %%A >> "%OUTPUT%"
            echo =============================================== >> "%OUTPUT%"
            type "%%A" >> "%OUTPUT%"
            echo. >> "%OUTPUT%"
            echo. >> "%OUTPUT%"
        )
    )
)

echo.
echo ✅ Export terminé ! Le fichier %OUTPUT% contient tout le code source lisible.
pause
