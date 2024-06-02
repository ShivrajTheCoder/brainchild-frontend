import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User",
  initialState: {
    userId: "",
    token: "",
    isLoggedIn: false, 
  },
  reducers: {
    login: (state, action) => {
      const { userId, token } = action.payload;
      state.userId = userId;
      state.token = token;
      state.isLoggedIn = true; 
    },
    logout: (state) => {
      state.userId = "";
      state.token = "";
      state.isLoggedIn = false; 
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
