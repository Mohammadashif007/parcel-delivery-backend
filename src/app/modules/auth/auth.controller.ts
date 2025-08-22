import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const userLogin = catchAsync(async (req: Request, res: Response) => {
    const userData = req.body;
    const result = await AuthServices.userLogin(userData);

    res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure: true,
    });
    
    sendResponse(res, {
        success: true,
        message: "User logged in successfully",
        statusCode: httpStatus.ACCEPTED,
        data: result,
    });
});

export const AuthControllers = {
    userLogin,
};
