# -------- FRONTEND BUILD --------
FROM node:18-alpine AS frontend

WORKDIR /frontend

# Copy frontend package files (root package.json)
COPY package*.json ./
RUN npm install

# Copy Vite React frontend code
COPY . .

# Build frontend
RUN npm run build


# -------- BACKEND BUILD --------
FROM node:18-alpine AS backend

WORKDIR /app

# Copy backend package.json
COPY backend/package*.json ./
RUN npm install

# Copy backend source code
COPY backend/ .

# Copy built frontend into backend/public
COPY --from=frontend /frontend/dist ./public

EXPOSE 5000

CMD ["node", "server.js"]
