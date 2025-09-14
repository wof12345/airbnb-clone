import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./navSlice";
import filterReducer from "./filterSlice";
import modalReducer from "./modalSlice";
import serviceReducer from "./serviceSlice";

export const store = configureStore({
  reducer: {
    nav: navReducer,
    filter: filterReducer,
    modal: modalReducer,
    service: serviceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
