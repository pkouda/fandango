import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import HomeReducer from './reducer_home';


const rootReducer = combineReducers({
    home : HomeReducer,
});

export default rootReducer;
