import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import auth from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get all blogs
router.get('/', async (_req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        likes: {
          select: {
            id: true,
            userId: true,
          },
        },
      },
    });
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: req.params.id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        likes: {
          select: {
            id: true,
            userId: true,
          },
        },
      },
    });
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new blog
router.post('/', auth, async (req, res) => {
  const { title, content, teamId } = req.body;
  try {
    const newBlog = await prisma.blog.create({
      data: {
        title,
        content,
        author: { connect: { id: req.user.id } },
        ...(teamId && { team: { connect: { id: teamId } } }),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
    res.status(201).json(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update blog
router.put('/:id', auth, async (req, res) => {
  const { title, content, published } = req.body;
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: req.params.id },
      select: { authorId: true },
    });
    
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (blog.authorId !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    const updatedBlog = await prisma.blog.update({
      where: { id: req.params.id },
      data: { title, content, published },
    });
    res.json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete blog
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: req.params.id },
      select: { authorId: true },
    });
    
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (blog.authorId !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    await prisma.like.deleteMany({ where: { blogId: req.params.id } });
    await prisma.blog.delete({ where: { id: req.params.id } });
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Like a blog
router.post('/:id/like', auth, async (req, res) => {
  try {
    const blog = await prisma.blog.findUnique({ where: { id: req.params.id } });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const existingLike = await prisma.like.findUnique({
      where: { userId_blogId: { userId: req.user.id, blogId: req.params.id } },
    });
    if (existingLike) return res.status(400).json({ message: 'Already liked' });

    const like = await prisma.like.create({
      data: {
        user: { connect: { id: req.user.id } },
        blog: { connect: { id: req.params.id } },
      },
    });
    res.status(201).json(like);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Unlike a blog
router.delete('/:id/like', auth, async (req, res) => {
  try {
    const like = await prisma.like.findUnique({
      where: { userId_blogId: { userId: req.user.id, blogId: req.params.id } },
    });
    if (!like) return res.status(404).json({ message: 'Like not found' });

    await prisma.like.delete({
      where: { userId_blogId: { userId: req.user.id, blogId: req.params.id } },
    });
    res.json({ message: 'Blog unliked' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
