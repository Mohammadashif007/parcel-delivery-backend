/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";

const createUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userData = req.body;
        const result = await UserServices.createUserIntoDB(userData);
        res.status(httpStatus.CREATED).json({
            success: true,
            message: "User created successfully",
            data: result,
        });
    }
);

const getAllUsers = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await UserServices.getAllUsersFromDB();
        res.status(httpStatus.CREATED).json({
            success: true,
            message: "User created successfully",
            data: result,
        });
    }
);

export const UserControllers = {
    createUser,
    getAllUsers,
};
