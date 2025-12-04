"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("../controllers/student.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
// Student can get/update their own profile
router.route("/me").get(auth_middleware_1.protect, student_controller_1.getMyProfile).put(auth_middleware_1.protect, student_controller_1.updateMyProfile);
router
    .route("/")
    .get(auth_middleware_1.protect, auth_middleware_1.admin, student_controller_1.getStudents)
    .post(auth_middleware_1.protect, auth_middleware_1.admin, student_controller_1.createStudent);
router
    .route("/:id")
    .get(auth_middleware_1.protect, student_controller_1.getStudentById)
    .put(auth_middleware_1.protect, auth_middleware_1.admin, student_controller_1.updateStudent)
    .delete(auth_middleware_1.protect, auth_middleware_1.admin, student_controller_1.deleteStudent);
exports.default = router;
