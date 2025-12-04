import mongoose, { Schema, Document } from 'mongoose';

export interface IAttendance extends Document {
    student: mongoose.Types.ObjectId;
    subject: mongoose.Types.ObjectId;
    date: Date;
    status: 'present' | 'absent';
}

const AttendanceSchema: Schema = new Schema(
    {
        student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
        date: { type: Date, required: true },
        status: { type: String, enum: ['present', 'absent'], required: true },
    },
    { timestamps: true }
);

// Compound index to prevent duplicate attendance for same student, subject, and date
AttendanceSchema.index({ student: 1, subject: 1, date: 1 }, { unique: true });

export default mongoose.model<IAttendance>('Attendance', AttendanceSchema);
