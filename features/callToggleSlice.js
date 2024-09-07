
import { createSlice } from '@reduxjs/toolkit';

const calltoggleSlice = createSlice({
  name: 'calltoggle',
  initialState: {
    value: false,
  },
  reducers: {
    Calltoggle: (state) => {
      state.value = !state.value;
    },
  },
});

export const { Calltoggle } = calltoggleSlice.actions;
export default calltoggleSlice.reducer;
