import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./reducers/adminReducer"; 
import userReducer from "./reducers/userReducer"; 

const store = configureStore({
  reducer: {
    admin: adminReducer,
    user: userReducer, 
  },
});

export default store;
