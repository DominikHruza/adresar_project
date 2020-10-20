import {
  CONTACT_CREATE_SUCCESS,
  CONTACT_CREATE_ERROR,
  CONTACT_FETCH_SUCCESS,
  CONTACT_FETCH_ERROR,
} from "../actions/action-types";

const initState = [];

export default function (state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case CONTACT_CREATE_SUCCESS:
      return state;
    case CONTACT_CREATE_ERROR:
      return state;
    case CONTACT_FETCH_SUCCESS:
      return [...payload];
    case CONTACT_FETCH_ERROR:
      return {
        ...state,
        contacts: null,
      };
    default:
      return state;
  }
}
