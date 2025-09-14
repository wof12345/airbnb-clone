import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  days: number;
  days_unit: "days" | "nights";
  country: string;
  city: string;
  language: "en" | "bn";
  tag?: string;
  service_type?: string[];
  guests?: IGuest[];
}

interface ServiceState {
  services: IService[] | undefined;
}

const initialState: ServiceState = {
  services: undefined,
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<IService[] | undefined>) => {
      state.services = action.payload;
    },
  },
});

export const { setServices } = serviceSlice.actions;
export default serviceSlice.reducer;
