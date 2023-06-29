const home = {
    booking:"ther is will"
}

export default function (state = home, action) {
    switch (action.type) {
        case "MOVIES_SAVE_PAYMENT":
            return {
                booking: action.payload
            }
        default:
            return state;
    }
}