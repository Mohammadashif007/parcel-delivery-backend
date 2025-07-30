import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { ParcelServices } from "./parcel.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const createParcel = catchAsync(async (req: Request, res: Response) => {
    const result = await ParcelServices.createParcelIntoDB(req.body);
    sendResponse(res, {
        success: true,
        message: "Parcel created successfully",
        statusCode: httpStatus.CREATED,
        data: result,
    });
});

const getAllParcel = catchAsync(async (req: Request, res: Response) => {
    const result = await ParcelServices.getMyParcelFromDB();
    sendResponse(res, {
        success: true,
        message: "All parcel retrieve successfully",
        statusCode: httpStatus.OK,
        data: result,
    });
});

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

export const ParcelControllers = {
    createParcel,
    getAllParcel,
    cancelParcel,
};
