
const home = {
    bookingCancel: ""

}

export default function (state = home, action) {
    switch (action.type) {
        case "USER_BOOKING_DELETED":
            return {
                bookingCancel: action.payload
            }
        default:
            return state;
    }
}