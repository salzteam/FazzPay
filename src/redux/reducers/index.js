import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Auth";
import userReducer from "./User";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
});
