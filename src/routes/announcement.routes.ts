import express from "express";
import {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcement.controller";
import { protect, admin } from "../middlewares/auth.middleware";

const router = express.Router();

router
  .route("/")
  .get(protect, getAnnouncements)
  .post(protect, admin, createAnnouncement);
router
  .route("/:id")
  .put(protect, admin, updateAnnouncement)
  .delete(protect, admin, deleteAnnouncement);

export default router;
