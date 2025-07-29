/* eslint-disable no-unused-vars */
export enum Role {
    SENDER = "SENDER",
    RECEIVER = "RECEIVER",
    ADMIN = "ADMIN",
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: Role;
    address?: string;
    phone?: string;
    isBlocked: boolean;
}
