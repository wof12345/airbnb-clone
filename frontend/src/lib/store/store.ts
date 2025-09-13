import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./navSlice";
import filterReducer from "./filterSlice";

export const store = configureStore({
  reducer: {
    nav: navReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
