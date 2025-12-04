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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("./models/User"));
const Subject_1 = __importDefault(require("./models/Subject"));
const Announcement_1 = __importDefault(require("./models/Announcement"));
dotenv_1.default.config();
const seedData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/university-portal');
        console.log('Connected to MongoDB');
        // Clear existing data
        yield User_1.default.deleteMany({});
        yield Subject_1.default.deleteMany({});
        yield Announcement_1.default.deleteMany({});
        // Create Admin
        const admin = yield User_1.default.create({
            name: 'Admin User',
            email: 'admin@university.edu',
            password: 'adminpassword',
            role: 'admin',
        });
        console.log('Admin created:', admin.email);
        // Create Student
        const student = yield User_1.default.create({
            name: 'John Doe',
            email: 'student@university.edu',
            password: 'studentpassword',
            role: 'student',
            rollNo: 'CS101',
            regNo: '2023001',
            course: 'B.Tech CS',
            semester: 3,
        });
        console.log('Student created:', student.email);
        // Create Subjects
        const subjects = yield Subject_1.default.create([
            { name: 'Data Structures', code: 'CS201', faculty: 'Dr. Smith', credits: 4, semester: 3, course: 'B.Tech CS' },
            { name: 'Database Management', code: 'CS202', faculty: 'Prof. Johnson', credits: 3, semester: 3, course: 'B.Tech CS' },
            { name: 'Operating Systems', code: 'CS203', faculty: 'Dr. Williams', credits: 4, semester: 3, course: 'B.Tech CS' },
        ]);
        console.log('Subjects created:', subjects.length);
        // Create Announcements
        yield Announcement_1.default.create([
            { title: 'Mid-Sem Exams', content: 'Mid-semester exams will start from 15th Oct.', type: 'exam' },
            { title: 'Holiday Notice', content: 'University will remain closed on Friday.', type: 'notice' },
        ]);
        console.log('Announcements created');
        process.exit();
    }
    catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
});
seedData();
