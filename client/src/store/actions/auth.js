import { apiCall } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";

//action creator
export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

// //middleware function
// export function authUser(type, userData){
//     return dispatch => {
//         // wrap our thunk with a promise, so we can wait for the API call
//         return new Promise((resolve, reject) => {
//             return apiCall("post", `/api/auth/${type}`, userData)
//                     .then(({token, ...user}) => {   // here we destructure from the AJAX response the token and wrap
//                                                     //-> rest of the returned properties in user object
//                         //storing token in local storage
//                         localStorage.setItem("jwtToken", token);
//                         //dispatching action
//                         dispatch(setCurrentUser(user));
//                         dispatch(removeError());
//                         resolve();  //indicate that the API call is successful
//                     })
//                     .catch( err => {
//                         console.log("INNNNNNN catcg");
//                         dispatch(addError(err.message));
//                         console.log(err);
//                         reject();   //indicate that the API call failed
//                     });
//         });
//     };
// }

//middleware function - without promise wrapping
export function authUser(type, userData){
    return dispatch => {
        // return a promise from the API call
        return apiCall("post", `/api/auth/${type}`, userData)
                .then(({token, ...user}) => {   // here we destructure from the AJAX response the token and wrap
                    //-> the rest of the returned properties (id & username) in user object
                    //storing token in local storage
                    localStorage.setItem("jwtToken", token);
                    //dispatching action to set current user
                    dispatch(setCurrentUser(user));
                    //remove previous errors
                    dispatch(removeError());
                })
                .catch( err => {
                    dispatch(addError(err.message));
                });
    };
}