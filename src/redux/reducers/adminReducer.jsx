import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "Admin",
  initialState: {
    userId: "",
    token: "",
    isLoggedIn: false, 
    isAdmin:false,
  },
  reducers: {
    adminLogin : (state, action) => {
      const { userId, token,isAdmin } = action.payload;
      state.userId = userId;
      state.token = token;
      state.isLoggedIn = true;
      state.isAdmin=isAdmin
    },
    adminLogout: (state) => {
      state.userId = "";
      state.token = "";
      state.isLoggedIn = false; 
      state.isAdmin=false
    },
  },
});

export const { adminLogin, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
