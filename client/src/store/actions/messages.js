import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_MESSAGES, REMOVE_MESSAGE } from "../actionTypes";

//action creators
export const loadMessages = messages => ({
    type: LOAD_MESSAGES,
    messages
});


export const fetchMessages = () => {
    return dispatch => {
        return apiCall("GET", "/api/messages")
            .then( res => {
                console.log(res);
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