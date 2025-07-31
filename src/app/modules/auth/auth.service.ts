import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcrypt from "bcrypt";
import { IUser } from "../user/user.interface";

const userLogin = async (payload: Partial<IUser>) => {
    const userExist = await User.findOne({ email: payload.email });
    if (!userExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    const matchPassword = await bcrypt.compare(
        payload.password as string,
        userExist.password
    );
    console.log(matchPassword);
    if (!matchPassword) {
        throw new AppError(httpStatus.BAD_REQUEST, "Invalid credential");
    }

    return {
        email: userExist.email,
    };
};

export const AuthServices = {
    userLogin,
};
