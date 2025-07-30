import express from "express";
import { ParcelControllers } from "./parcel.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createParcelZodSchema } from "./parcel.validation";


const router = express.Router();

// ! create new parcel
router.post(
    "/",
    validateRequest(createParcelZodSchema),
    ParcelControllers.createParcel
);

// ! get all parcel
router.get("/me", ParcelControllers.getAllParcel);

// ! cancel parcel
router.patch("/cancel/:id", ParcelControllers.cancelParcel);

// ! dispatch parcel
router.patch("/dispatch/:id", ParcelControllers.parcelDispatch);

// ! get parcel status log
router.get("/:id/status-log", ParcelControllers.statusLog);

export const ParcelRoutes = router;
