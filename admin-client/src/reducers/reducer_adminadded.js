

const home = {
    addMovies: false

}

export default function (state = home, action) {
    switch (action.type) {
        case "MOVIES_SEARCH_PAGE_ADMIN":
            return {
                addMoviesAdmin: action.payload
            }
        default:
            return state;
    }
}


