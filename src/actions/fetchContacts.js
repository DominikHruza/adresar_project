import {
  CONTACT_FETCH_SUCCESS,
  CONTACT_FETCH_ERROR,
  CONTACT_DETAILS_FETCH_ERROR,
  CONTACT_DETAILS_FETCH_SUCCESS,
} from "./action-types";

export const fetchContacts = (contactData) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
      var userId = firebase.auth().currentUser.uid;

      return firebase
        .database()
        .ref("/contacts")
        .once("value")
        .then(function (snapshot) {
          const dbItems = snapshot.val();
          const thisUserItems = [];

          for (const item of Object.entries(dbItems)) {
            if (item[1].uid === userId) {
              thisUserItems.push({ id: item[0], ...item[1] });
            }
          }

          dispatch({ type: CONTACT_FETCH_SUCCESS, payload: thisUserItems });
          return thisUserItems;
        });
    } catch (error) {
      dispatch({ type: CONTACT_FETCH_ERROR });
    }
  };
};

export const getSingleContact = (id) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
      return firebase
        .database()
        .ref(`/contacts/${id}`)
        .once("value")
        .then(function (snapshot) {
          const dbItem = snapshot.val();
          dispatch({
            type: CONTACT_DETAILS_FETCH_SUCCESS,
            payload: { id, ...dbItem },
          });
        });
    } catch (error) {
      dispatch({ type: CONTACT_DETAILS_FETCH_ERROR });
    }
  };
};

const fetchFavorites = () => {};
