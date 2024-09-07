import { createSlice } from '@reduxjs/toolkit';




const blockSlice = createSlice({
  name: 'blockModal',
  initialState: false, 
  reducers: {
    setUserBlockModal: (state, action) => action.payload,
  },
});

export const { setUserBlockModal } = blockSlice.actions;

export default blockSlice.reducer;
