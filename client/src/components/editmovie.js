import React, {Component} from 'react';
import EditMovieBody from './editMovieHall/editMovieHall';
import {connect} from "react-redux";
import MovieHallMegaDropDownHeader from './movieHallSignIn/movieHallMegaDropDown';



class EditMovieHall extends Component {

    render() {
        return (
            <div>
                <MovieHallMegaDropDownHeader/>
                <EditMovieBody history={this.props.history}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {home: state.home}
}

export default connect(null, null)(EditMovieHall);
