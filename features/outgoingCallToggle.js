
import { createSlice } from '@reduxjs/toolkit';

const outgoingCallToggle = createSlice({
  name: 'outgoingCall',
  initialState: {
    value: false,
  },
  reducers: {
    setOutgoingCall: (state) => {
      state.value = !state.value;
    },
  },
});

export const { setOutgoingCall } = outgoingCallToggle.actions;
export default outgoingCallToggle.reducer;
