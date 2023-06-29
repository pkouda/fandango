import React, {Component} from 'react';
import {connect} from "react-redux";
import ReactStars from 'react-stars';
import _ from 'lodash';
import moment from "moment/moment";
// import {getMovieOverview} from "../../../actions/vishalActions";
import MovieEditAdminBody from './movieEditBody';
import * as API from '../../api/API';


class MoviesEdit extends Component {


    constructor(props){
        super(props);
        this.state = {
            movie : {},
        }

    }

    componentWillMount() {
        console.log("c")
        const {tmdbid} = this.props.match.params;
        console.log(tmdbid)

        // this.props.getMovieOverview(tmdbid);
        API.getMovieOverview(tmdbid)
            .then((res)=>{
                console.log(res);
                this.setState({
                    movie : res
                })
            });
    }


    render() {

        // console.log(this.props.movie.movie)

        return (
            <div className='max-width-70'>
                {this.state.movie.tmdbid ? <MovieEditAdminBody movie={this.state.movie} history = {this.props.history}/> : ''}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {movie: state.movieOverview}
}

export default MoviesEdit;
