import React, {Component} from 'react';
import MovieHallMegaDropDownHeader from './movieHallSignIn/movieHallMegaDropDown';
import EditMovieHallBody from './editMovieHallListing/editMovieHallListing';
import {connect} from "react-redux";
import {getMoviesInSearchPage, GetMoviesHallListing, addMovie} from "../actions/pranithActions";


class EditMovieHallListing extends Component {
    componentWillMount() {
        var idgrp = (this.props.location.pathname).split('/');
        var id = idgrp[2];
        //var projName = idgrp[3];
        var idg = {
            id: id
        };
        if (id != null) {
            console.log(id);
            console.log("calling movie hall editing");

            this.props.GetMoviesHallListing(idg);
        }

    }


    render() {
        console.log(this.props.editmovies);
        if (this.props.editmovies.movies.code != 400 && this.props.editmovies.movies.moviemap != null) {
            console.log(this.props.editmovies);
            return (
                <div>
                    <MovieHallMegaDropDownHeader/>
                    <EditMovieHallBody history={this.props.history} location={this.props.location}/>
                </div>
            )
        }
        else {
            return (
                <div>
                    <div>
                        <MovieHallMegaDropDownHeader/>
                        Fetching Movie to Edit
                    </div>
                </div>


            )
        }
    }

}

function mapStateToProps(state) {
    return {
        movietime: state.moviesSearchPagePK,
        moviesDropdown: state.moviesDropdown,
        addMovies: state.addMovies,
        editmovies: state.editMoviehall
    }
}

export default connect(mapStateToProps, {getMoviesInSearchPage, GetMoviesHallListing, addMovie})(EditMovieHallListing);
