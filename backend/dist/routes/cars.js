import express from 'express';
import multer from 'multer';
import { prisma } from '../db';
const router = express.Router();
const upload = multer({ dest: 'uploads/cars/' });
router.get('/', async (req, res) => {
    try {
        const cars = await prisma.car.findMany();
        res.json(cars);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch cars' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const car = await prisma.car.findUnique({
            where: { id: Number(req.params.id) }
        });
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.json(car);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch car' });
    }
});
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { brand, model, year } = req.body;
        const image = req.file ? req.file.filename : null;
        const car = await prisma.car.create({
            data: { brand, model, year: Number(year), image }
        });
        res.status(201).json(car);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create car' });
    }
});
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { brand, model, year } = req.body;
        const image = req.file ? req.file.filename : undefined;
        const data = { brand, model, year: Number(year) };
        if (image)
            data.image = image;
        const car = await prisma.car.update({
            where: { id: Number(req.params.id) },
            data
        });
        res.json(car);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update car' });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        await prisma.car.delete({ where: { id: Number(req.params.id) } });
        res.json({ message: 'Car deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete car' });
    }
});
export default router;
//# sourceMappingURL=cars.js.map