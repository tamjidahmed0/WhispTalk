
import { createSlice } from '@reduxjs/toolkit';

const rejectCall = createSlice({
  name: 'rejectCall',
  initialState: {
    value: false,
  },
  reducers: {
    setRejectCall: (state) => {
      state.value = !state.value;
    },
  },
});

export const { setRejectCall } = rejectCall.actions;
export default rejectCall.reducer;
