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
                console.log("IN THEN")
                dispatch(loadMessages(res))
            })
            .catch( err => {
                console.log("IN CATCH")
                dispatch(addError(err.message))
            });
    }
};