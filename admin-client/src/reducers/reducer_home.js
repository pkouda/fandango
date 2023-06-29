import {MOVIES_CAROUSEL_NOW} from "../actions/vishalActions";

//state may be object or array or anything that we want

const home = {
    movies: []
}

export default function (state = home, action) {
    switch (action.type) {
        case MOVIES_CAROUSEL_NOW:
            return {
                movies: action.payload
            }
        default:
            return state;
    }
}
