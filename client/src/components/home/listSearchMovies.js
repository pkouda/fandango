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

class ListSearchMovies extends Component {

    constructor(props) {
        super(props);
    }

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
                    {!this.props.moviesSearchList.movies.length > 0 ?
                        <h2 className='container font-condensed-bold'>PLEASE ENTER A MOVIE NAME TO SEARCH</h2> : ''}
                    <br/>
                    <div className='background-fandango-checkout'>
                        <div className='float-left'>
                            <h2 className='font-condensed-bold m-auto p-2 font-color-white'>MOVIES({this.props.moviesSearchList.movies.length})
                            </h2>
                        </div>

                        <button className='align-right btn mt-2 mr-2'
                                onClick={() => this.props.history.push('/filter-movies')}>
                            FILTER BY GENRE
                        </button>
                    </div>
                    {this.props.moviesSearchList.movies.length > 0 ? this.renderList(this.props.moviesSearchList.movies) : ''}

                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        moviesSearchList: state.moviesSearchList
    }
}

export default connect(mapStateToProps, {searchGenre})(ListSearchMovies);
