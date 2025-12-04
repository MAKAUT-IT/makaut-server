import { Request, Response } from 'express';
import Mark from '../models/Mark';

export const uploadMarks = async (req: Request, res: Response) => {
    const { studentId, subjectId, examType, marksObtained, maxMarks } = req.body;

    try {
        const mark = await Mark.create({
            student: studentId,
            subject: subjectId,
            examType,
            marksObtained,
            maxMarks,
        });
        res.status(201).json(mark);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getMarks = async (req: Request, res: Response) => {
    const { studentId } = req.params;

    try {
        const marks = await Mark.find({ student: studentId }).populate('subject', 'name code');
        res.json(marks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
