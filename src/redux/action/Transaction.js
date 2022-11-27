import { ActionType } from "redux-promise-middleware";
import { HistoryLimit, CreateTransfer } from "src/utils/Transaction";
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
const ConfirmationPending = () => ({
  type: ACTION_STRING.userConfirmation.concat("_", Pending),
});
const ConfirmationRejected = (error) => ({
  type: ACTION_STRING.userConfirmation.concat("_", Rejected),
  payload: { error },
});
const ConfirmationFulfilled = (data) => ({
  type: ACTION_STRING.userConfirmation.concat("_", Fulfilled),
  payload: { data },
});

const TransactionFulfilled = (data) => ({
  type: ACTION_STRING.createTransaction.concat("_", Fulfilled),
  payload: { data },
});
const TransactionPending = () => ({
  type: ACTION_STRING.createTransaction.concat("_", Pending),
});
const TransactionRejected = (error) => ({
  type: ACTION_STRING.createTransaction.concat("_", Rejected),
  payload: { error },
});

const resetTransactionFulfilled = (data) => ({
  type: ACTION_STRING.resetTransaction.concat("_", Fulfilled),
  payload: { data },
});
const resetTransactionRejected = (error) => ({
  type: ACTION_STRING.resetTransaction.concat("_", Rejected),
  payload: { error },
});

const resetTransferThunk = () => {
  return async (dispatch) => {
    try {
      dispatch(resetTransactionFulfilled());
    } catch (error) {
      dispatch(resetTransactionRejected(error));
    }
  };
};
const createTransactionThunk = (body, token) => {
  return async (dispatch) => {
    try {
      dispatch(TransactionPending());
      const result = await CreateTransfer(body, token);
      dispatch(TransactionFulfilled(result.data));
    } catch (error) {
      dispatch(TransactionRejected(error));
    }
  };
};
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
const confirmationThunk = (data) => {
  return async (dispatch) => {
    try {
      dispatch(ConfirmationFulfilled(data));
    } catch (error) {
      dispatch(ConfirmationRejected(error));
    }
  };
};

const transactionAction = {
  HistoryLimitThunk,
  HistoryNotifThunk,
  confirmationThunk,
  createTransactionThunk,
  resetTransferThunk,
};

module.exports = transactionAction;
