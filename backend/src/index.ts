import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users';
import carsRouter from './routes/cars';
import path from 'path';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use('/api/users', usersRouter);
app.use('/api/cars', carsRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));