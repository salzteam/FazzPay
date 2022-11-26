import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Auth";
import userReducer from "./User";
import transactionReducer from "./Transaction";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  transaction: transactionReducer,
});
