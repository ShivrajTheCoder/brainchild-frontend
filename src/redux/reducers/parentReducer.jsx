import { createSlice } from "@reduxjs/toolkit";

const parentSlice = createSlice({
  name: "Parent",
  initialState: {
    userId: "",
    token: "",
    isLoggedIn: false,
    email: "",
    username: ""
  },
  reducers: {
    parentlogin: (state, action) => {
      const { userId, token, email, username } = action.payload;
      state.userId = userId;
      state.token = token;
      state.isLoggedIn = true;
      state.email = email;
      state.username = username;
    },
    parentlogout: (state) => {
      state.userId = "";
      state.token = "";
      state.isLoggedIn = false;
      state.email = "";
      state.username = "";
    },
  },
});

export const { parentlogin, parentlogout } = parentSlice.actions;
export default parentSlice.reducer;
