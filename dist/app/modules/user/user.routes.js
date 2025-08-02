"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_validation_1 = require("./user.validation");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("./user.interface");
const router = express_1.default.Router();
// ! register user
router.post("/register", (0, validateRequest_1.validateRequest)(user_validation_1.createUserZodSchema), user_controller_1.UserControllers.createUser);
// ! get all user by admin
router.get("/", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), user_controller_1.UserControllers.getAllUsers);
// ! block user by admin
router.patch("/block/:userId", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), user_controller_1.UserControllers.blockUser);
// ! unblock user by admin
router.patch("/unblock/:userId", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), user_controller_1.UserControllers.unblockUser);
exports.UserRoutes = router;
