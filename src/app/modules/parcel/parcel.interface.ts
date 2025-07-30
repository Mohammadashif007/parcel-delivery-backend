/* eslint-disable no-unused-vars */
import { Types } from "mongoose";

export enum ParcelStatus {
    PENDING = "PENDING",
    DISPATCH = "DISPATCH",
    CANCEL = "CANCEL",
}

export interface IStatusLog {
    status: ParcelStatus;
    timestamp: Date;
    updatedBy?: Types.ObjectId;
    note?: string;
}

export interface IParcel {
    weight: string;
    price: number;
    trackingId?: string;
    sender: Types.ObjectId;
    receiver: Types.ObjectId;
    parcelStatus: ParcelStatus;
    originalAddress: string;
    destinationAddress: string;
    statusLog?: IStatusLog[];
}
