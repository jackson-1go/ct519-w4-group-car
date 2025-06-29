# Backend Docker Image
FROM oven/bun:1

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY backend/package.json backend/tsconfig.json ./
RUN bun install

COPY backend/prisma ./prisma
COPY backend/src ./src

RUN bun run prisma generate

RUN mkdir -p uploads/users uploads/cars

EXPOSE 3000

CMD ["bun", "run", "src/index.ts"]