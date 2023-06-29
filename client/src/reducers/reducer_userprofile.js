import {
    BASIC_INFO_SUCCESS,
    BASIC_INFO_ERROR,
    USER_DETAILS_SUCCESS,
    PASSWORD_SUCCESS,
    PASSWORD_ERROR,
    EMAIL_SUCCESS,
    EMAIL_ERROR,
    SAVE_PAYMENT_SUCCESS,
    SAVE_PAYMENT_ERROR,
    DELETE_PAYMENT_ERROR,
    DELETE_PAYMENT_SUCCESS,
    IMAGE_SUCCESS
} from "../actions/satishActions";

export default function (state = {
    user: {},
    message: ''
}, action) {
    // if(action.error){
    //     action.type = LOGIN_ERROR;
    // }
    // console.log("Inside Reducer",action.payload);
    switch (action.type) {
        case BASIC_INFO_SUCCESS:
            return {...state, user: action.payload.user};
            break;
        case BASIC_INFO_ERROR:
            return {...state, message: action.payload.data.message};
            break;
        case USER_DETAILS_SUCCESS:
            return {user: action.payload.user};
            break;
        case IMAGE_SUCCESS:
            return {...state, user: action.payload.user};
            break;
        // case SIGN_OUT:
        //     //  sessionStorage.clear();
        //     return {...state, isLoggedIn:false,  username: '' };
        //     break;
        default:
            return {...state};
    }

}