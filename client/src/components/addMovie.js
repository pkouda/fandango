import React, {Component} from 'react';
import AddMovieTopSection from './addMovie/addMovieBody';
import {connect} from "react-redux";
import MovieHallMegaDropDownHeader from './movieHallSignIn/movieHallMegaDropDown';

class AddMovie extends Component {

    render() {
        return (
            <div>
                <MovieHallMegaDropDownHeader/>
                <AddMovieTopSection history={this.props.history}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {home: state.home}
}

export default connect(null, null)(AddMovie);
