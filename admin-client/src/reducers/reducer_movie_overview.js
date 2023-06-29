import {MOVIE_OVERVIEW} from "../actions/vishalActions";

const movieOverview = {
    movie: {}
}

export default function (state = movieOverview, action) {
    switch (action.type) {
        case MOVIE_OVERVIEW:
            console.log(action.payload)
            return {
                movie: action.payload
            }
        default:
            return state;
    }
}
