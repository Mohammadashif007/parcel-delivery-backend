/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userData = req.body;
        const result = await UserServices.createUserIntoDB(userData);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "User created successfully",
            data: result,
        });
    }
);

const getAllUsers = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const data = await UserServices.getAllUsersFromDB();
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "All user retrieve successfully",
            data: data.data,
            meta: data.meta,
        });
    }
);

export const UserControllers = {
    createUser,
    getAllUsers,
};
