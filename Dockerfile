# Backend Docker Image
FROM oven/bun:1 as backend

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY backend/package.json backend/tsconfig.json ./
RUN bun install

COPY backend/prisma ./prisma
COPY backend/src ./src
COPY backend/entrypoint.sh ./entrypoint.sh

RUN bun run prisma generate
RUN chmod +x ./entrypoint.sh

RUN mkdir -p uploads/users uploads/cars

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]
CMD ["bun", "run", "src/index.ts"]

# Frontend Docker Image
FROM node:18-alpine as frontend

WORKDIR /app/frontend

# Copy package.json and install dependencies
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install

# Copy frontend source code
COPY frontend/src ./src
COPY frontend/public ./public

EXPOSE 3000

ENTRYPOINT ["sh", "-c", "npm start"]

# Frontend build stage
FROM node:18-alpine as frontend-build

WORKDIR /app/frontend

# Copy package.json and install dependencies
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci --only=production

# Copy frontend source code
COPY frontend/src ./src
COPY frontend/public ./public

# Build the React app
RUN npm run build

# Production stage for frontend
FROM nginx:alpine as frontend-prod

# Copy built React app to nginx
COPY --from=frontend-build /app/frontend/build /usr/share/nginx/html

# Copy custom nginx configuration if needed
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
