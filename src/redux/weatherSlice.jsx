import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeather = createAsyncThunk('weather/getWeather', async (city) => {
  const res = await axios(`${import.meta.env.VITE_WEATHER_URL}${city}`);
  return res.data;
});

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    weather: [],
    days: [],
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        const data = action.payload.list;
        const selectedData = {};
        data.forEach(obj => {
          const date = obj.dt_txt.split(' ')[0];
          if (!selectedData[date]) {
            selectedData[date] = obj;
          }
        });
        state.weather = Object.values(selectedData);

        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const days = state.days;
        function getDayOfWeek(dateString) {
          const date = new Date(dateString);
          return daysOfWeek[date.getDay()];
        }
        state.weather.forEach(obj => {
          const dayOfWeek = getDayOfWeek(obj.dt_txt);
          days.push(dayOfWeek);
        });
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export const selectWeather = state => state.weather.weather;
export const selectWeatherLoading = state => state.weather.isLoading;
export const selectWeatherError = state => state.weather.error;
export const selectDays = state => state.weather.days;
export default weatherSlice.reducer;
