import { ActionType } from "redux-promise-middleware";
import { ACTION_STRING } from "../action/actionStrings";

const initialState = {
  isLoading: false,
  isError: false,
  isFulfilled: false,
  error: null,
  profile: {
    firsName: null,
    lastName: null,
    email: null,
    image: null,
    noTelp: null,
    balance: null,
  },
};

const userReducer = (prevState = initialState, { payload, type }) => {
  const { Pending, Rejected, Fulfilled } = ActionType;
  const { userPin } = ACTION_STRING;
  switch (type) {
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
    default:
      return prevState;
  }
};

export default userReducer;
