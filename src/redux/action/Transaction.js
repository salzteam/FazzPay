import { ActionType } from "redux-promise-middleware";
import { HistoryLimit } from "src/utils/Transaction";
import { ACTION_STRING } from "./actionStrings";

const { Pending, Rejected, Fulfilled } = ActionType;

const HistoryLimitPending = () => ({
  type: ACTION_STRING.userHistoryLimit.concat("_", Pending),
});
const HistoryLimitRejected = (error) => ({
  type: ACTION_STRING.userHistoryLimit.concat("_", Rejected),
  payload: { error },
});
const HistoryLimitFulfilled = (data) => ({
  type: ACTION_STRING.userHistoryLimit.concat("_", Fulfilled),
  payload: { data },
});
const HistoryNotifPending = () => ({
  type: ACTION_STRING.userHistoryNotif.concat("_", Pending),
});
const HistoryNotifRejected = (error) => ({
  type: ACTION_STRING.userHistoryNotif.concat("_", Rejected),
  payload: { error },
});
const HistoryNotifFulfilled = (data) => ({
  type: ACTION_STRING.userHistoryNotif.concat("_", Fulfilled),
  payload: { data },
});

const HistoryLimitThunk = (params, token) => {
  return async (dispatch) => {
    try {
      dispatch(HistoryLimitPending());
      const result = await HistoryLimit(params, token);
      dispatch(HistoryLimitFulfilled(result.data));
    } catch (error) {
      dispatch(HistoryLimitRejected(error));
    }
  };
};
const HistoryNotifThunk = (params, token) => {
  return async (dispatch) => {
    try {
      dispatch(HistoryNotifPending());
      const result = await HistoryLimit(params, token);
      dispatch(HistoryNotifFulfilled(result.data));
    } catch (error) {
      dispatch(HistoryNotifRejected(error));
    }
  };
};

const transactionAction = {
  HistoryLimitThunk,
  HistoryNotifThunk,
};

module.exports = transactionAction;
