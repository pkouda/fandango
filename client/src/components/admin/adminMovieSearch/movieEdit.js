import React, {Component} from 'react';
import {connect} from "react-redux";
import ReactStars from 'react-stars';
import _ from 'lodash';
import moment from "moment/moment";
import {getMovieOverview} from "../../../actions/vishalActions";
import MovieEditAdminBody from './movieEditBody';

class MoviesEdit extends Component {

    componentWillMount() {
        const {tmdbid} = this.props.match.params;
        console.log(tmdbid)
        this.props.getMovieOverview(tmdbid);
    }


    render() {

        console.log(this.props.movie.movie)

        return (
            <div className='container'>
                {this.props.movie.movie.tmdbid ? <MovieEditAdminBody movie={this.props.movie.movie}/> : ''}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {movie: state.movieOverview}
}

export default connect(mapStateToProps, {getMovieOverview})(MoviesEdit);
