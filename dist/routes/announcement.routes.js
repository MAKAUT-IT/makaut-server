"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const announcement_controller_1 = require("../controllers/announcement.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router
    .route("/")
    .get(auth_middleware_1.protect, announcement_controller_1.getAnnouncements)
    .post(auth_middleware_1.protect, auth_middleware_1.admin, announcement_controller_1.createAnnouncement);
router
    .route("/:id")
    .put(auth_middleware_1.protect, auth_middleware_1.admin, announcement_controller_1.updateAnnouncement)
    .delete(auth_middleware_1.protect, auth_middleware_1.admin, announcement_controller_1.deleteAnnouncement);
exports.default = router;
