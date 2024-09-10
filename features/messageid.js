import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  messageid: '', // Initial messageid state
};

// Create the slice
const messageId = createSlice({
  name: "messageId",
  initialState,
  reducers: {
    // Define the reducer to update the messageid
    setMessageId: (state, action) => {
      state.messageid = action.payload; // Directly assign the payload to messageid
    },
  },
});

// Export the action
export const { setMessageId } = messageId.actions;

// Export the reducer
export default messageId.reducer;
