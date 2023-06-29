import React, {Component} from 'react';
import ReactStars from 'react-stars';
import _ from 'lodash';
import moment from "moment/moment";

class MoviesSearchList extends Component {

    renderList() {
        return (_.map(this.props.movies, movie => {
            console.log("vishal")
            return (
                <div key={movie.title} className="max-width-70 movie-search-list p-1 m-1 background-white">
                    <div className='row admin-movie-list-edit'>
                        <div className='col-md-2'>
                            <img
                                src={`http://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                className="width-100"
                            />
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
                            <button className="btn btn-primary"
                                    onClick={() => this.props.history.push(`/admin-movie-edit/${movie.tmdbid}`)}>
                                Edit
                            </button>
                        </div>

                    </div>

                </div>
            )
        }))
    }

    render() {

        console.log(this.props.movies);

        return (
            <div>
                {this.renderList()}
            </div>
        )
    }
}


export default MoviesSearchList;
