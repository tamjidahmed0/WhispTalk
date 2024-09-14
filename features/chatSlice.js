// store/usersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [], // Start with an empty array
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users = Array.isArray(action.payload) ? action.payload : []; // Add new user to the array
    },
    addUserObject: (state, action)=>{
      // Add user object to the array
      if (Array.isArray(state.users)) {
        state.users.push(action.payload); // Push the new object into the array
      } else {
        console.error('State "users" is not an array:', state.users);
        state.users = [action.payload]; // Correct the state by setting it as an array with the new object
      }
    },
    updateUserById: (state, action) => {
      const { Id, newText } = action.payload; // Expect newText in the payload
      const index = state.users.findIndex((user) => user.Id === Id); // Find the user by Id
      if (index !== -1) {
        state.users[index].text = newText; // Update only the text property
      }
    },
    removeUserById: (state, action) => {
      const { id } = action.payload;
      state.users = state.users.filter((user) => user.id !== id); // Remove user by ID
    },
  },
});

export const { addUser, updateUserById, removeUserById, addUserObject } = chatsSlice.actions;
export default chatsSlice.reducer;
