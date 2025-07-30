import { model, Schema } from "mongoose";
import { IParcel, ParcelStatus } from "./parcel.interface";

const parcelSchema = new Schema<IParcel>({
    weight: { type: String, required: true },
    price: { type: Number, required: true },
    trackingId: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, required: true },
    receiver: { type: Schema.Types.ObjectId, required: true },
    parcelStatus: {
        type: String,
        enum: Object.values(ParcelStatus),
        default: ParcelStatus.Pending,
    },
    originalAddress: { type: String, required: true },
    destinationAddress: { type: String, required: true },
});

export const Parcel = model<IParcel>("Parcel", parcelSchema);
