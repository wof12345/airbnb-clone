import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GuestState {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

export interface FilterState {
  destination?: { id: string; address: string; description: string };
  checkIn?: { date: string | Date };
  checkOut?: { date: string | Date };
  date?: { date: string | Date };
  guests: GuestState;
  service?: { id: string; name: string };
}

const initialState: FilterState = {
  destination: undefined,
  checkIn: undefined,
  checkOut: undefined,
  date: undefined,
  guests: { adults: 0, children: 0, infants: 0, pets: 0 },
  service: undefined,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setDestination: (
      state,
      action: PayloadAction<{
        id: string;
        address: string;
        description: string;
      }>
    ) => {
      state.destination = action.payload;
    },
    setCheckIn: (state, action: PayloadAction<{ date: string | Date }>) => {
      state.checkIn = action.payload;
    },
    setCheckOut: (state, action: PayloadAction<{ date: string | Date }>) => {
      state.checkOut = action.payload;
    },
    setDate: (state, action: PayloadAction<{ date: string | Date }>) => {
      state.date = action.payload;
    },
    setGuests: (state, action: PayloadAction<GuestState>) => {
      state.guests = action.payload;
    },
    setService: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      state.service = action.payload;
    },
    resetFilter: () => initialState,
  },
});

export const {
  setDestination,
  setCheckIn,
  setCheckOut,
  setDate,
  setGuests,
  setService,
  resetFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
