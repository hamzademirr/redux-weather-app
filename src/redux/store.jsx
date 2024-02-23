import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";
import cityReducer from "./citySlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    city: cityReducer,
  },
})
