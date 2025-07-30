import { v4 } from "uuid";
import { IParcel, ParcelStatus } from "./parcel.interface";
import { Parcel } from "./parcel.model";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";

// ! create parcel
const createParcelIntoDB = async (payload: IParcel) => {
    const trackingId = `TRK-${v4().split("-")[0].toUpperCase()}`;

    const result = await Parcel.create({
        ...payload,
        trackingId,
        parcelStatus: ParcelStatus.PENDING,
        statusLog: [
            {
                status: ParcelStatus.PENDING,
                timeStamp: new Date(),
                updatedBy: "SYSTEM",
                note: "Parcel created",
            },
        ],
    });
    return result;
};

// ! retrieve parcel
const getMyParcelFromDB = async () => {
    const result = await Parcel.find();
    return result;
};

// ! cancel parcel
const cancelParcelFromDB = async (id: string) => {
    const parcel = await Parcel.findById(id);
    if (!parcel) {
        throw new AppError(httpStatus.BAD_REQUEST, "Parcel not found");
    }
    if (parcel.parcelStatus !== ParcelStatus.PENDING) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Only pending parcels can be cancelled"
        );
    }
    parcel.parcelStatus = ParcelStatus.CANCEL;
    parcel.statusLog?.push({
        status: ParcelStatus.CANCEL,
        timestamp: new Date(),
        updatedBy: "SYSTEM",
        note: "Cancelled without auth",
    });
    await parcel.save();
    return parcel;
};

// ! show status log
const getStatusLog = async (id: string) => {
    const parcel = await Parcel.findById(id).select("statusLog");
    if (!parcel) {
        throw new AppError(httpStatus.NOT_FOUND, "Parcel not found");
    }
    return parcel;
};

// ! dispatch Parcel
const dispatchParcelFromDB = async (id: string, updatedBy: string) => {
    const parcel = await Parcel.findById(id);
    if (!parcel) {
        throw new AppError(httpStatus.NOT_FOUND, "Parcel not found");
    }
    if (parcel.parcelStatus !== ParcelStatus.PENDING) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Only pending parcels can be dispatched"
        );
    }

    parcel.parcelStatus = ParcelStatus.DISPATCH;
    parcel.statusLog?.push({
        status: ParcelStatus.DISPATCH,
        timestamp: new Date(),
        updatedBy: updatedBy || "ADMIN",
        note: "Parcel dispatched from warehouse",
    });

    await parcel.save();
    return parcel;
};

// ! parcel in transit
const parcelInTransitFromDB = async (id: string, updatedBy: string) => {
    const parcel = await Parcel.findById(id);
    if (!parcel) {
        throw new AppError(httpStatus.NOT_FOUND, "Parcel not found");
    }
    if (parcel.parcelStatus !== ParcelStatus.DISPATCH) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Parcel must be DISPATCHED before marking as IN_TRANSIT"
        );
    }
    parcel.parcelStatus = ParcelStatus.IN_TRANSIT;
    parcel.statusLog?.push({
        status: ParcelStatus.IN_TRANSIT,
        timestamp: new Date(),
        updatedBy: updatedBy || "ADMIN",
        note: "Parcel is in transit",
    });

    await parcel.save();
    return parcel;
};

// ! parcel OUT_FOR_DELIVERY
const parcelOUtForDelivery = async (id: string, updatedBy: string) => {
    const parcel = await Parcel.findById(id);
    if (!parcel) {
        throw new AppError(httpStatus.NOT_FOUND, "Parcel not found");
    }
    if (parcel.parcelStatus !== ParcelStatus.IN_TRANSIT) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Parcel must be IN TRANSIT before marking as OUT_FOR_DELIVERY"
        );
    }
    parcel.parcelStatus = ParcelStatus.OUT_FOR_DELIVERY;
    parcel.statusLog?.push({
        status: ParcelStatus.OUT_FOR_DELIVERY,
        timestamp: new Date(),
        updatedBy: updatedBy || "ADMIN",
        note: "Parcel is out for delivery",
    });
    await parcel.save();
    return parcel;
};

export const ParcelServices = {
    createParcelIntoDB,
    getMyParcelFromDB,
    cancelParcelFromDB,
    getStatusLog,
    dispatchParcelFromDB,
    parcelInTransitFromDB,
    parcelOUtForDelivery,
};
