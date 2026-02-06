@echo off
echo Installing Prisma...
call npm install prisma --save-dev
call npm install @prisma/client
echo Initializing Prisma with SQLite...
call npx prisma init --datasource-provider sqlite
echo Setup complete.
