import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middlewares/error.middleware';

import authRoutes from './routes/auth.routes';
import studentRoutes from './routes/student.routes';
import subjectRoutes from './routes/subject.routes';
import attendanceRoutes from './routes/attendance.routes';
import markRoutes from './routes/mark.routes';
import announcementRoutes from './routes/announcement.routes';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/marks', markRoutes);
app.use('/api/announcements', announcementRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'University Portal API is running' });
});

// Error Handler
app.use(errorHandler);

export default app;
