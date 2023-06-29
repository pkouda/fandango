import {GENRE_SEARCH_ERROR, GENRE_SEARCH_SUCESS} from '../actions/rishithActions';


export default function (state = {
    movieGenreData: [],
    message: ''
}, action) {

    switch (action.type) {
        case GENRE_SEARCH_SUCESS:
            console.log('Inside Genre Search Reducer ', action.payload);
            return {movieGenreData: action.payload.movieGenreData};
            break;

        case GENRE_SEARCH_ERROR:
            console.log("Inside Genre Search Reducer ", action.payload.message);
            return {movieGenreData: [], message: action.payload.message};
            break;

        default:
            return state;
    }


}







