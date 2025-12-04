"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const attendance_controller_1 = require("../controllers/attendance.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post('/upload', auth_middleware_1.protect, auth_middleware_1.admin, attendance_controller_1.uploadAttendance);
router.get('/:studentId', auth_middleware_1.protect, attendance_controller_1.getAttendance); // Student can view their own, admin can view any. Logic in controller or here?
// Ideally, check if req.user.id === studentId OR req.user.role === 'admin'
exports.default = router;
