import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import prisma from './utils/prisma';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));


app.use(express.json());

// Health check endpoint
app.get('/health', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.json({ status: 'ok', database: 'connected' });
    } catch (error: any) {
        res.status(500).json({ status: 'error', database: 'disconnected', error: error.message });
    }
});

app.use('/api/auth', authRoutes);

import noticeRoutes from './routes/noticeRoutes';
import eventRoutes from './routes/eventRoutes';

app.use('/api/notices', noticeRoutes);
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
    res.send('B.Tech IT Department Website API');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
