@echo off
echo Checking for dependencies...
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)
echo Building the application...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo Build failed! Please check the errors above.
    pause
    exit /b %ERRORLEVEL%
)
echo Starting the production server...
call npm start
