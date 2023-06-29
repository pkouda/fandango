import React, {Component} from 'react';
import {connect} from "react-redux";
import swal from 'sweetalert'
import moment from 'moment';
import {Link} from 'react-router-dom';
import "./movieTime.css"
import {Field, reduxForm, initialize} from "redux-form";
import {getMoviesInSearchPage, GetMoviesnHalls, addMovie,editMovieSearch,SQLbookingSearch,CancelBooking} from "../../actions/pranithActions";
import _ from 'lodash';
import DropdownList from 'react-widgets/lib/DropdownList'
import Slider from "react-slick";
import Multiselect from 'react-widgets/lib/Multiselect'
import 'react-widgets/dist/css/react-widgets.css';
import { formValueSelector } from 'redux-form';

//const selector = formValueSelector('EditMovie');

class CancelBookingBody extends Component {
    state = {

        email:this.props.user.user.email,
        dateSelected: moment(new Date()).format(),
        username:"",
        filteredTrans:this.props.bookingcancel.transactions
        // values: selector('theatre')
    }


    componentWillMount() {
        this.setState({email:this.props.user.user.email});
        console.log(this.state);
        console.log("calling movie halls");
        //  this.props.GetMoviesnHalls({email:this.props.user.user.email});
        this.props.editMovieSearch(this.state);
        this.props.SQLbookingSearch({email:this.props.user.user.email});
    }









    onSubmit(values) {
        {
            // d.setDate(d.getDate() + 1);
            //values.Date=i;
            console.log(values);

            //  this.props.addMovie(values);
        }


    };

    movieFilter = (filterPrice) => {
        console.log("filter email is : " + filterPrice);
        // this.setState({filterPrice: filterPrice});

        var movieFiltered = this.props.bookingcancel.transactions.filter(function (task) {
            // console.log(task.data[0].user);
            //console.log(this.state);

            return task.displayname == filterPrice;
        });
        return(movieFiltered);
    }







    render() {
        if(this.props.cancelBookingConfirm.bookingCancel === true)
        {
            swal("Transaction Cancelled");
        }
        else if(this.props.cancelBookingConfirm.bookingCancel === false)
        {
            swal("Transaction not cancelled");
        }

        console.log(this.props.cancelBookingConfirm.bookingCancel);
        console.log(this.props.bookingcancel);
        console.log(this.state);


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

        if (this.state.email != "" ) {
            return (
                <div className="background-movie-top" style={divStyle}>
                    <div className="fandango-container">
                        <div className="form-group form-group-custom">
                            <small className='font-weight-700 font-size-14'>Enter the Customer Name</small>
                            <br/>
                            <input
                                className="form-group form-group-custom"
                                placeholder="Enter the Customer Name"
                                type="text"
                                onChange={(event)=>{
                                    this.setState({username:event.target.value})
                                    var filteredTrans=this.movieFilter(event.target.value);
                                    this.setState({filteredTrans:filteredTrans})

                                }}                            />

                        </div>


                        {this.state.filteredTrans.map((item) => {
                            return (
                                <div>
                                    <div className='row'>
                                        <div className='medium-7 columns'><div className='Purchase-container card container'>
                                            <div id='purchase-card' className='row'>
                                                <div className='Purchase-item medium-10 columns'>
                                                    <div className='row'>
                                                        <div className='medium-3 columns'>
                                                            <img id = 'purchase-image' src={`http://image.tmdb.org/t/p/w200${item.image}`}>
                                                            </img>
                                                        </div>
                                                        <div className='Purchase-item medium-9 columns '>

                                                            <div className='row'>
                                                                <div id='card-heading' className='Purchase-movie-name'>{item.moviename}</div>

                                                            </div>
                                                            <div className='row'>
                                                                <div id='card-user' className='Purchase-user-name'>Name: {item.displayname}</div>
                                                            </div>
                                                            <div id = 'card-movie' className='Purchase-movie-time'>
                                                                <p id = 'timings' >Movie time: <div className='movie-time'>{item.movietime}</div></p>
                                                            </div>
                                                            <div className='Purchase-movie-theater'>
                                                                <p>Movie Theater:
                                                                    <div id='theater-name'>{item.moviehall} - Screen No: {item.screenno}
                                                                    </div>
                                                                </p>
                                                            </div>


                                                        </div>

                                                    </div>
                                                    <div>
                                                    </div>
                                                </div>

                                                <div className='Purchase-item medium-2 columns'>
                                                    <div id = 'transaction-div' className='row'>
                                                        <div>Transaction ID: <div id='transaction-id'>{item.transactionid}</div></div>
                                                    </div>

                                                    <div id='ticket-div'  className='row'>
                                                        <div>Amount: <div id='ticket-cost'  >${item.Amount}</div></div>
                                                    </div>

                                                    <div id = 'tax-div' className='row'>
                                                        <div>Tax: ${item.tax}</div>

                                                        <button
                                                            className="btn showtime-btn"
                                                            onClick={()=>{this.props.CancelBooking(item)}}>Cancel</button>
                                                        <br/>
                                                    </div>
                                                </div>
                                            </div>

                                        </div></div>
                                    </div>
                                </div>
                            )

                        })}

                    </div>
                </div>
            )
        }

        else {
            return (
                <div>
                    Fetching Transactions
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
        user:state.getUser,
        bookingcancel:state.bookingcancel,
        cancelBookingConfirm:state.cancelBookingConfirm
    }
}


export default reduxForm({
    validate,
    form: 'EditMovie'
})(connect(mapStateToProps, {getMoviesInSearchPage, GetMoviesnHalls, addMovie,editMovieSearch,SQLbookingSearch,CancelBooking})(CancelBookingBody));
