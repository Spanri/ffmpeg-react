import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",

  initialState: {
    // What to write in the loading plate
    convertingStatus: "",
    // Is button "Convert" pressed?
    isConverting: false,
  },

  reducers: {
    setConvertingStatus: (state, action) => {
      state.convertingStatus = action.payload;
    },

    setIsConverting: (state, action) => {
      state.isConverting = action.payload;
    },
  },
});

export const { setConvertingStatus, setIsConverting } = counterSlice.actions;

export default counterSlice.reducer;
