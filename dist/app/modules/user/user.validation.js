"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
// ! create user zod validation schema
exports.createUserZodSchema = zod_1.default.object({
    name: zod_1.default
        .string({ error: "Name must be a string" })
        .min(1, { message: "Name cannot be empty" }),
    email: zod_1.default
        .string({ error: "Email must be a string" })
        .email({ message: "Invalid email format" }),
    password: zod_1.default
        .string({ error: "Password must be a string" })
        .min(6, { message: "Password must be at least 6 characters" }),
    role: zod_1.default.enum(["SENDER", "RECEIVER", "ADMIN"]).optional(),
    phone: zod_1.default
        .string({ error: "Phone Number must be string" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message: "Phone number must be valid for Bangladesh",
    })
        .optional(),
    address: zod_1.default.string({ error: "Address must be a string" }).optional(),
});
// ! update user zod validation schema
exports.updateUserZodSchema = zod_1.default.object({
    name: zod_1.default
        .string({ error: "Name must be a string" })
        .min(1, { message: "Name cannot be empty" })
        .optional(),
    email: zod_1.default
        .string({ error: "Email must be a string" })
        .email({ message: "Invalid email format" })
        .optional(),
    password: zod_1.default
        .string({ error: "Password must be a string" })
        .min(6, { message: "Password must be at least 6 characters" })
        .optional(),
    phone: zod_1.default
        .string({ error: "Phone Number must be string" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message: "Phone number must be valid for Bangladesh",
    })
        .optional(),
    address: zod_1.default.string({ error: "Address must be a string" }).optional(),
});
