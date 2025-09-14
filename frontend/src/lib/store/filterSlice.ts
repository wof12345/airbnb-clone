import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GuestState {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

export interface FilterState {
  destination?: string;
  checkIn?: string | Date | undefined;
  checkOut?: string | Date | undefined;
  date?: string | Date | undefined;
  guests: GuestState;
  service?: string[];
}

const initialState: FilterState = {
  destination: "",
  checkIn: undefined,
  checkOut: undefined,
  date: undefined,
  guests: { adults: 0, children: 0, infants: 0, pets: 0 },
  service: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setDestination: (state, action: PayloadAction<string>) => {
      state.destination = action.payload;
    },

    setCheckIn: (state, action: PayloadAction<string | Date | undefined>) => {
      state.checkIn = action.payload;
    },

    setCheckOut: (state, action: PayloadAction<string | Date | undefined>) => {
      state.checkOut = action.payload;
    },

    setDate: (state, action: PayloadAction<string | Date | undefined>) => {
      state.date = action.payload;
    },

    setService: (state, action: PayloadAction<string[]>) => {
      state.service = action.payload;
    },

    addService: (state, action: PayloadAction<string>) => {
      state.service?.push(action.payload);
    },

    removeService: (state, action: PayloadAction<string>) => {
      if (!state.service) return;
      state.service = state.service.filter((s) => s !== action.payload);
    },

    setGuests: (state, action: PayloadAction<Partial<GuestState>>) => {
      state.guests = { ...state.guests, ...action.payload };
    },

    incrementGuest: (state, action: PayloadAction<keyof GuestState>) => {
      state.guests[action.payload] += 1;
    },

    decrementGuest: (state, action: PayloadAction<keyof GuestState>) => {
      if (state.guests[action.payload] > 0) {
        state.guests[action.payload] -= 1;
      }
    },

    resetFilter: () => initialState,
  },
});

export const {
  setDestination,
  setCheckIn,
  setCheckOut,
  setDate,
  incrementGuest,
  addService,
  removeService,
  decrementGuest,
  setGuests,
  setService,
  resetFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
