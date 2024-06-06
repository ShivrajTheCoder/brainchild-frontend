import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./reducers/adminReducer"; 
import userReducer from "./reducers/userReducer"; 
import parentReducer from "./reducers/parentReducer";
import teacherReducer from "./reducers/teacherReducer";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    user: userReducer, 
    parent: parentReducer,
    teacher: teacherReducer
  },
});

export default store;
