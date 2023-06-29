import React, {Component} from 'react';
import {connect} from 'react-redux';
import Slider from "react-slick";
import _ from 'lodash';
import moment from 'moment';
import {Link} from 'react-router-dom';

class Carousel extends Component {


    renderMovies() {
        if (this.props.home.movies.length > 0) {
            return (_.map(this.props.home.movies, movie => {
                return (
                    <div key={movie.title}>
                        <Link to={`/movie-overview/${movie.tmdbid}`}>
                        <div className="carousel-movie-image">
                            <img
                                src={`http://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                className="image-carousel image"/>
                        </div>
                        <div className="carousel-movie-name px-2 pt-1">
                            <h5 className="font-size-18 font-condensed-bold py-2">{movie.title}</h5>
                            <span className="font-timesNewRoman-gray">{moment(movie.release_date).format('MMM DD, YYYY')}</span>
                        </div>
                        </Link>
                    </div>
                )
            }))
        }
    }


    render() {
        var settings = {
            slidesToShow: 6,
            slidesToScroll: 3,
            infinite: true,
        };

        return (
            <div className="carousel">
                <Slider {...settings}>
                    {this.renderMovies()}
                </Slider>

            </div>
        )
    }
}


export default connect(null, null)(Carousel);


