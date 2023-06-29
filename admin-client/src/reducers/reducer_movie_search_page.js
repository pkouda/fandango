const home = {
    moviesTheatres: {

        moviemap:[{
            data:[{
            "ID": 108,
            "HallID": "Townie3|SanJose|CA|95127",
            "MovieName": "Rangasthalam",
            "ScreenNo": 2,
            "Showtimes": ["9.30am", "12:30pm", "3:30pm", "7:30pm", "10:30pm"],
            "NoofSeats": 32,
            "TicketPrice": 10
        }],
            type:"test"
    }]
}}

export default function (state = home, action) {
    switch (action.type) {
        case "MOVIES_SEARCH_PAGE":
            return {
                moviesTheatres: action.payload
            }
        default:
            return state;
    }
}