import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users';
import carsRouter from './routes/cars';
import path from 'path';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/api/users', usersRouter);
app.use('/api/cars', carsRouter);
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
//# sourceMappingURL=index.js.map