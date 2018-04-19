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

function moviesInSearchPage(response){
    return {
        type: "MOVIES_SEARCH_PAGE",
        payload: response
    }
}