import { SET_CURRENT_USER } from "../actionTypes";

const DEFAULT_STATE = {
    isAuthenticated: false, // hopefully will be true, when logged in
    user: {} // will contain all the user info when logged in
};


export default (state = DEFAULT_STATE, action) => {
    switch (action.type){
        case SET_CURRENT_USER:
            return {
                // if there are keys in action.user object make true else false
                isAuthenticated: Object.keys(action.user).length > 0,
                user: action.user
            };
        default:
            return state;
    }
}