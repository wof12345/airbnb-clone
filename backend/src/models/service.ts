import { Schema, model, models, Document } from "mongoose";

export interface ICoordinate {
  lat: number;
  lng: number;
}

export type GuestType = "adults" | "infants" | "children" | "pets";

export interface IGuest {
  name: string;
  amount?: number;
  type?: GuestType;
}

export interface IService extends Document {
  title: string;
  sub_title: string;
  price: number;
  minimum_price?: number;
  type: "home" | "experience" | "service";
  email: string;
  rating?: number;
  reviews?: number;
  start_date: Date;
  end_date: Date;
  coordinates?: ICoordinate[];
  country: string;
  city: string;
  language: "en" | "bn";
  tag?: string;
  service_type?: string[];
  guests?: IGuest[];
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    sub_title: { type: String, required: true },
    price: { type: Number, required: true },
    minimum_price: { type: Number },

    type: {
      type: String,
      required: true,
      enum: ["home", "experience", "service"],
    },

    email: { type: String, unique: true, required: true },
    rating: Number,
    reviews: Number,

    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },

    coordinates: [{ lat: Number, lng: Number }],
    country: { type: String, required: true },
    city: { type: String, required: true },

    language: { type: String, required: true, enum: ["en", "bn"] },

    tag: { type: String },
    service_type: [{ type: String }],

    guests: [
      {
        name: { type: String, required: true },
        amount: { type: Number, min: 0 },
        type: { type: String, enum: ["adults", "infants", "children", "pets"] },
      },
    ],
  },
  { timestamps: true }
);

export default models.Service || model<IService>("Service", ServiceSchema);
