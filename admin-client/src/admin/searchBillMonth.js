import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from "react-redux";

import ReactStars from 'react-stars';
import _ from 'lodash';
import moment from "moment/moment";
// import {getMovieOverview} from "../../../actions/vishalActions";

import * as API from '../api/API';
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import momentLocaliser from 'react-widgets-moment';


import 'react-widgets/dist/css/react-widgets.css';

momentLocaliser(moment)


const renderDateTimePicker = ({input: {onChange, value}, meta, showTime}) =>
    <div className="form-group font-family-roboto form-group-custom">
        <DateTimePicker
            onChange={onChange}
            format="DD MMM YYYY"
            time={showTime}
            value={!value ? null : new Date(value)}
        />
        <div className="error-message">
            {meta.touched ? meta.error : ''}
        </div>
    </div>


class SearchBillMonth extends Component {



    componentWillMount() {
        API.fetchUser()
            .then((res) => {
                console.log(res);

                if (!res.user) {
                    this.props.history.push('/login')
                }


            });
    }



    renderList() {
        return (_.map(this.state.bills, bill => {
            return (
                <div key={bill.transactionid} className="max-width-70 admin-bill-list p-1 m-1 background-white">
                    <div className='row admin-movie-list-edit'>
                        <div className='col-md-1'>
                            <img
                                src={`http://image.tmdb.org/t/p/w200${bill.image}`}
                                className="width-100"
                            />
                        </div>

                        <div className='col-md-4'>
                            <span className='font-weight-700'>Display Name :</span> {bill.displayname}<br/>
                            <span className='font-weight-700'>Email : </span>{bill.email}
                        </div>

                        <div className='col-md-5'>
                            <p className="font-size-18 font-condensed-bold">{bill.moviename}</p>
                            <span
                                className="font-family-roboto text-justify font-italic font-size-14">{bill.moviehall}</span>
                            <br/>
                            {/*<span>{moment(bill.date).format('DD MMM YYYY')}</span>*/}
                            {/*<span>{bill.date}</span>*/}
                            <span>{moment(bill.date).utc().format('LL')}</span>
                        </div>

                        <div className='col-md-2'>
                            <span className='font-weight-700'>Screen :</span> {bill.screenno}<br/>
                            <span className='font-weight-700'>Tickets : </span> {bill.nooftickets}<br/>
                            <span className='font-weight-700'>Amount : </span> {bill.Amount}
                        </div>


                    </div>

                </div>
            )
        }))
    }


    renderError() {
        return (
            <div className='clear-left margin-left'>
                <h4 className='font-condensed-bold'>THERE ARE NO TRANSACTIONS FOR THIS MONTH</h4>
            </div>
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            bills: [],
        }

    }

    onSubmit(values) {

        console.log(values.release_date)
        console.log(new Date(values.release_date))

        console.log(moment(values.release_date).format("YYYY-MM HH:mm:ss"));


        API.getBillsMonth(moment(values.release_date).format("YYYY-MM"))
            .then((res) => {
                console.log(res.bills);
                this.setState({
                    bills: res.bills
                })
            });


    }

    // componentWillMount() {
    //     console.log("c")
    //     const {tmdbid} = this.props.match.params;
    //     console.log(tmdbid)
    //
    //     // this.props.getMovieOverview(tmdbid);
    //     API.getMovieOverview(tmdbid)
    //         .then((res) => {
    //             console.log(res);
    //             this.setState({
    //                 movie: res
    //             })
    //         });
    // }


    render() {

        // console.log(this.props.movie.movie)

        const {handleSubmit} = this.props;

        return (
            <div>
                {/*{this.state.movie.tmdbid ? <MovieEditAdminBody movie={this.state.movie} history = {this.props.history}/> : ''}*/}


                <br/>
                <h3 className='style-date'>Search Bill by Month</h3>
                <p className='font-family-roboto'>Select any date to get details of that particular Month</p>
                <br/>
                <div className='max-width-30  style-date'>

                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                        <Field
                            label="Release Date"
                            name="release_date"
                            showTime={false}
                            component={renderDateTimePicker}
                        />


                        <button className="btn"
                                type="submit">GO
                        </button>

                    </form>
                </div>


                <div className='clear-left'>
                    {this.state.bills ? this.state.bills.length > 0 ? this.renderList() : '' : ''}
                </div>

                {this.state.bills ? '' : this.renderError()}


            </div>
        )
    }
}

function validate(values) {

    const errors = {};

    if (!values.title) {
        errors.title = "Title can't be empty";
    }

    if (!values.original_language) {
        errors.original_language = "Language can't be empty";
    }

    if (!values.overview) {
        errors.overview = "Overview can't be empty";
    }

    if (!values.release_date) {
        errors.release_date = "Release Date can't be empty";
    }

    if (!values.status) {
        errors.status = "Status can't be empty";
    }

    if (!values.runtime) {
        errors.runtime = "Runtime can't be empty";
    }
    if (!values.tagline) {
        errors.tagline = "Tagline can't be empty";
    }

    if (!values.youtube_trailer) {
        errors.youtube_trailer = "Youtube Trailer can't be empty";
    }
    if (!values.rating) {
        errors.rating = "Rating can't be empty";
    }

    if (!values.genre) {
        errors.genre = "Genre can't be empty";
    }


    return errors;
}




export default reduxForm({
    validate,
    form: 'billEditMovies'
})(
    connect(null)(SearchBillMonth)
);
