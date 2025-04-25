import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

const InputSlice = createSlice({
  name: "input",
  initialState: {
    value: "",
    result: [],
    watchlist: [],
  },
  reducers: {
    setInput: (state, action) => {
      state.value = action.payload;
    },
    clearInput: (state) => {
      state.value = "";
    },
    getResults: (state, action) => {
      state.result = action.payload;
    },
    addToWatchlist: (state, action) => {
      const exists = state.watchlist.find(
        (movie) => movie.id === action.payload.id
      );
      if (!exists) {
        state.watchlist.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
});
export const {setInput,clearInput,getResults, addToWatchlist,
  removeFromWatchlist,}=InputSlice.actions;
export default InputSlice.reducer;