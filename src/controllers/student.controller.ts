import { Request, Response } from "express";
import User from "../models/User";
import { z } from "zod";

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

const studentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rollNo: z.string().optional(),
  regNo: z.string().optional(),
  course: z.string().optional(),
  semester: z.number().optional(),
});

const updateStudentSchema = studentSchema
  .partial()
  .omit({ password: true })
  .extend({
    password: z.string().min(6).optional(),
  });

export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await User.find({ role: "student" }).select("-password");
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await User.findById(req.params.id).select("-password");
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createStudent = async (req: Request, res: Response) => {
  const validation = studentSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({ message: validation.error.errors[0].message });
    return;
  }

  const { name, email, password, rollNo, regNo, course, semester } =
    validation.data;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const student = await User.create({
      name,
      email,
      password,
      role: "student",
      rollNo,
      regNo,
      course,
      semester,
    });

    if (student) {
      res.status(201).json({
        _id: student._id,
        name: student.name,
        email: student.email,
        role: student.role,
      });
    } else {
      res.status(400).json({ message: "Invalid student data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  const validation = updateStudentSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({ message: validation.error.errors[0].message });
    return;
  }

  try {
    const student = await User.findById(req.params.id);

    if (student) {
      student.name = validation.data.name || student.name;
      student.email = validation.data.email || student.email;
      student.rollNo = validation.data.rollNo || student.rollNo;
      student.regNo = validation.data.regNo || student.regNo;
      student.course = validation.data.course || student.course;
      student.semester = validation.data.semester || student.semester;

      if (validation.data.password) {
        student.password = validation.data.password; // Will be hashed by pre-save hook
      }

      const updatedStudent = await student.save();
      res.json({
        _id: updatedStudent._id,
        name: updatedStudent.name,
        email: updatedStudent.email,
        role: updatedStudent.role,
      });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const student = await User.findById(req.params.id);

    if (student) {
      await student.deleteOne();
      res.json({ message: "Student removed" });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get current student's own profile
export const getMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const student = await User.findById(req.user?.id).select("-password");
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update current student's own profile
export const updateMyProfile = async (req: AuthRequest, res: Response) => {
  const validation = updateStudentSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({ message: validation.error.errors[0].message });
    return;
  }

  try {
    const student = await User.findById(req.user?.id);

    if (student) {
      student.name = validation.data.name || student.name;
      student.email = validation.data.email || student.email;
      student.rollNo = validation.data.rollNo || student.rollNo;
      student.regNo = validation.data.regNo || student.regNo;
      student.course = validation.data.course || student.course;
      student.semester = validation.data.semester || student.semester;

      if (validation.data.password) {
        student.password = validation.data.password;
      }

      const updatedStudent = await student.save();
      res.json({
        _id: updatedStudent._id,
        name: updatedStudent.name,
        email: updatedStudent.email,
        role: updatedStudent.role,
        rollNo: updatedStudent.rollNo,
        regNo: updatedStudent.regNo,
        course: updatedStudent.course,
        semester: updatedStudent.semester,
      });
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
