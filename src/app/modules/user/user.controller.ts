/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { UserServices } from "./user.service";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { string } from "zod";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const userData = req.body;
    const result = await UserServices.createUserIntoDB(userData);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User created successfully",
        data: result,
    });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const data = await UserServices.getAllUsersFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All user retrieve successfully",
        data: data.data,
        meta: data.meta,
    });
});

const blockUser = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result = await UserServices.blockUserByAdmin(userId);
    sendResponse(res, {
        success: true,
        message: "User has been blocked successfully",
        statusCode: httpStatus.OK,
        data: result,
    });
});

const unblockUser = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result = await UserServices.unblockUserByAdmin(userId);
    sendResponse(res, {
        success: true,
        message: "User has been blocked successfully",
        statusCode: httpStatus.OK,
        data: result,
    });
});

export const UserControllers = {
    createUser,
    getAllUsers,
    blockUser,
    unblockUser,
};
