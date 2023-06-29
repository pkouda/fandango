const home = {
    movies: {
code:400
    }
}

export default function (state = home, action) {
    switch (action.type) {
        case "MOVIES_HALL_LISTING_EDIT":
            return {
                movies: action.payload
            };
        default:
            return state;
    }
}