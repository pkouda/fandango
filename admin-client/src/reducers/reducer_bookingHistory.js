const home = {
    transactions:[],
    code:400
}

export default function (state = home, action) {
    switch (action.type) {
        case "BOOKING_HISTORY":
            return {
                transactions: action.payload.transactions,
                code:action.payload.code
            }
        default:
            return {...state};
    }
}