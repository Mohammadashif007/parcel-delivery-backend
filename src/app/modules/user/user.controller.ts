import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import httpStatus from "http-status-codes";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData = req.body;
        const result = await UserServices.createUserIntoDB(userData);
        res.status(httpStatus.CREATED).json({
            success: true,
            message: "User created successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await UserServices.getAllUsersFromDB();
        res.status(httpStatus.CREATED).json({
            success: true,
            message: "User created successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const UserControllers = {
    createUser,
    getAllUsers,
};
