import mongoose, { Schema, Document } from 'mongoose';

export interface IMark extends Document {
    student: mongoose.Types.ObjectId;
    subject: mongoose.Types.ObjectId;
    examType: 'internal1' | 'internal2' | 'assignment';
    marksObtained: number;
    maxMarks: number;
}

const MarkSchema: Schema = new Schema(
    {
        student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
        examType: { type: String, enum: ['internal1', 'internal2', 'assignment'], required: true },
        marksObtained: { type: Number, required: true },
        maxMarks: { type: Number, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IMark>('Mark', MarkSchema);
