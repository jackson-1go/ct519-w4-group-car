import express from 'express';
import multer from 'multer';
import { prisma } from '../db';
const router = express.Router();
const upload = multer({ dest: 'uploads/users/' });
router.get('/', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(req.params.id) }
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, nickname, studentNumber } = req.body;
        const image = req.file ? req.file.filename : null;
        const user = await prisma.user.create({
            data: { name, nickname, studentNumber, image }
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { name, nickname, studentNumber } = req.body;
        const image = req.file ? req.file.filename : undefined;
        const data = { name, nickname, studentNumber };
        if (image)
            data.image = image;
        const user = await prisma.user.update({
            where: { id: Number(req.params.id) },
            data
        });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        await prisma.user.delete({ where: { id: Number(req.params.id) } });
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});
export default router;
//# sourceMappingURL=users.js.map