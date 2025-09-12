import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavState {
  activeIndex: number;
}

const initialState: NavState = {
  activeIndex: 0,
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setActiveIndex: (state, action: PayloadAction<number>) => {
      state.activeIndex = action.payload;
    },
  },
});

export const { setActiveIndex } = navSlice.actions;
export default navSlice.reducer;
