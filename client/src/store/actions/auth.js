import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";

//action creator
export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

//attach token to request
export function setAuthorizationToken(token){
    setTokenHeader(token);
}

//middleware - logout
export function logout(){
    return dispatch => {
        //clear local storage (that stores 'token') TODO: need to clear only 'token' in case we are storing more things
        localStorage.clear();
        //delete token from future requests
        setAuthorizationToken(false);
        //set current user to be empty
        dispatch(setCurrentUser({}));
    }
}

//middleware function
export function authUser(type, userData){
    return dispatch => {
        // wrap our thunk with a promise, so we can wait for the API call
        return new Promise((resolve, reject) => {
            return apiCall("POST", `/api/auth/${type}`, userData)
                    .then(({token, ...user}) => {   // here we destructure from the AJAX response the token and wrap
                                                    //-> the rest of the returned properties (id & username) in user object
                        //storing token in local storage
                        localStorage.setItem("jwtToken", token);
                        //attach token to future requests
                        setAuthorizationToken(token);
                        //dispatching action to set current user
                        dispatch(setCurrentUser(user));
                        //remove previous errors
                        dispatch(removeError());
                        resolve();  //indicate that the API call is successful
                    })
                    .catch( err => {
                        dispatch(addError(err.message));
                        // setTimeout(() => dispatch(removeError()), 2000); //to remove error message after 2sec
                        reject();   //indicate that the API call failed
                    });
        });
    };
}