import React, {Component} from 'react';
import DropdownList from 'react-widgets/lib/DropdownList'
import {addMovieHallAdmin, getAllMovieHalls,saveMovieHallEdits} from '../actions/pranithActions'
import {Field, reduxForm, initialize} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as API from "../api/API";

class EditMovieHallAdmin extends Component {

    constructor(props) {
        super(props)
    }


    componentWillMount() {
        API.fetchUser()
            .then((res) => {
                console.log(res);

                if (!res.user) {
                    this.props.history.push('/login')
                }

                // if(res.message){
                //     this.setState({
                //         message : res.message,
                //     })
                // }
                // else{
                //     this.props.history.push('/dashboard');
                // }


            });
    }


    componentDidMount() {
        this.props.getAllMovieHalls()
    }

    onSubmit(values) {
        console.log(values);
        this.props.saveMovieHallEdits(values);
        // this.props.addMovieHallAdmin(values);
    }

    renderDropdown = ({input, data, valueField, textField, meta, placeholder, label}) => {

        const className = `${meta.touched && meta.error ? 'border-red' : ''}`
        return (
            <div>
                <small className='font-weight-700 font-size-14'>{label}</small>
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


    renderField(field) {
        const {meta: {touched, error}} = field;
        const cname = `form-bar ${touched && error ? 'has-danger' : ''} `;

        return (
            <div className={cname}>
                {/*<label>{field.label}</label>*/}
                <input {...field.input} {...field}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        )

    }

    selectValues = (values) => {
        console.log("in selected values")

        console.log(values);
        console.log(values.data[0]);


        const data = {
            "theatername": values.type,
            "city": values.data[0].theatreCity,
            "state": values.data[0].theatreState,
            "zipcode": values.data[0].theatreZip,
            "owner_email": values.data[0].user,
        };
        console.log(data);

        this.props.initialize(data);

    }

    renderDescr(field) {
        const {meta: {touched, error}} = field;
        const cname = `form-bar ${touched && error ? 'has-danger' : ''} `;

        return (
            <div className={cname}>
                {/*<label>{field.label}</label>*/}
                <textarea {...field.input} {...field}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    renderSelect(field) {
        return (
            <div>
                <select {...field.input} {...field}/>
                {field.touched && field.error && <div className="error">{field.error}</div>}
            </div>
        );
    }

    render() {
        console.log(this.props.movietime);
        console.log(this.props.moviesDropdown.movies.movietheatre);
        const {handleSubmit, load, pristine, reset, submitting} = this.props;
        return (
            <div className='max-width-70 margin-left'>

                <div className='row'>
                    <div className='medium-8 columns'>
                        <form className="registration-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <br/>


                            <div className='form-group'>

                                {/* Movie Theater Name */}

                                <Field name="movietheatername"

                                       onChange={(event) => {

                                           console.log(event);
                                           this.selectValues(event);
                                       }}
                                       component={this.renderDropdown}
                                       data={this.props.moviesDropdown.movies.movietheatre}
                                       valueField="type"
                                       type="DropdownList"
                                       textField="type"
                                       label="Movie Hall name"
                                       placeholder="Select a Movie Hall "
                                />

                                {/* City */}
                                <label>Theatre Name</label>
                                <Field name="theatername"
                                       className="form-control form-control-lg registration-form-city"
                                       id="EmailAddressBox"
                                       type='text'
                                       component={this.renderField}
                                />
                                <label>City</label>
                                <Field name="city"
                                       className="form-control form-control-lg registration-form-city"
                                       id="EmailAddressBox"
                                       type='text'
                                       component={this.renderField}
                                />

                                {/* State - Dropdown */}
                                <label>State</label>
                                <Field name="state"
                                       className="form-control form-control-lg registration-form-city"
                                       id="state"
                                       type='text'
                                       component={this.renderField}
                                />


                                {/* ZIPCODE */}
                                <label>ZIPCODE</label>
                                <Field name="zipcode"
                                       className="form-control form-control-lg registration-form-zipcode"
                                       id="ZipcodeBox"
                                       type='text'
                                       component={this.renderField}
                                />

                                {/* Hall Owner - firstname */}

                                {/* Hall Owner -emailID */}
                                <label>Email-ID</label>
                                <Field name="owner_email"
                                       className="form-control form-control-lg registration-form-email"
                                       id="EMailBox"
                                       type='text'
                                       component={this.renderField}
                                />
                                <div className="form-group">
                                    <br/>
                                    <button id="registration-form-submit"
                                            className="btn btn-primary full-width vip-join-now">
                                        <span className="post-project-btn-font">SAVE MOVIE HALL</span>
                                    </button>
                                </div>


                            </div>


                        </form>


                    </div>
                </div>


            </div>
        )
    }

}

function validate(values) {
    const errors = {};

    let regEx_zipcode = RegExp('^[0-9]{5}(?:-[0-9]{4})?$');
    //validate input from values


    if (!values.movietheatername) {
        errors.movietheatername = "Please enter Movie Theater Name\n ";
    }


    if (!values.zipcode || !regEx_zipcode.test(values.zipcode)) {
        errors.zipcode = "Please enter a valid ZIPCODE\n ";
    }

    if (!values.city) {
        errors.city = "Please enter a valid City Name\n";
    }

    if (!values.owner_firstname) {
        errors.owner_firstname = 'First Name is empty\n';
    }
    if (!values.owner_email) {
        errors.owner_email = 'EMail-ID is empty\n';
    }
    if (!values.owner_lastname) {
        errors.owner_lastname = 'Last Name is empty\n';
    }
    if (!values.state) {
        errors.state = 'Select a State\n';
    }


    //if errors is empty , the form is fine to submit
    //if errors has *any* properties, redux form assumes that form is invalid
    return errors;
}


function mapStateToProps(state) {
    return {
        movietime: state.moviesSearchPagePK,
        user: state.getUser,
        moviesDropdown: state.moviesDropdown,
        addMovies: state.addMovies,
    }
}


export default reduxForm({
    validate,
    form: 'EditmovieHall'
})
(connect(mapStateToProps, {addMovieHallAdmin, getAllMovieHalls,saveMovieHallEdits})(EditMovieHallAdmin));