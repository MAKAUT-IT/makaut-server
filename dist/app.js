"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const error_middleware_1 = require("./middlewares/error.middleware");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const student_routes_1 = __importDefault(require("./routes/student.routes"));
const subject_routes_1 = __importDefault(require("./routes/subject.routes"));
const attendance_routes_1 = __importDefault(require("./routes/attendance.routes"));
const mark_routes_1 = __importDefault(require("./routes/mark.routes"));
const announcement_routes_1 = __importDefault(require("./routes/announcement.routes"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/students', student_routes_1.default);
app.use('/api/subjects', subject_routes_1.default);
app.use('/api/attendance', attendance_routes_1.default);
app.use('/api/marks', mark_routes_1.default);
app.use('/api/announcements', announcement_routes_1.default);
app.get('/', (req, res) => {
    res.json({ message: 'University Portal API is running' });
});
// Error Handler
app.use(error_middleware_1.errorHandler);
exports.default = app;
