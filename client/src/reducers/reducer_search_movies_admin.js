import {ADMIN_MOVIES} from "../actions/vishalActions";

const moviesSearch = {
    movies:[]
}

export default function (state = moviesSearch, action) {
    switch (action.type) {
        case ADMIN_MOVIES:
            return {
                movies: action.payload
            }
        default:
            return state;
    }
}