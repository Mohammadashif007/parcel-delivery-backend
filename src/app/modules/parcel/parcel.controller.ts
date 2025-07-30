import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { ParcelServices } from "./parcel.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

// ! create parcel
const createParcel = catchAsync(async (req: Request, res: Response) => {
    const result = await ParcelServices.createParcelIntoDB(req.body);
    sendResponse(res, {
        success: true,
        message: "Parcel created successfully",
        statusCode: httpStatus.CREATED,
        data: result,
    });
});

// ! retrieve all parcel
const getAllParcel = catchAsync(async (req: Request, res: Response) => {
    const result = await ParcelServices.getMyParcelFromDB();
    sendResponse(res, {
        success: true,
        message: "All parcel retrieve successfully",
        statusCode: httpStatus.OK,
        data: result,
    });
});

// ! cancel parcel
const cancelParcel = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ParcelServices.cancelParcelFromDB(id);
    sendResponse(res, {
        success: true,
        message: "Parcel cancelled successfully",
        statusCode: httpStatus.OK,
        data: result,
    });
});

// ! show parcel status log
const statusLog = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ParcelServices.getStatusLog(id);
    sendResponse(res, {
        success: true,
        message: "Status log showed successfully",
        statusCode: httpStatus.OK,
        data: result,
    });
});

// ! parcel dispatch
const parcelDispatch = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    // const updatedBy = req.user?.email || "ADMIN";
    const updatedBy = "ADMIN";
    const result = await ParcelServices.dispatchParcelFromDB(id, updatedBy);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Parcel dispatched successfully",
        data: result,
    });
});

// ! parcel in transit
const parcelInTransit = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    // const updatedBy = req.user?.email || "ADMIN"
    const updatedBy = "ADMIN";
    const result = await ParcelServices.parcelInTransitFromDB(id, updatedBy);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Parcel marked as IN_TRANSIT successfully",
        data: result,
    });
});

// ! parcel out for delivery
const parcelOUtForDelivery = catchAsync(async(req: Request, res: Response) => {
    const {id} = req.params;
    // const updatedBy = req.user?.email || "ADMIN";
    const updatedBy =  "ADMIN";
    const result = await ParcelServices.parcelOUtForDelivery(id, updatedBy);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Parcel is out for delivery",
        data: result
    })
})

export const ParcelControllers = {
    createParcel,
    getAllParcel,
    cancelParcel,
    statusLog,
    parcelDispatch,
    parcelInTransit,
    parcelOUtForDelivery
};
