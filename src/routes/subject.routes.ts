import express from "express";
import {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
} from "../controllers/subject.controller";
import { protect, admin } from "../middlewares/auth.middleware";

const router = express.Router();

router.route("/").get(protect, getSubjects).post(protect, admin, createSubject);
router
  .route("/:id")
  .put(protect, admin, updateSubject)
  .delete(protect, admin, deleteSubject);

export default router;
