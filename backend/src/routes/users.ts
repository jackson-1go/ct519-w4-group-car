import express, { Request, Response } from 'express';
import multer from 'multer';
import { prisma } from '../db';
import path from 'path';

const router = express.Router();

// Simple multer configuration
const upload = multer({ 
  dest: 'uploads/users/',
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});

// Multer error handling middleware
const handleMulterError = (error: any, req: Request, res: Response, next: any) => {
  if (error instanceof multer.MulterError) {
    console.error('Multer error:', error);
    return res.status(400).json({
      error: 'File upload error',
      details: error.message,
      code: error.code
    });
  } else if (error) {
    console.error('Upload error:', error);
    return res.status(400).json({
      error: 'Upload failed',
      details: error.message
    });
  }
  next();
};

// GET all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) }
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const imageUrl = user.image
      ? `${req.protocol}://${req.get('host')}/uploads/users/${user.image}`
      : null;

    res.json({
      ...user,
      imageUrl
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// POST create user
router.post('/', upload.single('image'), handleMulterError, async (req: Request, res: Response) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);

    const { name, nickname, studentNumber } = req.body;
    
    // Validate required fields
    if (!name || !nickname || !studentNumber) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['name', 'nickname', 'studentNumber'],
        received: { name, nickname, studentNumber }
      });
    }

    // Check if student number already exists
    const existingUser = await prisma.user.findUnique({
      where: { studentNumber: studentNumber }
    });

    if (existingUser) {
      return res.status(409).json({ 
        error: 'Student number already exists',
        studentNumber 
      });
    }

    const image = req.file ? req.file.filename : null;
    
    const user = await prisma.user.create({
      data: { 
        name: name.trim(), 
        nickname: nickname.trim(), 
        studentNumber: studentNumber.trim(), 
        image 
      }
    });

    console.log('User created successfully:', user);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    
    // Handle Prisma specific errors
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        return res.status(409).json({ 
          error: 'Student number already exists' 
        });
      }
    }
    
    res.status(500).json({ 
      error: 'Failed to create user',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// PUT update user
router.put('/:id', upload.single('image'), handleMulterError, async (req: Request, res: Response) => {
  try {
    const { name, nickname, studentNumber } = req.body;
    const image = req.file ? req.file.filename : undefined;
    const data: any = { name, nickname, studentNumber };
    if (image) data.image = image;
    
    const user = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// DELETE user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await prisma.user.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;