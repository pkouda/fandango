import {REVENUE_DETAILS_SUCCESS, REVENUE_DETAILS_ERROR} from "../actions/satishActions";
import _ from 'lodash';


export default function (state={
    message:'',
    movies: '',
    totalamount: null,
},action){
     // console.log("inside revenue users reducer",action.payload);
    switch(action.type){
        case REVENUE_DETAILS_SUCCESS:
            console.log("inside revenue users reducer",action.payload.data);
            return {...state, message: action.payload.message, movies: action.payload.data};
            break;
        case REVENUE_DETAILS_ERROR:
            return {...state, messsage: action.payload.message};
            break;
        default:
            return {...state};
    }
}