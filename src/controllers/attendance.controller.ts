import { Request, Response } from 'express';
import Attendance from '../models/Attendance';
import User from '../models/User';
import Subject from '../models/Subject';

export const uploadAttendance = async (req: Request, res: Response) => {
    const { studentId, subjectId, date, status } = req.body;

    try {
        const attendance = await Attendance.create({
            student: studentId,
            subject: subjectId,
            date,
            status,
        });
        res.status(201).json(attendance);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getAttendance = async (req: Request, res: Response) => {
    const { studentId } = req.params;

    try {
        const attendance = await Attendance.find({ student: studentId })
            .populate('subject', 'name code')
            .sort({ date: -1 });
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
