# Backend API Server

Express.js + TypeScript + Prisma + MySQL backend server

## Features

- User management (CRUD operations)
- Car management (CRUD operations)
- File upload support for images
- TypeScript for type safety
- Prisma ORM for database operations
- CORS enabled

## Prerequisites

- Node.js (v18 or higher) or Bun
- MySQL database

## Setup

1. Install dependencies:
```bash
bun install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update `.env` with your database credentials:
```
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
PORT=3000
NODE_ENV=development
```

4. Generate Prisma client and run migrations:
```bash
bun run prisma generate
bun run prisma db push
```

5. Start development server:
```bash
bun run dev
```

## API Endpoints

### Health Check
- `GET /health` - Server health check

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user (with image upload)
- `PUT /api/users/:id` - Update user (with image upload)
- `DELETE /api/users/:id` - Delete user

### Cars
- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get car by ID
- `POST /api/cars` - Create new car (with image upload)
- `PUT /api/cars/:id` - Update car (with image upload)
- `DELETE /api/cars/:id` - Delete car

### File Uploads
- Images are stored in `uploads/` directory
- Accessible via `/uploads/{filename}`

## Request Examples

### Create User
```bash
curl -X POST http://localhost:3000/api/users \
  -F "name=John Doe" \
  -F "nickname=Johnny" \
  -F "studentNumber=12345" \
  -F "image=@profile.jpg"
```

### Create Car
```bash
curl -X POST http://localhost:3000/api/cars \
  -F "brand=Toyota" \
  -F "model=Camry" \
  -F "year=2023" \
  -F "image=@car.jpg"
```

## Project Structure

```
src/
├── index.ts          # Main server file
├── db.ts             # Prisma client setup
└── routes/
    ├── users.ts      # User routes
    └── cars.ts       # Car routes
```

## Development

- Development server: `bun run dev`
- Build: `bun run build`
- Production: `bun run start`
