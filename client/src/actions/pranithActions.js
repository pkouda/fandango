import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

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
export function GetMoviesnHalls() {
    console.log("from action GetMoviesnHalls");
    return (dispatch) => {
        console.log("kjhg")
        const response = axios.post(`${ROOT_URL}/movietheatres/getmoviesnhalls`)
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