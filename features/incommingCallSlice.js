import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  requestForCallingId:"",
  profile: "",
  name: "",
};

const IncommingCall = createSlice({
  name: "IncommingCall",
  initialState,
  reducers: {
    // Set the entire profile
    setIncommingCallDetails: (state, action) => {
      state.userId = action.payload.userId;
      state.requestForCallingId = action.payload.requestForCallingId
      state.profile = action.payload.profile;
      state.name = action.payload.name;
 
    },
  },
});

export const { setIncommingCallDetails } = IncommingCall.actions;

export default IncommingCall.reducer;
