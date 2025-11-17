# ---------------- FRONTEND BUILD ----------------
FROM node:18-alpine AS frontend

# Set working directory
WORKDIR /frontend

# Copy frontend package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend source code
COPY frontend/ ./

# Build the frontend for production
RUN npm run build



# ---------------- BACKEND BUILD ----------------
FROM node:18-alpine AS backend

WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy backend source code
COPY backend/ ./


# ---------------- FINAL IMAGE ----------------
FROM node:18-alpine

WORKDIR /app

# Copy backend code from backend stage
COPY --from=backend /app ./

# Copy built frontend into backend public folder
COPY --from=frontend /frontend/dist ./public

EXPOSE 5000

CMD ["node", "server.js"]
