const home = {
    movies: {
        moviemap: [
            {movietheatre: [{"townie": 3}, {"towniee": 4}]},
            {moviemap: []}
        ],
        movietheatre: [
            {
                data: [{"user": 3}, {"user": 4}]
            }

        ]
    }
}

export default function (state = home, action) {
    switch (action.type) {
        case "MOVIES_SEARCH_DROPDOWN":
            return {
                movies: action.payload
            }
        default:
            return state;
    }
}