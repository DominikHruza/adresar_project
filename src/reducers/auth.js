import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    RESET_LOGIN,
    SIGN_OUT,
} from "../actions/action-types";

const initState = {
    authFailed: null,
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                authFailed: false,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                authFailed: true,
            };
        case SIGN_OUT:
            return state;

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
