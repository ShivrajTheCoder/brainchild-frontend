import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User",
  initialState: {
    userId: "",
    token: "",
    isLoggedIn: false,
    email: "",
    username: "",
    parentId: ""
  },
  reducers: {
    login: (state, action) => {
      const { userId, token, email, username, parentId } = action.payload;
      state.userId = userId;
      state.token = token;
      state.isLoggedIn = true;
      state.email = email;
      state.username = username;
      state.parentId = parentId;
    },
    logout: (state) => {
      state.userId = "";
      state.token = "";
      state.isLoggedIn = false;
      state.email = "";
      state.username = "";
      state.parentId = "";
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
