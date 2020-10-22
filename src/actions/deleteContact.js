import { CONTACT_DELETE_SUCCESS, CONTACT_DELETE_ERROR } from "./action-types";

export const deleteContact = (id) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        try {
            firebase
                .database()
                .ref(`/contacts/${id}`)
                .remove()
                .then(function (snapshot) {
                    dispatch({
                        type: CONTACT_DELETE_SUCCESS,
                        payload: { id },
                    });
                });
        } catch (error) {
            dispatch({ type: CONTACT_DELETE_ERROR });
        }
    };
};
