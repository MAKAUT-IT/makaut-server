import mongoose, { Schema, Document } from 'mongoose';

export interface IAnnouncement extends Document {
    title: string;
    content: string;
    date: Date;
    type: 'notice' | 'exam' | 'assignment' | 'general';
}

const AnnouncementSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        date: { type: Date, default: Date.now },
        type: { type: String, enum: ['notice', 'exam', 'assignment', 'general'], default: 'general' },
    },
    { timestamps: true }
);

export default mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);
