import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  language: number;
}

const initialState: ModalState = {
  language: 0,
};

const navSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setLanguageModal: (state, action: PayloadAction<number>) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguageModal } = navSlice.actions;
export default navSlice.reducer;
