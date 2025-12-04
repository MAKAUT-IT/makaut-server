import express from "express";
import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getMyProfile,
  updateMyProfile,
} from "../controllers/student.controller";
import { protect, admin } from "../middlewares/auth.middleware";

const router = express.Router();

// Student can get/update their own profile
router.route("/me").get(protect, getMyProfile).put(protect, updateMyProfile);

router
  .route("/")
  .get(protect, admin, getStudents)
  .post(protect, admin, createStudent);
router
  .route("/:id")
  .get(protect, getStudentById)
  .put(protect, admin, updateStudent)
  .delete(protect, admin, deleteStudent);

export default router;
