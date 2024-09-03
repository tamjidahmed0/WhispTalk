import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: '',
  profilePic: '',
  name: '',
  username: '',
  email: '',
  verified: false,
};

const profileDetails = createSlice({
  name: "profileDetails",
  initialState,
  reducers: {
    // Set the entire profile
    setProfile: (state, action) => {
      state.id = action.payload.id;
      state.profilePic = action.payload.profilePic;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.verified = action.payload.verified;
    },

    // Update a specific field dynamically
    updateProfileField: (state, action) => {
      const { field, value } = action.payload; // Destructure field and value from payload
      if (state.hasOwnProperty(field)) { // Check if the field exists in the state
        state[field] = value; // Update the field with the new value
      }
    },
  },
});

export const { setProfile, updateProfileField } = profileDetails.actions;

export default profileDetails.reducer;
