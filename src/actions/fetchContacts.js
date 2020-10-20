import { CONTACT_FETCH_SUCCESS, CONTACT_FETCH_ERROR } from "./action-types";

export const fetchContacts = (contactData) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
      var userId = firebase.auth().currentUser.uid;
      console.log(userId);
      return firebase
        .database()
        .ref("/contacts")
        .once("value")
        .then(function (snapshot) {
          const dbItems = snapshot.val();
          const thisUserItems = [];

          for (const item of Object.entries(dbItems)) {
            console.log(item);
            if (item[1].uid === userId) {
              thisUserItems.push({ id: item[0], ...item[1] });
            }
          }

          dispatch({ type: CONTACT_FETCH_SUCCESS, payload: thisUserItems });
        });
    } catch (error) {
      dispatch({ type: CONTACT_FETCH_ERROR });
    }

    console.log(contactData);
    //dispatch({});
  };
};
