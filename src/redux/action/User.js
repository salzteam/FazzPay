import { ActionType } from "redux-promise-middleware";
import { createPin } from "src/utils/User";
import { ACTION_STRING } from "./actionStrings";

const { Pending, Rejected, Fulfilled } = ActionType;

const pinPending = () => ({
  type: ACTION_STRING.userPin.concat("_", Pending),
});
const pinRejected = (error) => ({
  type: ACTION_STRING.userPin.concat("_", Rejected),
  payload: { error },
});
const pinFulfilled = (pin) => ({
  type: ACTION_STRING.userPin.concat("_", Fulfilled),
  payload: { pin },
});

const pinThunk = (body, id, token) => {
  return async (dispatch) => {
    try {
      dispatch(pinPending());
      const result = await createPin(body, id, token);
      dispatch(pinFulfilled(result, body));
    } catch (error) {
      dispatch(pinRejected(error));
    }
  };
};

const userAction = {
  pinThunk,
};

module.exports = userAction;
