import {FETCH_USER, SIGN_OUT, FETCH_USER_NULL} from "../actions/satishActions";

//state may be object or array or anything that we want

export default function (state = {
    isLoggedIn: false,
    isLoggingIn: true,
    user: {},
}, action) {
    switch (action.type) {

        case FETCH_USER:
            console.log("lhg")
            return {...state, isLoggingIn: false, isLoggedIn: true, user: action.payload.user.user};
        case FETCH_USER_NULL:
            return {...state, isLoggingIn: false, isLoggedIn: false, user: {}};
            break;
        // case SIGN_OUT:
        //     return {...state, isLoggingIn: false, isLoggedIn: false, username: ''};
        //     break;
        default:
            return state;
    }
}
