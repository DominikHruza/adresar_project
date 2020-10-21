import {
  CONTACT_CREATE_SUCCESS,
  CONTACT_CREATE_ERROR,
  CONTACT_FETCH_SUCCESS,
  CONTACT_FETCH_ERROR,
  SIGN_OUT,
  FAVORITES_ADD_ERROR,
  FAVORITES_ADD_SUCCESS,
  FAVORITES_REMOVE_SUCCESS,
  FAVORITES_REMOVE_ERROR,
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

    case FAVORITES_ADD_SUCCESS:
    case FAVORITES_REMOVE_SUCCESS:
      return state.map((item) => {
        if (item.id === payload.id) {
          return payload;
        } else {
          return item;
        }
      });

    case FAVORITES_ADD_ERROR:
    case FAVORITES_REMOVE_ERROR:
      return [...state];

    case CONTACT_FETCH_ERROR:
    case SIGN_OUT:
      return [];
    default:
      return state;
  }
}
