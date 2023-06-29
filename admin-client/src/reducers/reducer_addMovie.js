

const home = {
    addMovies: false

        }

export default function (state = home, action) {
    switch (action.type) {
        case "MOVIES_ADD":
            return {
                addMovies: action.payload
            }
        default:
            return state;
    }
}