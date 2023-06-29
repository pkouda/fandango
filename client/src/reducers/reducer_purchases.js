import {PURCHASE_SUCCESS,PURCHASE_ERROR} from "../actions/satishActions";
import _ from 'lodash';

export default function (state={
    message : '',
    history: ''

},action){
    // console.log("inside Search users reducer",action.payload);
    switch(action.type){
        case PURCHASE_SUCCESS:
            return {...state, message: action.payload.message, history: _.mapKeys(action.payload.purchase,'transactionid')};
            break;
        case PURCHASE_ERROR:
            return {...state, messsage: action.payload.message};
            break;
        default:
            return {...state};
    }
}