import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCitys = createAsyncThunk('citys/getCitys', async () => {
  const res = await axios(`${import.meta.env.VITE_CITY_URL}`);
  return res.data;
});

export const citySlice = createSlice({
  name: 'citys',
  initialState: {
    city: [],
    status : 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCitys.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchCitys.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.city = [...action.payload.data];
      })
      .addCase(fetchCitys.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
  }
});

export const selectCity = state => state.city.city;
export const selectCityStatus = state => state.city.status;
export const selectCityError = state => state.city.error;
export default citySlice.reducer;
