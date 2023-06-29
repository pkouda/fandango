import React, {Component} from 'react';
import {Field, reduxForm, initialize} from 'redux-form';
// import {updateEditedMovieAdmin} from "../../../actions/vishalActions";
import {connect} from "react-redux";
// import {FileUpload} from 'redux-file-upload';
// import {profileCheck, uploadImage, profileSave} from "../actions";
// import FormData from 'form-data';
// import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Multiselect from 'react-widgets/lib/Multiselect';
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import moment from 'moment'
import momentLocaliser from 'react-widgets-moment'
import * as API from '../../api/API';

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


// const renderMultiselect = ({input, data, valueField, textField, meta}) => {
//
//     const className = `${meta.touched && meta.error ? 'border-red' : ''}`
//     return (
//         <div>
//             <Multiselect {...input}
//                          className={className}
//                          onBlur={() => input.onBlur()}
//                          value={input.value || []} // requires value to be an array
//                          data={data}
//                          valueField={valueField}
//                          textField={textField}
//             />
//             <div className="error-message">
//                 {meta.touched ? meta.error : ''}
//             </div>
//         </div>
//     )
// }

class MovieEditAdminBody extends Component {

    renderField(field) {
        const className = `form-control input-login ${field.meta.touched && field.meta.error ? 'border-red' : ''}`
        return (
            <div className="form-group font-family-roboto form-group-custom">
                <small className='font-weight-700'>{field.label}</small>
                <input
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

    renderText(field) {
        const className = `form-control ${field.meta.touched && field.meta.error ? 'border-red' : ''}`
        return (
            <div className="form-group font-family-roboto form-group-custom">
                <small className='font-weight-700'>{field.label}</small>
                <textarea
                    className={className}
                    {...field.input}
                    placeholder={field.label}
                    type={field.type}
                    rows={7}
                />
                <div className="error-message">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        )
    }

    insertValues() {

        console.log(this.props.profile)
        const data = {
            "title": this.props.movie.title,
            "original_language": this.props.movie.original_language,
            "overview": this.props.movie.overview,
            "release_date": this.props.movie.release_date,
            "status": this.props.movie.status,
            "runtime": this.props.movie.runtime,
            "tagline": this.props.movie.tagline,
            "youtube_trailer": this.props.movie.youtube_trailer,
            "rating": this.props.movie.rating,
            "genre": this.props.movie.genre

        }

        this.props.initialize(data);
    }

    componentWillMount() {
        console.log("yes");
        this.insertValues();
    }

    onButtonClick() {
        this.props.profileCheck();
    }

    onSubmit(values) {
        console.log(values)
        console.log(values.release_date)
        console.log(new Date(values.release_date))
        values.tmdbid = this.props.movie.tmdbid;
        // this.props.updateEditedMovieAdmin(values);
        API.updateEditedMovieAdmin(values)
            .then((res) => {
                console.log("admin sifnin----->" + JSON.stringify(res));
                this.props.history.push('/searchmovie')
            });
    }

    handleFileUpload = (event) => {

        const payload = new FormData();

        console.log(payload)
        payload.append('mypic', event.target.files[0]);
        console.log(event.target.files)
        console.log(event.target.files[0])
        console.log(payload.get('mypic'))

        this.props.uploadImage(payload);

    };


    render() {
        console.log(this.props.movie)
        const {handleSubmit} = this.props;

        return (
            <div>
                <div className="width-100 margin-left text-uppercase">

                    <h2 className='font-condensed-bold'>EDIT MOVIE {this.props.movie.title}</h2>

                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                        <div className="row">
                            <div className="col-md-4">


                                <Field
                                    label="Title"
                                    name="title"
                                    component={this.renderField}
                                    type="text"
                                />

                                {/*<Field*/}
                                {/*label="Release Date"*/}
                                {/*name="release_date"*/}
                                {/*component={this.renderField}*/}
                                {/*type="text"*/}
                                {/*/>*/}

                                <small className="font-weight-700 font-family-roboto">Release Date</small>
                                <Field
                                    label="Release Date"
                                    name="release_date"
                                    showTime={false}
                                    component={renderDateTimePicker}
                                />

                                <Field
                                    label="RunTime"
                                    name="runtime"
                                    component={this.renderField}
                                    type="text"
                                />

                                <Field
                                    label="Rating"
                                    name="rating"
                                    component={this.renderField}
                                    type="text"
                                />


                            </div>

                            <div className="col-md-4">

                                <Field
                                    label="Overview"
                                    name="overview"
                                    component={this.renderText}/>


                                <Field
                                    label="Tagline"
                                    name="tagline"
                                    component={this.renderField}
                                    type="text"
                                />

                            </div>

                            <div className="col-md-4">

                                <Field
                                    label="Status"
                                    name="status"
                                    component={this.renderField}
                                    type="text"
                                />

                                <Field
                                    label="YouTube Trailer"
                                    name="youtube_trailer"
                                    component={this.renderField}
                                    type="text"
                                />

                                <Field
                                    label="Genre"
                                    name="genre"
                                    component={this.renderField}
                                    type="text"
                                />

                                <Field
                                    label="Language"
                                    name="original_language"
                                    component={this.renderField}
                                    type="text"
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
    form: 'movieEditing'
})(
    connect(null)(MovieEditAdminBody)
);

