/* eslint-disable no-unused-vars */
import { Types } from "mongoose";

export enum ParcelStatus {
    Pending = "Pending",
    Dispatch = "Dispatch",
    Cancel = "Cancel",
}

export interface IParcel {
    weight: string;
    price: number;
    trackingId: string;
    sender: Types.ObjectId;
    receiver: Types.ObjectId;
    parcelStatus: ParcelStatus;
    originalAddress: string;
    destinationAddress: string;
}
