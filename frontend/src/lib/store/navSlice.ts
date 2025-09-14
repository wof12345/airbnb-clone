import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavState {
  activeIndex: number;
  navState: number;
  subNavState: number;
  appBarState: number;
  searchIndicator: number;
}

const initialState: NavState = {
  activeIndex: 0,
  navState: 0,
  subNavState: 1,
  appBarState: 1,
  searchIndicator: 0,
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setActiveIndex: (state, action: PayloadAction<number>) => {
      state.activeIndex = action.payload;
    },

    setActiveNavState: (state, action: PayloadAction<number>) => {
      state.navState = action.payload;
    },

    setActiveSubNavState: (state, action: PayloadAction<number>) => {
      state.subNavState = action.payload;
    },

    setAppBarState: (state, action: PayloadAction<number>) => {
      state.appBarState = action.payload;
    },

    setSearchIndicator: (state, action: PayloadAction<number>) => {
      state.searchIndicator = action.payload;
    },
  },
});

export const {
  setActiveIndex,
  setActiveNavState,
  setActiveSubNavState,
  setAppBarState,
  setSearchIndicator,
} = navSlice.actions;
export default navSlice.reducer;
