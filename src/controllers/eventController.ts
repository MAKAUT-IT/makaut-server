import { Request, Response } from 'express';
import prisma from '../utils/prisma';

// Get all events
export const getEvents = async (req: Request, res: Response) => {
    try {
        const { category, month, year } = req.query;

        const where: any = {};

        if (category) {
            where.category = category;
        }

        if (month && year) {
            const startDate = new Date(parseInt(year as string), parseInt(month as string) - 1, 1);
            const endDate = new Date(parseInt(year as string), parseInt(month as string), 0);
            where.date = {
                gte: startDate,
                lte: endDate,
            };
        }

        const events = await prisma.event.findMany({
            where,
            include: {
                creator: {
                    select: {
                        id: true,
                        name: true,
                        role: true,
                    },
                },
            },
            orderBy: { date: 'asc' },
        });

        res.json(events);
    } catch (error: any) {
        console.error('Get events error:', error);
        res.status(500).json({ message: 'Failed to fetch events' });
    }
};

// Create event (Faculty/Admin only)
export const createEvent = async (req: Request, res: Response) => {
    try {
        const { title, description, date, category } = req.body;
        const userId = (req as any).user.userId;
        const userRole = (req as any).user.role;

        if (userRole !== 'FACULTY' && userRole !== 'ADMIN') {
            return res.status(403).json({ message: 'Only faculty and admin can create events' });
        }

        const event = await prisma.event.create({
            data: {
                title,
                description,
                date: new Date(date),
                category,
                createdBy: userId,
            },
            include: {
                creator: {
                    select: {
                        id: true,
                        name: true,
                        role: true,
                    },
                },
            },
        });

        res.status(201).json(event);
    } catch (error: any) {
        console.error('Create event error:', error);
        res.status(500).json({ message: 'Failed to create event' });
    }
};

// Update event
export const updateEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, date, category } = req.body;
        const userId = (req as any).user.userId;
        const userRole = (req as any).user.role;

        if (userRole !== 'FACULTY' && userRole !== 'ADMIN') {
            return res.status(403).json({ message: 'Only faculty and admin can update events' });
        }

        const existingEvent = await prisma.event.findUnique({ where: { id } });
        if (!existingEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (existingEvent.createdBy !== userId && userRole !== 'ADMIN') {
            return res.status(403).json({ message: 'You can only edit your own events' });
        }

        const event = await prisma.event.update({
            where: { id },
            data: {
                title,
                description,
                date: new Date(date),
                category,
            },
            include: {
                creator: {
                    select: {
                        id: true,
                        name: true,
                        role: true,
                    },
                },
            },
        });

        res.json(event);
    } catch (error: any) {
        console.error('Update event error:', error);
        res.status(500).json({ message: 'Failed to update event' });
    }
};

// Delete event
export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = (req as any).user.userId;
        const userRole = (req as any).user.role;

        if (userRole !== 'FACULTY' && userRole !== 'ADMIN') {
            return res.status(403).json({ message: 'Only faculty and admin can delete events' });
        }

        const existingEvent = await prisma.event.findUnique({ where: { id } });
        if (!existingEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (existingEvent.createdBy !== userId && userRole !== 'ADMIN') {
            return res.status(403).json({ message: 'You can only delete your own events' });
        }

        await prisma.event.delete({ where: { id } });

        res.json({ message: 'Event deleted successfully' });
    } catch (error: any) {
        console.error('Delete event error:', error);
        res.status(500).json({ message: 'Failed to delete event' });
    }
};
