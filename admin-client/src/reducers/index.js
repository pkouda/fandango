import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import HomeReducer from './reducer_home';
import MovieOverviewReducer from './reducer_movie_overview';
import GenreSearchMovies from './reducer_genreSearchMovies';
import  MovieSearchPage from './reducer_movie_search_page'
import EditMovieHall from './reducer_getMovieHallListing'
import editMovieSaved from './reducer_editHallSave'
import moviesDropdown from './reducer_moviesnHalls';
import MoviesAdded from './reducer_addMovie';
import MoviesSearchListAdmin from './reducer_search_movies_admin';

import SearchUsersList from "./reducer_searchusers";
import purchaseHistory from "./reducer_purchases";
import addMoviesAdmin from "./reducer_adminadded"

import SavePayments from './reducer_savePayments'
import UserReducer from "./reducer_user";
import fetchUserReducer from "./reducer_fetchuser";
import userProfile from "./reducer_userprofile";


import bookingcancel from "./reducer_bookingHistory"
import cancelBookingConfirm from "./reducer_cancelbooking"
import {SIGN_OUT} from "../actions/satishActions";

const appReducer = combineReducers({
    user: UserReducer,
    getUser: fetchUserReducer,
    userProfile: userProfile,
    home: HomeReducer,
    movieOverview: MovieOverviewReducer,
    moviesSearchPagePK:MovieSearchPage,
    moviesDropdown:moviesDropdown,
    addMovies:MoviesAdded,
    editMoviehall:EditMovieHall,
    editMovieSaved:editMovieSaved,
    moviesSearchList : MoviesSearchListAdmin,
    searchUsers: SearchUsersList,
    purchases: purchaseHistory,
    savePayments:SavePayments,
    addMoviesAdmin:addMoviesAdmin,
    genreSearchMovies: GenreSearchMovies,
    bookingcancel:bookingcancel,
    cancelBookingConfirm:cancelBookingConfirm,
    form : formReducer

});

const rootReducer = (state, action) => {
    if (action.type === SIGN_OUT) {
        console.log(action)
        state = undefined;
        console.log(state);
    }
    return appReducer(state, action)
}

export default rootReducer;

