"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mark_controller_1 = require("../controllers/mark.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post('/', auth_middleware_1.protect, auth_middleware_1.admin, mark_controller_1.uploadMarks);
router.get('/:studentId', auth_middleware_1.protect, mark_controller_1.getMarks);
exports.default = router;
