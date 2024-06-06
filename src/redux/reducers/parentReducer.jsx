import { createSlice } from "@reduxjs/toolkit";

const parentSlice = createSlice({
  name: "Parent",
  initialState: {
    userId: "",
    token: "",
    isLoggedIn: false,
    email: "",
    username: "",
    childId: ""
  },
  reducers: {
    parentlogin: (state, action) => {
      const { userId, token, email, username, childId } = action.payload;
      state.userId = userId;
      state.token = token;
      state.isLoggedIn = true;
      state.email = email;
      state.username = username;
      state.childId = childId;
    },
    parentlogout: (state) => {
      state.userId = "";
      state.token = "";
      state.isLoggedIn = false;
      state.email = "";
      state.username = "";
      state.childId = "";
    },
  },
});

export const { parentlogin, parentlogout } = parentSlice.actions;
export default parentSlice.reducer;
