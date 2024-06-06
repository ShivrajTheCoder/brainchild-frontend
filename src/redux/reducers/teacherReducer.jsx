import { createSlice } from "@reduxjs/toolkit";

const teacherSlice = createSlice({
  name: "Teacher",
  initialState: {
    userId: "",
    token: "",
    isLoggedIn: false, 
    username: "", // Added username to the initial state
  },
  reducers: {
    teacherLogin: (state, action) => {
      const { userId, token, username } = action.payload;
      state.userId = userId;
      state.token = token;
      state.isLoggedIn = true;
      state.username = username; // Set username from the action payload
    },
    teacherLogout: (state) => {
      state.userId = "";
      state.token = "";
      state.isLoggedIn = false; 
      state.username = ""; // Reset username on logout
    },
  },
});

export const { teacherLogin, teacherLogout } = teacherSlice.actions;
export default teacherSlice.reducer;
