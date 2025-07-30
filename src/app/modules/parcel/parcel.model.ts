import { model, Schema } from "mongoose";
import { IParcel, IStatusLog, ParcelStatus } from "./parcel.interface";

const statusLogSchema = new Schema<IStatusLog>(
    {
        status: {
            type: String,
            enum: Object.values(ParcelStatus),
            required: true,
        },
        timestamp: { type: Date, default: Date.now },
        updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
        note: { type: String },
    },
    { _id: false }
);

const parcelSchema = new Schema<IParcel>({
    weight: { type: String, required: true },
    price: { type: Number, required: true },
    trackingId: { type: String, unique: true },
    sender: { type: Schema.Types.ObjectId, required: true },
    receiver: { type: Schema.Types.ObjectId, required: true },
    parcelStatus: {
        type: String,
        enum: Object.values(ParcelStatus),
        default: ParcelStatus.PENDING,
    },
    originalAddress: { type: String, required: true },
    destinationAddress: { type: String, required: true },
    statusLog: [statusLogSchema],
});

export const Parcel = model<IParcel>("Parcel", parcelSchema);
