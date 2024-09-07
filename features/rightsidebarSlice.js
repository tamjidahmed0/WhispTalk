import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    receiverPic: "",
    receiverName: "",
    receiverUsername: "",
    receiverAbout: ""
};

const rightsidebar = createSlice({
  name: "rightsidebar",
  initialState,
  reducers: {
    setDetails: (state, action) => {
      state.receiverName = action.payload.receiverName;
      state.receiverUsername = action.payload.receiverUsername;
      state.receiverPic = action.payload.receiverPic;
      state.receiverAbout = action.payload.receiverAbout
    },
  },
});

export const { setDetails } = rightsidebar.actions;

export default rightsidebar.reducer;
