import { Request, Response } from 'express';
import prisma from '../utils/prisma';

// Get all notices
export const getNotices = async (req: Request, res: Response) => {
    try {
        const { category } = req.query;

        const notices = await prisma.notice.findMany({
            where: category ? { category: category as string } : {},
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        role: true,
                    },
                },
            },
            orderBy: [
                { isPinned: 'desc' },
                { createdAt: 'desc' },
            ],
        });

        res.json(notices);
    } catch (error: any) {
        console.error('Get notices error:', error);
        res.status(500).json({ message: 'Failed to fetch notices' });
    }
};

// Get single notice
export const getNotice = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const notice = await prisma.notice.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        role: true,
                    },
                },
            },
        });

        if (!notice) {
            return res.status(404).json({ message: 'Notice not found' });
        }

        res.json(notice);
    } catch (error: any) {
        console.error('Get notice error:', error);
        res.status(500).json({ message: 'Failed to fetch notice' });
    }
};

// Create notice (Faculty/Admin only)
export const createNotice = async (req: Request, res: Response) => {
    try {
        const { title, content, category, isPinned } = req.body;
        const userId = (req as any).user.userId;
        const userRole = (req as any).user.role;

        // Check if user is faculty or admin
        if (userRole !== 'FACULTY' && userRole !== 'ADMIN') {
            return res.status(403).json({ message: 'Only faculty and admin can create notices' });
        }

        const notice = await prisma.notice.create({
            data: {
                title,
                content,
                category,
                isPinned: isPinned || false,
                authorId: userId,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        role: true,
                    },
                },
            },
        });

        res.status(201).json(notice);
    } catch (error: any) {
        console.error('Create notice error:', error);
        res.status(500).json({ message: 'Failed to create notice' });
    }
};

// Update notice
export const updateNotice = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, content, category, isPinned } = req.body;
        const userId = (req as any).user.userId;
        const userRole = (req as any).user.role;

        // Check if user is faculty or admin
        if (userRole !== 'FACULTY' && userRole !== 'ADMIN') {
            return res.status(403).json({ message: 'Only faculty and admin can update notices' });
        }

        // Check if notice exists and user is author or admin
        const existingNotice = await prisma.notice.findUnique({ where: { id } });
        if (!existingNotice) {
            return res.status(404).json({ message: 'Notice not found' });
        }

        if (existingNotice.authorId !== userId && userRole !== 'ADMIN') {
            return res.status(403).json({ message: 'You can only edit your own notices' });
        }

        const notice = await prisma.notice.update({
            where: { id },
            data: {
                title,
                content,
                category,
                isPinned,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        role: true,
                    },
                },
            },
        });

        res.json(notice);
    } catch (error: any) {
        console.error('Update notice error:', error);
        res.status(500).json({ message: 'Failed to update notice' });
    }
};

// Delete notice
export const deleteNotice = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = (req as any).user.userId;
        const userRole = (req as any).user.role;

        // Check if user is faculty or admin
        if (userRole !== 'FACULTY' && userRole !== 'ADMIN') {
            return res.status(403).json({ message: 'Only faculty and admin can delete notices' });
        }

        // Check if notice exists and user is author or admin
        const existingNotice = await prisma.notice.findUnique({ where: { id } });
        if (!existingNotice) {
            return res.status(404).json({ message: 'Notice not found' });
        }

        if (existingNotice.authorId !== userId && userRole !== 'ADMIN') {
            return res.status(403).json({ message: 'You can only delete your own notices' });
        }

        await prisma.notice.delete({ where: { id } });

        res.json({ message: 'Notice deleted successfully' });
    } catch (error: any) {
        console.error('Delete notice error:', error);
        res.status(500).json({ message: 'Failed to delete notice' });
    }
};
