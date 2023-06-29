import React, {Component} from 'react';
import {Field, reduxForm, initialize} from 'redux-form';
import {connect} from "react-redux";
// import {FileUpload} from 'redux-file-upload';
// import {profileCheck, uploadImage, profileSave} from "../actions";
// import FormData from 'form-data';
// import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Multiselect from 'react-widgets/lib/Multiselect';
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import moment from 'moment'
import momentLocaliser from 'react-widgets-moment'

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


class MovieBillAttributes extends Component {

    componentWillMount() {
        console.log("yes");
        // this.insertValues();
    }

    onButtonClick() {
        this.props.profileCheck();
    }

    onSubmit(values) {
        console.log(values)
        console.log(values.release_date)

    }

    render() {

        const {handleSubmit} = this.props;

        return (
            <div>
                <div className="container text-uppercase">

                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                        <div className="row">

                            <div className='col-md-3'>


                                <Field
                                    label="Release Date"
                                    name="release_date"
                                    showTime={false}
                                    component={renderDateTimePicker}
                                />

                            </div>


                            <button className="btn"
                                    type="submit">Save
                            </button>
                        </div>

                    </form>

                </div>


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
    form: 'billEdit'
})(
    connect(null)(MovieBillAttributes)
);

