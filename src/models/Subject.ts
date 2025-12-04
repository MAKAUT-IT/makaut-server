import mongoose, { Schema, Document } from 'mongoose';

export interface ISubject extends Document {
    name: string;
    code: string;
    faculty: string;
    credits: number;
    semester: number;
    course: string;
}

const SubjectSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        code: { type: String, required: true, unique: true },
        faculty: { type: String, required: true },
        credits: { type: Number, required: true },
        semester: { type: Number, required: true },
        course: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<ISubject>('Subject', SubjectSchema);
