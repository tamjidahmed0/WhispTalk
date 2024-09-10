
import { createSlice } from '@reduxjs/toolkit';

const handleCallSlice = createSlice({
  name: 'handleCall',
  initialState: {
    value: false,
  },
  reducers: {
    setHandleCall: (state) => {
      state.value = !state.value;
    },
  },
});

export const { setHandleCall } = handleCallSlice.actions;
export default handleCallSlice.reducer;
