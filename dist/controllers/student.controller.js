"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMyProfile = exports.getMyProfile = exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudentById = exports.getStudents = void 0;
const User_1 = __importDefault(require("../models/User"));
const zod_1 = require("zod");
const studentSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    rollNo: zod_1.z.string().optional(),
    regNo: zod_1.z.string().optional(),
    course: zod_1.z.string().optional(),
    semester: zod_1.z.number().optional(),
});
const updateStudentSchema = studentSchema
    .partial()
    .omit({ password: true })
    .extend({
    password: zod_1.z.string().min(6).optional(),
});
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield User_1.default.find({ role: "student" }).select("-password");
        res.json(students);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getStudents = getStudents;
const getStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield User_1.default.findById(req.params.id).select("-password");
        if (student) {
            res.json(student);
        }
        else {
            res.status(404).json({ message: "Student not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getStudentById = getStudentById;
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = studentSchema.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({ message: validation.error.errors[0].message });
        return;
    }
    const { name, email, password, rollNo, regNo, course, semester } = validation.data;
    try {
        const userExists = yield User_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const student = yield User_1.default.create({
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
        }
        else {
            res.status(400).json({ message: "Invalid student data" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.createStudent = createStudent;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = updateStudentSchema.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({ message: validation.error.errors[0].message });
        return;
    }
    try {
        const student = yield User_1.default.findById(req.params.id);
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
            const updatedStudent = yield student.save();
            res.json({
                _id: updatedStudent._id,
                name: updatedStudent.name,
                email: updatedStudent.email,
                role: updatedStudent.role,
            });
        }
        else {
            res.status(404).json({ message: "Student not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.updateStudent = updateStudent;
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield User_1.default.findById(req.params.id);
        if (student) {
            yield student.deleteOne();
            res.json({ message: "Student removed" });
        }
        else {
            res.status(404).json({ message: "Student not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.deleteStudent = deleteStudent;
// Get current student's own profile
const getMyProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const student = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id).select("-password");
        if (student) {
            res.json(student);
        }
        else {
            res.status(404).json({ message: "Profile not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getMyProfile = getMyProfile;
// Update current student's own profile
const updateMyProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const validation = updateStudentSchema.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({ message: validation.error.errors[0].message });
        return;
    }
    try {
        const student = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
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
            const updatedStudent = yield student.save();
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
        }
        else {
            res.status(404).json({ message: "Profile not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.updateMyProfile = updateMyProfile;
