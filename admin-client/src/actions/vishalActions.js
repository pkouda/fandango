import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import {history} from "../App";

export const DEMO = 'demo';
export const MOVIES_CAROUSEL_NOW = 'moviesCarouselNow';
export const MOVIE_OVERVIEW = 'movieOverview';
export const ADMIN_MOVIES = 'adminMovies';



const ROOT_URL = 'http://localhost:3001';

function sendDemo(payload) {
    return {
        type: DEMO,
        payload: payload
    }
}

export function demo() {
    return (dispatch) => {
        const response = axios.get('https://api.themoviedb.org/3/movie/upcoming?page=1&language=en-US&api_key=aba59941e2c758715d351fcccc18d98e')
            .then(response => {
                console.log(response.data.results.length);
                // dispatch(sendDemo(response.data.results))
                _.map(response.data.results, movie => {
                    const response = axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=aba59941e2c758715d351fcccc18d98e&language=en-US&append_to_response=videos,release_dates,casts,reviews`)
                        .then(response => {
                            // console.log(response.data.backdrop_path);
                            // console.log(response.data.original_language);
                            // console.log(response.data.title);
                            console.log(response.data.genres[0].name)
                            // console.log(response.data.overview);
                            // console.log(response.data.poster_path);
                            // console.log(new Date(response.data.release_date));
                            // console.log(response.data.runtime);
                            // console.log(response.data.status);
                            // console.log(response.data.tagline);
                            // console.log(response.data.vote_average);
                            // console.log(response.data.videos.results[0].key);
                            // console.log(response.data.casts.cast.slice(0, 6));
                            // console.log(response.data.casts.crew.slice(0, 6));
                            // console.log(response.data.reviews.results);


                            // console.log(response.data.release_date);
                            // console.log(new Date(response.data.release_date))
                            // var date = moment
                            // var time = moment.utc("09:25", "HH:mm");
                            // console.log(time.hour())


                            const response1 = axios.post(`http://localhost:3001/dummyData`, {
                                'tmdbid': movie.id,
                                'title': response.data.title,
                                'backdrop_path': response.data.backdrop_path,
                                'original_language': response.data.original_language,
                                'overview': response.data.overview,
                                'poster_path': response.data.poster_path,
                                'release_date': response.data.release_date,
                                'runtime': response.data.runtime,
                                'status': response.data.status,
                                'tagline': response.data.tagline,
                                'vote_average': response.data.vote_average,
                                'vote_count': 10,
                                'genre': response.data.genres[0].name,
                                'youtube_trailer': response.data.videos.results[0].key,
                                'cast': response.data.casts.cast.slice(0, 6),
                                'crew': response.data.casts.crew.slice(0, 6),
                                'rating': 'PG-13',
                                'reviews': []
                            }).then(response1 => {
                                console.log("done")
                            }).catch(error => {
                                console.log(error);
                            });


                        }).catch(error => {
                            console.log(error);
                        });
                })
            }).catch(error => {
                console.log(error);
            });
    }
}

function moviesInHomePageCarousel(response) {
    return {
        type: MOVIES_CAROUSEL_NOW,
        payload: response
    }
}

export function getMoviesInHomePageCarousel() {
    return (dispatch) => {
        const response = axios.get(`${ROOT_URL}/movies/getMoviesInHomePageCarousel`)
            .then(response => {
                console.log(response.data)
                dispatch(moviesInHomePageCarousel(response.data))
            }).catch(error => {
                console.log(error);
            });
    }
}

function movieOverview(response) {
    return {
        type: MOVIE_OVERVIEW,
        payload: response
    }
}


export function getMovieOverview(tmdbid) {
    console.log(tmdbid)
    return (dispatch) => {
        const response = axios.get(`${ROOT_URL}/movies/getMovieOverview?tmdbid=${tmdbid}`)
            .then(response => {
                console.log(response.data)
                dispatch(movieOverview(response.data))
            }).catch(error => {
                console.log(error);
            });
    }
}


export function saveReview(values, callback) {
    console.log(values)
    return (dispatch) => {
        const response = axios.post(`${ROOT_URL}/movies/saveReview`, values)
            .then(response => {
                console.log(response.data)
                callback();
                // dispatch(movieOverview(response.data))
            }).catch(error => {
                console.log(error);
            });
    }
}

function adminMovies(response) {
    return{
        type : ADMIN_MOVIES,
        payload : response,
    }
}

export function getSearchedMoviesAdmin(term) {

    return (dispatch) => {
        const response = axios.get(`${ROOT_URL}/admin/movieSearch?term=${term}`)
            .then(response => {
                console.log(response.data)
                dispatch(adminMovies(response.data))
            }).catch(error => {
                console.log(error);
            });
    }
}


export function getSearchedMoviesUser(term) {

    return (dispatch) => {
        const response = axios.get(`${ROOT_URL}/admin/movieSearch?term=${term}`)
            .then(response => {
                console.log(response.data)
                history.push('/search-movies')
                dispatch(adminMovies(response.data))
            }).catch(error => {
                console.log(error);
            });
    }
}


export function updateEditedMovieAdmin(values) {

    return (dispatch) => {
        const response = axios.post(`${ROOT_URL}/admin/saveMovie`, values)
            .then(response => {
                console.log(response.data)
                // dispatch(adminMovies(response.data))
            }).catch(error => {
                console.log(error);
            });
    }
}

