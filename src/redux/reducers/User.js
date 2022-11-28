import { ActionType } from "redux-promise-middleware";
import { ACTION_STRING } from "../action/actionStrings";

const initialState = {
  isLoading: false,
  isError: false,
  isFulfilled: false,
  error: null,
  search: [],
  allsearch: null,
  pagination: null,
  pinMsg: null,
  pinWorng: null,
  profile: {
    firsName: null,
    lastName: null,
    email: null,
    image: null,
    noTelp: null,
    balance: null,
  },
  dashboard: {
    totalIncome: null,
    totalExpense: null,
    listIncome: null,
    listExpense: null,
  },
};

const userReducer = (prevState = initialState, { payload, type }) => {
  const { Pending, Rejected, Fulfilled } = ActionType;
  const {
    userPin,
    userGetprofileid,
    userDashboard,
    userSearch,
    updateSearch,
    checkPin,
    resetpinMsg,
    authLogout,
  } = ACTION_STRING;
  switch (type) {
    case resetpinMsg.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        pinMsg: null,
        pinWorng: null,
      };
    case resetpinMsg.concat("_", Fulfilled):
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        pinMsg: null,
        pinWorng: null,
      };
    case userPin.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case userPin.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
      };
    case userPin.concat("_", Fulfilled):
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
      };
    case checkPin.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
        pinMsg: null,
        pinWorng: null,
      };
    case checkPin.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        pinWorng: true,
      };
    case checkPin.concat("_", Fulfilled):
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        pinMsg: payload.pin.data.msg,
      };
    case userSearch.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case userSearch.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
      };
    case userSearch.concat("_", Fulfilled):
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        allsearch: payload.data.data,
        search: payload.data.data,
        pagination: payload.data.pagination,
      };
    case updateSearch.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case updateSearch.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
      };
    case updateSearch.concat("_", Fulfilled):
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        search: payload.data,
      };
    case userDashboard.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case userDashboard.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
      };
    case userDashboard.concat("_", Fulfilled):
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        dashboard: {
          totalIncome: payload.data.totalIncome,
          totalExpense: payload.data.totalExpense,
          listIncome: payload.data.listIncome,
          listExpense: payload.data.listExpense,
        },
      };
    case userGetprofileid.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case userGetprofileid.concat("_", Rejected):
      return {
        ...prevState,
        isError: true,
        isLoading: false,
      };
    case userGetprofileid.concat("_", Fulfilled):
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        profile: {
          firstName: payload.data.data.firstName,
          lastName: payload.data.data.lastName,
          email: payload.data.data.email,
          image: payload.data.data.image,
          noTelp: payload.data.data.noTelp,
          balance: payload.data.data.balance,
        },
      };
    case authLogout.concat("_", Fulfilled):
      return initialState;
    default:
      return prevState;
  }
};

export default userReducer;
