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
exports.getAttendance = exports.uploadAttendance = void 0;
const Attendance_1 = __importDefault(require("../models/Attendance"));
const uploadAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, subjectId, date, status } = req.body;
    try {
        const attendance = yield Attendance_1.default.create({
            student: studentId,
            subject: subjectId,
            date,
            status,
        });
        res.status(201).json(attendance);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.uploadAttendance = uploadAttendance;
const getAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    try {
        const attendance = yield Attendance_1.default.find({ student: studentId })
            .populate('subject', 'name code')
            .sort({ date: -1 });
        res.json(attendance);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getAttendance = getAttendance;
