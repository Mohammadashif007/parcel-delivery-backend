import { model, Schema } from "mongoose";
import { IUser, Role } from "./user.interface";
import bcrypt from "bcrypt";
import { envVars } from "../../config/env";

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: Object.values(Role) },
        address: { type: String },
        phone: { type: String },
        isBlocked: { type: Boolean, default: false },
    },
    { timestamps: true, versionKey: false }
);

// ! password hashing
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(
        this.password,
        Number(envVars.BCRYPT_SALT_ROUND)
    );
    next();
});

export const User = model<IUser>("User", userSchema);
