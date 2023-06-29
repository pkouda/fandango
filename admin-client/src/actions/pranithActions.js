import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import swal from 'sweetalert'

const ROOT_URL = 'http://localhost:3001';

export function getMoviesInSearchPage(values) {
    console.log("from action", values);
    return (dispatch) => {
        console.log("kjhg", values)
        const response = axios.post(`${ROOT_URL}/movietheatres/getMoviesInSearchPage`,values)
            .then(response => {

                console.log(response.data)
                dispatch(moviesInSearchPage(response.data))
            }).catch(error => {
                console.log(error);
            });
    }
}
export function addMovieHallAdmin(values) {
    console.log("from action addMovieHallAdmin", values);
    return (dispatch) => {
        console.log("kjhg", values)
        const response = axios.post(`${ROOT_URL}/movietheatres/addMovieHallAdmin`,values)
            .then(response => {

                console.log(response.data)
                if(response.data.code==200)
                dispatch(moviesInSearchPageAdmin(true))
                else
                    dispatch(moviesInSearchPageAdmin(false))
            }).catch(error => {
                console.log(error);
                dispatch(moviesInSearchPage(false))
            });
    }
}

export function getAllMovieHalls(values) {
    console.log("from action GetMoviesnHalls");
    return (dispatch) => {
        console.log("kjhg")
        const response = axios.post(`${ROOT_URL}/movietheatres/getAllMovieHalls`,values)
            .then(response => {

                console.log(response.data)
                dispatch(GetMoviesnHallsReducer(response.data))
            }).catch(error => {
                console.log(error);
            });
    }
}
export function saveMovieHallEdits(values) {
    console.log("from action saveMovieHallEdits");
    return (dispatch) => {
        console.log("kjhg")
        const response = axios.post(`${ROOT_URL}/movietheatres/savemoviehalledits`,values)
            .then(response => {

                console.log(response.data)
                if(response.data.code==200) {
                    swal("Movies Edited")
                }
               // dispatch(GetMoviesnHallsReducer(response.data))
            }).catch(error => {
                console.log(error);
            });
    }
}

export function  savePaymentData(values) {
    console.log(values)
    return (dispatch) => {
        console.log("kjhg", values)
        const response = axios.post(`${ROOT_URL}/movietheatres/savePayment`,values)
            .then(response => {
                console.log(response);
                if(response.status==206){
                    dispatch(savedPayment(false))
                }
                else {
                    console.log(response.data)
                    dispatch(savedPayment(true))
                }
            }).catch(error => {
                console.log(error);
                dispatch(savedPayment(false))
            });
    }

}
function savedPayment(values){
    console.log(values);
    return {
        type: "MOVIES_SAVE_PAYMENT",
        payload: values
    }


}
export function GetMoviesnHalls(values) {
    console.log("from action GetMoviesnHalls");
    return (dispatch) => {
        console.log("kjhg")
        const response = axios.post(`${ROOT_URL}/movietheatres/getmoviesnhalls`,values)
            .then(response => {

                console.log(response.data)
                dispatch(GetMoviesnHallsReducer(response.data))
            }).catch(error => {
                console.log(error);
            });
    }
}
export function GetMoviesHallListing(values) {
    console.log("from action GetMoviesHallListing",values);
    return (dispatch) => {
        //console.log("kjhg")
        const response = axios.post(`${ROOT_URL}/movietheatres/getmovieshalllisting`,values)
            .then(response => {

             //   console.log(response.data)
                dispatch(GetMoviesHallListingReducer(response.data))
            }).catch(error => {
                console.log(error);
            });
    }
}
export function editMovieSearch(values) {
    console.log("from action editMovieSearch",values);
    return (dispatch) => {
        //console.log("kjhg")
        const response = axios.post(`${ROOT_URL}/movietheatres/editmoviesearch`,values)
            .then(response => {

                  console.log(response.data)
                dispatch(GetMoviesHallListingReducer(response.data))
            }).catch(error => {
                console.log(error);
            });
    }
}
export function SQLbookingSearch(values) {
    console.log("from action editMovieSearch",values);
    return (dispatch) => {
        //console.log("kjhg")
        const response = axios.post(`${ROOT_URL}/movietheatres/bookingsearch`,values)
            .then(response => {

                console.log(response.data)
                dispatch(BookingReducer(response.data))
            }).catch(error => {
                console.log(error);
            });
    }
}






export function CancelBooking(values) {
    console.log("from action CancelBooking",values);
    let i=0;
    // for(i=0;i<7;i++)
    {
        //console.log(i,"-------------------------------------------");
        return (dispatch) => {
            //console.log("kjhg",values);

            //  values.Date=i;
            //console.log(values);
            const response = axios.post(`${ROOT_URL}/movietheatres/cancelbooking`, values)
                .then(response => {
                    console.log(response.data);

                    //   console.log(response.data)
                    if (response.data.code == 200 ||response.data.code == 201)
                        dispatch(CancelBookingReducer(true));
                    else if (response.data = "movies not added")
                        dispatch(CancelBookingReducer(false));

                }).catch(error => {
                    console.log(error);
                });
        }
    }
}

export function saveMovieListing(values) {
    console.log("from action saveMovieListing");
    let i=0;
    // for(i=0;i<7;i++)
    {
        //console.log(i,"-------------------------------------------");
        return (dispatch) => {
            //console.log("kjhg",values);

            //  values.Date=i;
            //console.log(values);
            const response = axios.post(`${ROOT_URL}/movietheatres/savemovieListing`, values)
                .then(response => {
                    console.log(response.data);

                    //   console.log(response.data)
                    if (response.data.code == 200)
                        dispatch(editMoviesReducer(true));
                    else if (response.data = "movies not added")
                        dispatch(editMoviesReducer(false));

                }).catch(error => {
                    console.log(error);
                });
        }
    }
}

export function addMovie(values) {
    console.log("from action addMovie");
    let i=0;
   // for(i=0;i<7;i++)
    {
        //console.log(i,"-------------------------------------------");
    return (dispatch) => {
        //console.log("kjhg",values);

          //  values.Date=i;
            //console.log(values);
            const response = axios.post(`${ROOT_URL}/movietheatres/addmovies`, values)
                .then(response => {

                 //   console.log(response.data)
                    if (response.data.code == 200)
                        dispatch(addMoviesReducer(true));
                    else if (response.data = "movies not added")
                        dispatch(addMoviesReducer("movies not added"));

                }).catch(error => {
                    console.log(error);
                });
        }
    }
}
function moviesInSearchPage(response){
    return {
        type: "MOVIES_SEARCH_PAGE",
        payload: response
    }
}
function moviesInSearchPageAdmin(response){
    return {
        type: "MOVIES_SEARCH_PAGE_ADMIN",
        payload: response
    }

}


function addMoviesReducer(response){
    return {
        type: "MOVIES_ADD",
        payload: response
    }
}
function editMoviesReducer(response){
    return{
        type: "MOVIES_HALL_LIST_EDIT",
        payload: response


    }
}


function CancelBookingReducer(response){
    return{
        type: "USER_BOOKING_DELETED",
        payload: response


    }
}
function GetMoviesnHallsReducer(response){
    return {
        type: "MOVIES_SEARCH_DROPDOWN",
        payload: response
    }
}
function GetMoviesHallListingReducer(response){
    //console.log(response);
    return {
        type: "MOVIES_HALL_LISTING_EDIT",
        payload: response
    }
}
function BookingReducer(response){
    //console.log(response);
    return {
        type: "BOOKING_HISTORY",
        payload: {
            code:response.code,
            transactions:response.transactions}
    }
}
