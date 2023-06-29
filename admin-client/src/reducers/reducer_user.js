import {SIGN_IN,SIGN_OUT,SIGN_IN_ERROR, FETCH_USER, FETCH_USER_NULL} from "../actions/satishActions";
import {SIGN_UP_ERROR,SIGN_UP_SUCCESS} from "../actions/rishithActions";

export default function (state={
    isLoggedIn : false,
    isCheckedIn: true,
    username: '',
    message: '',
    posted: false,
    type : '',
    imgupload: false,
}, action){
    // if(action.error){
    //     action.type = LOGIN_ERROR;
    // }
    // console.log("Inside Reducer",action.payload);
    switch (action.type){
        case SIGN_IN:
            // sessionStorage.setItem("islogin", true);
            // sessionStorage.setItem("username", action.payload.data.username);

            return  {...state, isLoggedIn:true, message:action.payload.data.message, isCheckedIn: true, user: action.payload.data.username};
            break;
        case SIGN_IN_ERROR:
            console.log('Inside user Reducer ',action.payload.data, action.payload.data.message);
            return {...state, isLoggedIn:false, username: '', message:action.payload.data.message };
            break;
        case SIGN_UP_SUCCESS:
            console.log("Inside signup reducer: ", action.payload.message);
            return  {...state, isLoggedIn:true, message: action.payload.message};
            break;
        case SIGN_UP_ERROR:
            return {...state, isLoggedIn:false, message:action.payload.response.data.message};

        case SIGN_OUT:
            //  sessionStorage.clear();
            return state;
            break;

        // case POST_PROJECT:
        //     return {...state, posted:true};
        //     break;
        // case UPDATE_PROFILE:
        //     return {...state, imgupload:true };
        //     break;
        // case FETCH_USER:
        //     console.log("user new:",action.payload.data);
        //     return {...state, isLoggedIn:true, username: action.payload.data};
        //     break;
        default:
            return {...state};
    }

}
