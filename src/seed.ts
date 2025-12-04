import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import Subject from './models/Subject';
import Announcement from './models/Announcement';

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/university-portal');
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Subject.deleteMany({});
        await Announcement.deleteMany({});

        // Create Admin
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@university.edu',
            password: 'adminpassword',
            role: 'admin',
        });
        console.log('Admin created:', admin.email);

        // Create Student
        const student = await User.create({
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
        const subjects = await Subject.create([
            { name: 'Data Structures', code: 'CS201', faculty: 'Dr. Smith', credits: 4, semester: 3, course: 'B.Tech CS' },
            { name: 'Database Management', code: 'CS202', faculty: 'Prof. Johnson', credits: 3, semester: 3, course: 'B.Tech CS' },
            { name: 'Operating Systems', code: 'CS203', faculty: 'Dr. Williams', credits: 4, semester: 3, course: 'B.Tech CS' },
        ]);
        console.log('Subjects created:', subjects.length);

        // Create Announcements
        await Announcement.create([
            { title: 'Mid-Sem Exams', content: 'Mid-semester exams will start from 15th Oct.', type: 'exam' },
            { title: 'Holiday Notice', content: 'University will remain closed on Friday.', type: 'notice' },
        ]);
        console.log('Announcements created');

        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
