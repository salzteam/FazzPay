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
  transfer: null,
  statusTransfer: null,
};

const transactionReducer = (prevState = initialState, { payload, type }) => {
  const { Pending, Rejected, Fulfilled } = ActionType;
  const {
    userHistoryLimit,
    userHistoryNotif,
    userConfirmation,
    createTransaction,
    resetTransaction,
    authLogout,
  } = ACTION_STRING;
  switch (type) {
    case userConfirmation.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
      };
    case userConfirmation.concat("_", Fulfilled):
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        transfer: {
          receiverId: payload.data.receiverId,
          image: payload.data.image,
          fullname: payload.data.fullname,
          phone: payload.data.noTelp,
          total: payload.data.total,
          balanceleft: payload.data.balanceleft,
          time: payload.data.time,
          notes: payload.data.notes,
        },
      };
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
        transfer: null,
        statusTransfer: null,
      };
    case resetTransaction.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case resetTransaction.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
      };
    case resetTransaction.concat("_", Fulfilled):
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        transfer: null,
        statusTransfer: null,
      };
    case createTransaction.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case createTransaction.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
      };
    case createTransaction.concat("_", Fulfilled):
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        statusTransfer: payload.data.msg,
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
        transfer: null,
        statusTransfer: null,
      };
    case authLogout.concat("_", Fulfilled):
      return initialState;
    default:
      return prevState;
  }
};

export default transactionReducer;
