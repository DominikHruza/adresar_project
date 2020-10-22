import {
    CONTACT_DETAILS_FETCH_ERROR,
    CONTACT_DETAILS_FETCH_SUCCESS,
    CONTACT_FETCH_SUCCESS,
} from "../actions/action-types";

const initState = {};

export default function (state = initState, action) {
    const { type, payload } = action;
    switch (type) {
        case CONTACT_DETAILS_FETCH_SUCCESS:
            return {
                ...state,
                ...payload,
            };
        //if back on dashboard reset active contact
        case CONTACT_FETCH_SUCCESS:
            return {};
        case CONTACT_DETAILS_FETCH_ERROR:
            return state;
        default:
            return state;
    }
}
