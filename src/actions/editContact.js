import {
    CONTACT_UPDATE_SUCCESS,
    CONTACT_UPDATE_ERROR,
    FAVORITES_ADD_SUCCESS,
    FAVORITES_ADD_ERROR,
    FAVORITES_REMOVE_SUCCESS,
    FAVORITES_REMOVE_ERROR,
} from "./action-types";

export const editContact = (contactData) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        const { id, ...restContactData } = contactData;

        firebase
            .database()
            .ref(`/contacts/${contactData.id}`)
            .update(restContactData, (error) => {
                if (error) {
                    dispatch({ type: CONTACT_UPDATE_ERROR });
                }
                dispatch({ type: CONTACT_UPDATE_SUCCESS });
            });
    };
};

export const addFavorite = (id) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        var updates = {};
        updates["/contacts/" + id + "/isFavorite"] = true;

        firebase
            .database()
            .ref(`/contacts/${id}`)
            .update({ isFavorite: true }, (error) => {
                if (error) {
                    dispatch({ type: FAVORITES_ADD_ERROR });
                }

                const contactsInState = getState().contacts;
                const foundContact = contactsInState.find(
                    (contact) => contact.id === id
                );
                foundContact.isFavorite = true;

                dispatch({
                    type: FAVORITES_ADD_SUCCESS,
                    payload: foundContact,
                });
            });
    };
};

export const removeFavorite = (id) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        var updates = {};
        updates["/contacts/" + id + "/isFavorite"] = true;

        firebase
            .database()
            .ref(`/contacts/${id}`)
            .update({ isFavorite: false }, (error) => {
                if (error) {
                    dispatch({ type: FAVORITES_REMOVE_ERROR });
                }

                const contactsInState = getState().contacts;
                const foundContact = contactsInState.find(
                    (contact) => contact.id === id
                );
                foundContact.isFavorite = false;
                dispatch({
                    type: FAVORITES_REMOVE_SUCCESS,
                    payload: foundContact,
                });
            });
    };
};
