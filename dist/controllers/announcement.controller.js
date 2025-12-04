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
exports.deleteAnnouncement = exports.updateAnnouncement = exports.createAnnouncement = exports.getAnnouncements = void 0;
const Announcement_1 = __importDefault(require("../models/Announcement"));
const getAnnouncements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const announcements = yield Announcement_1.default.find({}).sort({ date: -1 });
        res.json(announcements);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getAnnouncements = getAnnouncements;
const createAnnouncement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, type } = req.body;
    try {
        const announcement = yield Announcement_1.default.create({
            title,
            content,
            type,
        });
        res.status(201).json(announcement);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.createAnnouncement = createAnnouncement;
const updateAnnouncement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, type } = req.body;
    try {
        const announcement = yield Announcement_1.default.findById(req.params.id);
        if (announcement) {
            announcement.title = title || announcement.title;
            announcement.content = content || announcement.content;
            announcement.type = type || announcement.type;
            const updatedAnnouncement = yield announcement.save();
            res.json(updatedAnnouncement);
        }
        else {
            res.status(404).json({ message: "Announcement not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.updateAnnouncement = updateAnnouncement;
const deleteAnnouncement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const announcement = yield Announcement_1.default.findById(req.params.id);
        if (announcement) {
            yield announcement.deleteOne();
            res.json({ message: "Announcement removed" });
        }
        else {
            res.status(404).json({ message: "Announcement not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.deleteAnnouncement = deleteAnnouncement;
