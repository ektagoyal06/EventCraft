# -------- FRONTEND BUILD --------
FROM node:18-alpine as frontend

WORKDIR /app

# Copy root files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build frontend (if your frontend build command is different, change this)
RUN npm run build


# -------- BACKEND BUILD --------
FROM node:18-alpine as backend

WORKDIR /app

# Copy package.json again for backend install
COPY package*.json ./
RUN npm install

# Copy full project
COPY . .

# Copy built frontend into backend/public
COPY --from=frontend /app/dist ./public

EXPOSE 5000
CMD ["node", "server.js"]
