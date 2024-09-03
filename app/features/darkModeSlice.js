import { createSlice } from '@reduxjs/toolkit';




const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: false, 
  reducers: {
    setDarkMode: (state, action) => action.payload,
  },
});

export const { setDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
