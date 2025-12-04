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
exports.getMarks = exports.uploadMarks = void 0;
const Mark_1 = __importDefault(require("../models/Mark"));
const uploadMarks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, subjectId, examType, marksObtained, maxMarks } = req.body;
    try {
        const mark = yield Mark_1.default.create({
            student: studentId,
            subject: subjectId,
            examType,
            marksObtained,
            maxMarks,
        });
        res.status(201).json(mark);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.uploadMarks = uploadMarks;
const getMarks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    try {
        const marks = yield Mark_1.default.find({ student: studentId }).populate('subject', 'name code');
        res.json(marks);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getMarks = getMarks;
