import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_MESSAGES, REMOVE_MESSAGE } from "../actionTypes";

/* Action creators */
export const loadMessages = messages => ({
    type: LOAD_MESSAGES,
    messages
});

export const removeMessage = id => ({
    type: REMOVE_MESSAGE,
    id
});


/* THUNKS */
export const fetchMessages = () => {
    return dispatch => {
        return apiCall("GET", "/api/messages")
            .then( res => {
                dispatch(loadMessages(res))
            })
            .catch( err => {
                dispatch(addError(err.message));
            });
    }
};

export const postNewMessage = (text) => {
    return (dispatch, getState) => {
        let { currentUser } = getState();
        const id = currentUser.user.id;
        return apiCall("POST", `/api/users/${id}/messages`, { text })
            .then( res => {
                return {};  // we are returning an empty object because we don't need to dispatch any action
                            //-> because when we are going back to the homepage "/" we are loading all the messages of
                            //-> the current user, thus the new message that we just added to the db will be loaded as well
            })
            .catch( err => {
                dispatch(addError(err.message));
            });
    }
};

export const deleteMessage = (user_id, message_id) => {
    return dispatch => {
        return apiCall("DELETE", `/api/users/${user_id}/messages/${message_id}`)
            .then( () => {
                dispatch(removeMessage(message_id));
            })
            .catch( err => {
                dispatch(addError(err.message));
            });
    }
};