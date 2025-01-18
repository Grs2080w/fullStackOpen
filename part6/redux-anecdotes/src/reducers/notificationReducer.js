import { createSlice } from "@reduxjs/toolkit";

function setNotification(message) {
  return {
    type: "notification/setNotification",
    payload: message,
  };
}

function dumpNotification() {
  return {
    type: "notification/clearNotification",
    payload: "",
  };
}

const notificationSlice = createSlice({
  name: "notification",
  initialState: [],
  reducers: {
    setNotification(state, { payload }) {
      return {
        message: payload,
        showNotification: true,
      };
    },
    clearNotification(state, action) {
      return {
        message: action.payload,
        showNotification: false,
      };
    },
  },
});

const notificationReducer = notificationSlice.reducer;
export { notificationReducer, setNotification, dumpNotification };

export const newNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => dispatch(dumpNotification()), time * 1000);
  };
};
