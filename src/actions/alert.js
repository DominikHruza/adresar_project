import { v4 as uuidv4 } from "uuid";
import { SET_ALERT, REMOVE_ALERT, RESET_LOGIN } from "./action-types";

export const setAlert = (msg, alertType) => (dispatch) => {
    const id = uuidv4();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id },
    });

    //remove alert and reset login state
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
    setTimeout(() => dispatch({ type: RESET_LOGIN, payload: id }), 5000);
};
