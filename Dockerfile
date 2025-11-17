# -------- FRONTEND BUILD --------
FROM node:18-alpine as frontend

WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


# -------- BACKEND BUILD --------
FROM node:18-alpine as backend

WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./ 
RUN npm install

# Copy backend code
COPY backend ./ 

# Copy built frontend into backend/public
COPY --from=frontend /frontend/dist ./public

EXPOSE 5000

CMD ["node", "server.js"]
