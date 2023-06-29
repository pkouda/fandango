

const home = {
    editMovieSaved: ""

}

export default function (state = home, action) {
    switch (action.type) {
        case "MOVIES_HALL_LIST_EDIT":
            return {
                editMovieSaved: action.payload
            }
        default:
            return state;
    }
}