import React, {Component} from 'react';
import {connect} from "react-redux";
import swal from 'sweetalert'
import moment from 'moment';
import {Link} from 'react-router-dom';
import "./movieTime.css"
import {Field, reduxForm, initialize} from "redux-form";
import {getMoviesInSearchPage, GetMoviesnHalls, addMovie,editMovieSearch} from "../../actions/pranithActions";
import _ from 'lodash';
import DropdownList from 'react-widgets/lib/DropdownList'
import Slider from "react-slick";
import Multiselect from 'react-widgets/lib/Multiselect'
import 'react-widgets/dist/css/react-widgets.css';
import { formValueSelector } from 'redux-form';

//const selector = formValueSelector('EditMovie');

class EditMovieBody extends Component {
    state = {
        movieSearch: "",
        moviesSelected:"",
        email:this.props.user.user.email,
        dateSelected: moment(new Date()).format()
        // values: selector('theatre')
    }


    componentWillMount() {
        this.setState({email:this.props.user.user.email});
        console.log(this.state);
        console.log("calling movie halls");
        this.props.GetMoviesnHalls({email:this.props.user.user.email});
        this.props.editMovieSearch(this.state);

    }







    renderDropdown = ({input, data, valueField, textField, meta, placeholder}) => {

        const className = `${meta.touched && meta.error ? 'border-red' : ''}`
        return (
            <div>
                <DropdownList {...input}
                              className={className}
                              onBlur={() => input.onBlur()}
                    //value={input.value || []} // requires value to be an array
                              data={data}
                              valueField={valueField}
                              textField={textField}
                              placeholder={placeholder}


                />
                <div className="error-message">
                    {meta.touched ? meta.error : ''}
                </div>
            </div>
        )
    }





    setDate(values) {
        //console.log(values);
        this.setState({dateSelected: values})
        console.log("i consoled this", this.state);
      this.props.editMovieSearch(this.state);

    }

    onSubmit(values) {
        {
            // d.setDate(d.getDate() + 1);
            //values.Date=i;
            console.log(values);

          //  this.props.addMovie(values);
        }


    };
    renderDates() {

        var arrayDates = [];

        for (var i = 0; i < 15; i++) {
            let newDate = new Date();
            newDate.setDate(newDate.getDate() + i);
            arrayDates.push(newDate);
            // console.log(newDate);
        }

        //  console.log(arrayDates)


        return (_.map(arrayDates, Date => {
            return (
                <div key={Date} onClick={() => {
                    this.setDate(moment(Date).format())
                }}>

                    <div className="background-white text-center carousel-date">

                        <span className="font-timesNewRoman font-size-15">{moment(Date).format('ddd')}</span>
                        <br/>
                        <h3 className="color-darkgray mt-2 font-condensed-bold">{moment(Date).format('MMM')}</h3>
                        <h2 className="color-darkgray pb-2 font-condensed-bold">{moment(Date).format('DD')}</h2>
                    </div>
                </div>
            )
        }))

    }


    renderText(field) {

        const className = `form-control ${field.meta.touched && field.meta.error ? 'border-red' : ''}`
        return (
            <div className="form-group form-group-custom">
                <textarea
                    className={className}
                    {...field.input}
                    placeholder={field.label}
                    type={field.type}
                />
                <div className="error-message">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        )
    }

