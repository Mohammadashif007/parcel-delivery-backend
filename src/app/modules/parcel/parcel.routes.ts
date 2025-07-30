import express from "express";
import { ParcelControllers } from "./parcel.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createParcelZodSchema } from "./parcel.validation";

const router = express.Router();

router.post(
    "/",
    validateRequest(createParcelZodSchema),
    ParcelControllers.createParcel
);
router.get("/me", ParcelControllers.getAllParcel);
router.patch("/cancel/:id", ParcelControllers.cancelParcel);

export const ParcelRoutes = router;
