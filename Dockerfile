FROM node:18-alpine

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies (using --legacy-peer-deps to avoid potential conflicts with older Prisma/React versions)
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000

# Start command (with database migration/seed check optionally, but keeping it simple)
CMD ["npm", "start"]
