import { Request, Response } from "express";
import Subject from "../models/Subject";

export const getSubjects = async (req: Request, res: Response) => {
  try {
    const subjects = await Subject.find({});
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createSubject = async (req: Request, res: Response) => {
  const { name, code, faculty, credits, semester, course } = req.body;

  try {
    const subject = await Subject.create({
      name,
      code,
      faculty,
      credits,
      semester,
      course,
    });
    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateSubject = async (req: Request, res: Response) => {
  const { name, code, faculty, credits, semester, course } = req.body;

  try {
    const subject = await Subject.findById(req.params.id);

    if (subject) {
      subject.name = name || subject.name;
      subject.code = code || subject.code;
      subject.faculty = faculty || subject.faculty;
      subject.credits = credits || subject.credits;
      subject.semester = semester || subject.semester;
      subject.course = course || subject.course;

      const updatedSubject = await subject.save();
      res.json(updatedSubject);
    } else {
      res.status(404).json({ message: "Subject not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteSubject = async (req: Request, res: Response) => {
  try {
    const subject = await Subject.findById(req.params.id);

    if (subject) {
      await subject.deleteOne();
      res.json({ message: "Subject removed" });
    } else {
      res.status(404).json({ message: "Subject not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
