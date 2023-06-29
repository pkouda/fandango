import React, {Component} from 'react';
import {connect} from "react-redux";
import ReactStars from 'react-stars';
import _ from 'lodash';
import moment from "moment/moment";
import BrandBar from '../home/brandBar'
import MegaDropDownHeader from '../home/megaDropDownHeader';
import UnderBrand from '../home/underBrand';
import {Link} from 'react-router-dom';
import {searchGenre} from "../../actions/rishithActions";
import swal from 'sweetalert'

class ListFilterMovies extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            current: '',
        }

    }

    onSubmit(value) {

        this.props.searchGenre(value);
    }

    state = {
        action: 'Action',
        adventure: 'Adventure',
        animation: 'Animation',
        comedy: 'Comedy'
    };


    renderList(movies) {
        console.log("her", movies.length)
        return (_.map(movies, movie => {
            return (
                <div key={movie.title} className="movie-search-list p-1 m-1 background-white">
                    <div className='row admin-movie-list-edit'>

                        <div className='col-md-2'>
                            <Link to={`/movie-overview/${movie.tmdbid}`}>
                                <img
                                    src={`http://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    className="width-100"
                                />
                            </Link>
                        </div>


                        <div className='col-md-8'>
                            <h3 className="font-condensed-bold">{movie.title}</h3>
                            <br/>
                            <p className="font-family-roboto text-justify font-italic font-size-14">{movie.overview}</p>
                        </div>

                        <div className='col-md-2'>
                            <ReactStars
                                edit={false}
                                count={5}
                                size={24}
                                half={false}
                                value={movie.reviews ? _.sumBy(movie.reviews, 'stars') / movie.reviews.length : 0}
                                color2={'#FFA358'}/>

                            <span
                                className="font-size-13 font-timesNewRoman">{movie.status}</span>
                            <h5 className="font-condensed-bold">{moment(movie.release_date).format('MMM DD, YYYY')}</h5>
                            <small
                                className="font-size-13 font-timesNewRoman">{movie.rating} {movie.runtime} minutes
                            </small>
                            <br/>
                            <small
                                className="font-size-13 font-timesNewRoman">{movie.genre}
                            </small>
                            <br/>
                            <br/>

                        </div>

                    </div>

                </div>
            )
        }))
    }


    render() {

        return (
            <div>
                <BrandBar/>
                <MegaDropDownHeader/>
                <UnderBrand/>

                <div className='container'>
                    <br/>
                    <h2 className='container font-condensed-bold'>FILTER MOVIES BY</h2>
                    <br/>

                    <div className='m-auto'>
                        <button onClick={() => (this.onSubmit('Action'))}> Action</button>
                        <button onClick={() => (this.onSubmit('Animation'))}> Animation</button>
                        <button onClick={() => (this.onSubmit('Comedy'))}> Comedy</button>
                        <button onClick={() => (this.onSubmit('Adventure'))}> Adventure</button>
                    </div>

                    <div className='background-fandango-checkout'>
                        <div className='float-left'>
                            <h2 className='font-condensed-bold m-auto p-2 font-color-white'>MOVIES({this.props.movieGenreData.length}){this.state.genre}
                            </h2>
                        </div>
                    </div>

                    <div>
                        {this.props.movieGenreData.length > 0 ?
                            this.renderList(this.props.movieGenreData) : ""}
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        movieGenreData: state.genreSearchMovies.movieGenreData,
    }
}

export default connect(mapStateToProps, {searchGenre})(ListFilterMovies);
