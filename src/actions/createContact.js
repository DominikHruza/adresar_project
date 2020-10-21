import { CONTACT_CREATE_SUCCESS, CONTACT_CREATE_ERROR } from "./action-types";
export const createContact = (contactData) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
      const dbRef = firebase.database().ref("contacts");
      const contact = {
        ...contactData,
        isFavorite: false,
      };
      await dbRef.push(contact);
      dispatch({ type: CONTACT_CREATE_SUCCESS });
    } catch (error) {
      dispatch({ type: CONTACT_CREATE_ERROR });
    }
  };
};
