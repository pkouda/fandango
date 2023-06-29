
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Slider from "react-slick";
import _ from 'lodash';
import moment from 'moment';
import {Link} from 'react-router-dom';

class CastCrewCarousel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isFirstRender: true
        };
    }


    componentDidMount() {
        this.setState({isFirstRender: false});
    }


    renderMovies() {
        if (this.props.cast.length > 0) {
            return (_.map(this.props.cast, castMember => {
                // console.log(castMember)
                return (
                    <div key={castMember.name}>
                        {/*<Link to={`/castMember-overview/${castMember.tmdbid}`}>*/}
                        <div className="carousel-movie-image">
                            <img
                                src={castMember.profile_path != null ? `http://image.tmdb.org/t/p/w200${castMember.profile_path}` :
                                    '//images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/other/temp.jpg'
                                }
                                className="image-carousel image"/>
                        </div>
                        <div className="carousel-movie-name px-2 pt-1">
                            <span className="font-condensed-bold p-0">{castMember.name}</span>
                            <br/>
                            <span
                                className="font-timesNewRoman-gray">{castMember.character ? castMember.character : castMember.job}</span>
                        </div>
                        {/*</Link>*/}
                    </div>
                )
            }))
        }
    }


    render() {

        // console.log(this.state)

        var settings = {
            slidesToShow: 6,
            slidesToScroll: 3,
            infinite: true,
        };


        if (this.state.isFirstRender) {
            return (
                <div>

                </div>
            )
        }

        return (

            <div className="carousel">
                <Slider {...settings}>
                    {this.renderMovies()}
                </Slider>

            </div>
        )
    }
}


export default connect(null, null)(CastCrewCarousel);

