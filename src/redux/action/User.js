import { ActionType } from "redux-promise-middleware";
import {
  createPin,
  getDataById,
  getDashboard,
  searchUser,
} from "src/utils/User";
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

const profileidPending = () => ({
  type: ACTION_STRING.userGetprofileid.concat("_", Pending),
});
const profileidRejected = (error) => ({
  type: ACTION_STRING.userGetprofileid.concat("_", Rejected),
  payload: { error },
});
const profileidFulfilled = (data) => ({
  type: ACTION_STRING.userGetprofileid.concat("_", Fulfilled),
  payload: { data },
});

const dashboardPending = () => ({
  type: ACTION_STRING.userDashboard.concat("_", Pending),
});
const dashboardRejected = (error) => ({
  type: ACTION_STRING.userDashboard.concat("_", Rejected),
  payload: { error },
});
const dashboardFulfilled = (data) => ({
  type: ACTION_STRING.userDashboard.concat("_", Fulfilled),
  payload: { data },
});

const searchPending = () => ({
  type: ACTION_STRING.userSearch.concat("_", Pending),
});
const searchRejected = (error) => ({
  type: ACTION_STRING.userSearch.concat("_", Rejected),
  payload: { error },
});
const searchFulfilled = (data) => ({
  type: ACTION_STRING.userSearch.concat("_", Fulfilled),
  payload: { data },
});

const updatesearchPending = () => ({
  type: ACTION_STRING.updateSearch.concat("_", Pending),
});
const updatesearchRejected = (error) => ({
  type: ACTION_STRING.updateSearch.concat("_", Rejected),
  payload: { error },
});
const updatesearchFulfilled = (data) => ({
  type: ACTION_STRING.updateSearch.concat("_", Fulfilled),
  payload: { data },
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

const profileidThunk = (token, id) => {
  return async (dispatch) => {
    try {
      dispatch(profileidPending());
      const result = await getDataById(token, id);
      dispatch(profileidFulfilled(result.data));
    } catch (error) {
      dispatch(profileidRejected(error));
    }
  };
};

const getDashboards = (token, id) => {
  return async (dispatch) => {
    try {
      dispatch(dashboardPending());
      const result = await getDashboard(token, id);
      console.log(result.data.data);
      dispatch(dashboardFulfilled(result.data.data));
    } catch (error) {
      dispatch(dashboardRejected(error));
    }
  };
};

const getUser = (token, params) => {
  return async (dispatch) => {
    try {
      dispatch(searchPending());
      const result = await searchUser(token, params);
      dispatch(searchFulfilled(result.data));
    } catch (error) {
      dispatch(searchRejected(error));
    }
  };
};
const updateSearch = (data) => {
  return async (dispatch) => {
    try {
      dispatch(updatesearchPending());
      dispatch(updatesearchFulfilled(data));
    } catch (error) {
      dispatch(updatesearchRejected(error));
    }
  };
};

const userAction = {
  pinThunk,
  profileidThunk,
  getDashboards,
  getUser,
  updateSearch,
};

module.exports = userAction;
