"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subject_controller_1 = require("../controllers/subject.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.route("/").get(auth_middleware_1.protect, subject_controller_1.getSubjects).post(auth_middleware_1.protect, auth_middleware_1.admin, subject_controller_1.createSubject);
router
    .route("/:id")
    .put(auth_middleware_1.protect, auth_middleware_1.admin, subject_controller_1.updateSubject)
    .delete(auth_middleware_1.protect, auth_middleware_1.admin, subject_controller_1.deleteSubject);
exports.default = router;
