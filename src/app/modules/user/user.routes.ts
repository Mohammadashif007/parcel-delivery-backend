import express from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema } from "./user.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

const router = express.Router();

router.post(
    "/register",
    validateRequest(createUserZodSchema),
    UserControllers.createUser
);
router.get("/", checkAuth(Role.ADMIN), UserControllers.getAllUsers);
router.patch(
    "/block/:userId",
    checkAuth(Role.ADMIN),
    UserControllers.blockUser
);
router.patch(
    "/unblock/:userId",
     checkAuth(Role.ADMIN),
    UserControllers.unblockUser
);

export const UserRoutes = router;
