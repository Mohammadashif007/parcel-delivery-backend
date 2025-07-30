import { v4 } from "uuid";
import { IParcel, ParcelStatus } from "./parcel.interface";
import { Parcel } from "./parcel.model";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";

const createParcelIntoDB = async (payload: IParcel) => {
    const trackingId = `TRK-${v4().split("-")[0].toUpperCase()}`;
    const result = await Parcel.create({ ...payload, trackingId });
    return result;
};

const getMyParcelFromDB = async () => {
    const result = await Parcel.find();
    return result;
};

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
    await parcel.save();
    return parcel;
};

export const ParcelServices = {
    createParcelIntoDB,
    getMyParcelFromDB,
    cancelParcelFromDB,
};
