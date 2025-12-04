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
exports.deleteSubject = exports.updateSubject = exports.createSubject = exports.getSubjects = void 0;
const Subject_1 = __importDefault(require("../models/Subject"));
const getSubjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subjects = yield Subject_1.default.find({});
        res.json(subjects);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getSubjects = getSubjects;
const createSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, code, faculty, credits, semester, course } = req.body;
    try {
        const subject = yield Subject_1.default.create({
            name,
            code,
            faculty,
            credits,
            semester,
            course,
        });
        res.status(201).json(subject);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.createSubject = createSubject;
const updateSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, code, faculty, credits, semester, course } = req.body;
    try {
        const subject = yield Subject_1.default.findById(req.params.id);
        if (subject) {
            subject.name = name || subject.name;
            subject.code = code || subject.code;
            subject.faculty = faculty || subject.faculty;
            subject.credits = credits || subject.credits;
            subject.semester = semester || subject.semester;
            subject.course = course || subject.course;
            const updatedSubject = yield subject.save();
            res.json(updatedSubject);
        }
        else {
            res.status(404).json({ message: "Subject not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.updateSubject = updateSubject;
const deleteSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subject = yield Subject_1.default.findById(req.params.id);
        if (subject) {
            yield subject.deleteOne();
            res.json({ message: "Subject removed" });
        }
        else {
            res.status(404).json({ message: "Subject not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.deleteSubject = deleteSubject;