    render() {

        console.log(this.props);
        console.log(this.props.editMoviehall);


        var settings = {
            slidesToShow: 7,
            slidesToScroll: 3,
            infinite: false,
        };
        console.log(this.state);

        // console.log(this.props);
        //console.log(this.props.movietime.moviesTheatres.moviemap);
        //  console.log(this.props.movietime.moviesTheatres.moviemap[0].type);
        const {handleSubmit, load, pristine, reset, submitting} = this.props;
        var divStyle = {
            //backgroundImage: 'url(http://image.tmdb.org/t/p/original/nIrDm42dy5PaXtUAzUfPmxM4mQm.jpg)',
            backgroundColor: "white"
        };
        //console.log(this.props.moviesDropdown.movies.moviemap);

        if (this.props.editMoviehall.movies.code != 400) {
            return (
                <div className="background-movie-top" style={divStyle}>
                    <div className="fandango-container">
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <div>
                                <div className="card profile-body-left">
                                    <div className="row inside">


                                        <div className="col-md-11 col-11">
                                            <div className="mt-4 ml-0 pl-0">
                                                <div className="form-group form-group-custom">
                                                    <Field
                                                        name="theatre"
                                                        component={this.renderDropdown}
                                                        data={this.props.moviesDropdown.movies.movietheatre}
                                                        valueField="type"
                                                        type="DropdownList"
                                                        textField="type"
                                                        placeholder="Select a Movie Hall "
                                                        onChange={event => {
                                                            this.setState({"moviesSelected": event.type,"dateSelected": new Date()})
                                                            console.log(this.state);

                                                            //console.log("This is the new value of field myField: " , event);
                                                            //props.input.onChange(event); // <-- Propagate the event
                                                        }}

                                                    />
                                                </div>
                                                <br/>
                                                <div>
                                                    {


                                                        this.props.editMoviehall.movies.movietheatre.map((item) => {
                                                            if (this.state.moviesSelected != "" && item.type == this.state.moviesSelected) {
                                                                return (
                                                                    <div className="moviesTheatres col-12"
                                                                         id="moviesTheatres">
                                                                        <div>


                                                                            <div className="carousel-dates">
                                                                                <Slider {...settings}>
                                                                                    {this.renderDates()}
                                                                                </Slider>

                                                                            </div>
                                                                            <br/>

                                                                        </div>
                                                                        <ul>
                                                                            <div className="fd-theater__header">
                                                                                <h4 className="font-condensed-bold-white">
                                                                                    <a className="light">{item.type} Cinemas</a>
                                                                                </h4>


                                                                                <p className="color-ccc font-family-roboto">
                                                                                    {item.data[0].theatreCity}, {item.data[0].theatreState}, {item.data[0].theatreZip}
                                                                                    <a className="ml-3"
                                                                                       href="">MAP</a> |
                                                                                    <a href=""> AMENITIES</a>
                                                                                </p>
                                                                            </div>


                                                                            {item.data.map((movie) => {
                                                                                return (

                                                                                    <div className="fd-movie">
                                                                                        <div
                                                                                            className="fd-movie__poster">
                                                                                            <Link
                                                                                                to={`/movie-overview/${movie.movie.movieId}`}>
                                                                                                <img
                                                                                                    src={`http://image.tmdb.org/t/p/w200${movie.movie.poster_path}`}
                                                                                                    className="image-theatres image"/>
                                                                                            </Link>


                                                                                        </div>
                                                                                        <div
                                                                                            className="fd-movie__details">
                                                                                            <h3 className="fd-movie__title font-sans-serif font-lg font-300 p-2 uppercase">
                                                                                                <Link
                                                                                                    className="dark font-condensed-bold"
                                                                                                    to={`/movie-overview/${movie.movie.movieId}`}>{movie.movie.MovieName}</Link>
                                                                                            </h3>
                                                                                        </div>
                                                                                        <div
                                                                                            className="fd-movie__details">
                                                                                            <h3 className="fd-movie__title font-sans-serif font-lg font-300 p-2 uppercase">
                                                                                                <Link
                                                                                                    className="dark font-condensed-bold"
                                                                                                    to={`/movie-overview/${movie.movie.movieId}`}>Date
                                                                                                    : {moment(movie.Date).format("YYYY-MM-DD")}</Link>
                                                                                            </h3>
                                                                                        </div>
                                                                                        <ul className="fd-movie__showtimes">


                                                                                            <li className="fd-movie__showtimes-variant">

                                                                                                <ol className="fd-movie__btn-list">

                                                                                                    <li className="fd-movie__btn-list-item">


                                                                                                        <Link
                                                                                                            className="btn showtime-btn"
                                                                                                            to={"/editmoviehalllisting/" + movie.ID}>Edit </Link>
                                                                                                        <br/>


                                                                                                    </li>


                                                                                                </ol>
                                                                                            </li>


                                                                                        </ul>

                                                                                    </div>

                                                                                )
                                                                            })}
                                                                        </ul>
                                                                        <br/>
                                                                    </div>
                                                                )
                                                            }

                                                        })}
                                                </div>
                                                {/*
                                            <div className="form-group form-group-custom">
                                                <Field
                                                    name="movie"
                                                    component={this.renderDropdown}
                                                    data={this.props.moviesDropdown.movies.moviemap}
                                                    valueField="movie"
                                                    type="DropdownList"
                                                    textField="movie"
                                                    placeholder="Select a Movie name"/>
                                            </div>

                                            <br/>

                                            <Field
                                                name="showTimes"
                                                component={this.renderMultiselect}
                                                data={["9:30a", "12:30p", "3:30p", "9:30p"]}
                                                placeholder="Select Show time"
                                            />
                                            <br/>
                                            <Field
                                                label="Please enter number of seats "
                                                name="noOfSeats"
                                                component={this.renderField}
                                                type="text"
                                            />
                                            <br/>*/}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card profile-body-right">
                                    <div className="card-header">

                                        <br/>
                                        <br/>
                                        <hr/>

                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            )
        }

        else {
            return (
                <div>
                    Fetching Movies
                </div>
            )
        }
    }


}

function validate(values) {

    //object that returns errors, if errors is empty the form will be submitted, else it wont be submitted
    //if errors has any properties, redux from assumes that form is invalid
    const errors = {};

    //names are associated to fields in the redux form names
    if (!values.noOfSeats) {
        errors.username = "No of Seats can't be empty";
    }

    return errors;
}

function mapStateToProps(state) {
    return {
        movietime: state.moviesSearchPagePK,
        moviesDropdown: state.moviesDropdown,
        addMovies: state.addMovies,
        editMoviehall:state.editMoviehall,
        user:state.getUser
    }
}


export default reduxForm({
    validate,
    form: 'EditMovie'
})(connect(mapStateToProps, {getMoviesInSearchPage, GetMoviesnHalls, addMovie,editMovieSearch})(EditMovieBody));
