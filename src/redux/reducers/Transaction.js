import { ActionType } from "redux-promise-middleware";
import { ACTION_STRING } from "../action/actionStrings";

const initialState = {
  isLoading: false,
  isError: false,
  isFulfilled: false,
  error: null,
  notification: null,
  history: null,
  pagination: null,
};

const transactionReducer = (prevState = initialState, { payload, type }) => {
  const { Pending, Rejected, Fulfilled } = ActionType;
  const { userHistoryLimit, userHistoryNotif } = ACTION_STRING;
  switch (type) {
    case userHistoryLimit.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case userHistoryLimit.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
      };
    case userHistoryLimit.concat("_", Fulfilled):
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        history: payload.data.data,
        pagination: payload.data.pagination,
      };
    case userHistoryNotif.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case userHistoryNotif.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
      };
    case userHistoryNotif.concat("_", Fulfilled):
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        notification: payload.data.data,
        pagination: payload.data.pagination,
      };
    default:
      return prevState;
  }
};

export default transactionReducer;
