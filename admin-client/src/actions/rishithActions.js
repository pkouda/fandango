import axios from 'axios';
import {history} from "../App";
import swal from "sweetalert";


// Signup Actions
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';


// Genre Actions

export const GENRE_SEARCH_SUCESS ="GENRE_SEARCH_SUCESS";
export const GENRE_SEARCH_ERROR ="GENRE_SEARCH_ERROR";


const ROOT_URL = 'http://localhost:3001';



export function doSignUp(userdata) {
    return function (dispatch) {
        console.log("Inside the sign up actions");
        axios.post(`${ROOT_URL}/user/signup`, userdata)
            .then((res) => {
                console.log("Inside actions 'Response'-> ", res.data);
                window.localStorage.setItem('user',res.data.user);
                window.localStorage.setItem('isLoggedIn',true);
                swal("Signup Successful");
                history.push('/home')
                dispatch({type:SIGN_UP_SUCCESS, payload:res.data});
            })
            .catch((error) => {
                dispatch({type:SIGN_UP_ERROR, payload:error})
            });

    }
}

export function searchGenre(userdata) {
    return function (dispatch) {
        console.log("Inside the Search Genre actions: ", userdata);
        axios.get(`${ROOT_URL}/movietheatres/getMoviesGenreInSearchPage?action=${userdata}`)
            .then((res) => {
                console.log("Inside actions 'Response'-> ", res.data);

                window.localStorage.setItem('isLoggedIn',true);
                // history.push('/home');
                dispatch({type:GENRE_SEARCH_SUCESS, payload:res.data});
            })
            .catch((error) => {
                console.log("Inside error 'Response'->", error);
                dispatch({type:GENRE_SEARCH_ERROR, payload:error})
            });

    }
}

