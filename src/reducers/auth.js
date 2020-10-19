import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  RESET_LOGIN,
} from "../actions/action-types";

const initState = {
  authFailed: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log("login success");

      return {
        ...state,
        authFailed: false,
      };
    case LOGIN_FAIL:
      console.log("login fail");
      return {
        ...state,
        authFailed: true,
      };
    case RESET_LOGIN:
      return {
        ...state,
        authFailed: null,
      };

    default:
      return state;
  }
};

export default authReducer;
