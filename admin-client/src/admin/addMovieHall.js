import React, { Component } from 'react';
import {connect} from "react-redux";
import {addMovieHallAdmin} from  '../actions/pranithActions';
import {Field, reduxForm, initialize} from 'redux-form';
import {bindActionCreators} from 'redux';
import '../assets/css/userProfile.css'
import * as API from "../api/API";



class AddMovieHallAdmin extends Component {

    constructor(props){
        super(props)
    }

    componentWillMount() {
        API.fetchUser()
            .then((res) => {
                console.log(res);

                if (!res.user) {
                    this.props.history.push('/login')
                }


            });
    }

    onSubmit(values){
        console.log(values);
        this.props.addMovieHallAdmin(values);
    }


    renderField(field){
        const { meta:{touched,error}} = field;
        const cname = `form-bar ${touched && error? 'has-danger' : ''} `;

        return(
            <div className= {cname}>
                {/*<label>{field.label}</label>*/}
                <input {...field.input} {...field}
                />
                <div className="text-help">
                    {touched ? error: ''}
                </div>
            </div>
        )

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
    renderSelect(field){
        return(
            <div>
                <select {...field.input} {...field}/>
                {field.touched && field.error && <div className="error">{field.error}</div>}
            </div>
        );
    }

    render() {
        const {handleSubmit, load, pristine, reset, submitting} = this.props;
        //var msg = this.props.isMovieAdded?"Successful":"Failed";,
        console.log("Movie Status: ", this.props.movieStatus);
        return (
            <div>

                <div className='row'><div id ='addMovieHalls' className='medium-8 columns col-md-offset-1'>
                    <form className="registration-form" onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                        <p className="join-header">JOIN FANDANGO<span
                            className="page-header-emphasis">VIP</span>
                            {/*<span className="registration-caption hide-for-small-only text-danger"> {this.props.movieStatus}</span>*/}
                        </p>

                        <div className='form-group'>

                            {/* Movie Theater Name */}
                            <label>Movie Theater Name</label>
                            <Field name="movietheatername"
                                   className="form-control form-control-lg registration-form-movietheatername"
                                   id="MovieTheaterName"
                                   type = 'text'
                                   component={this.renderField}
                            />

                            {/* City */}
                            <label>City</label>
                            <Field name="city"
                                   className="form-control form-control-lg registration-form-city"
                                   id="EmailAddressBox"
                                   type = 'text'
                                   component={this.renderField}
                            />

                            {/* State - Dropdown */}
                            <label>State</label>
                            <Field name="state"
                                   className="payment-form-year ml-2 columns"
                                   id="YearBox"
                                   component={this.renderSelect}>
                                <option defaultValue="">State</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District Of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </Field>

                            {/* ZIPCODE */}
                            <label>ZIPCODE</label>
                            <Field name="zipcode"
                                   className="form-control form-control-lg registration-form-zipcode"
                                   id="ZipcodeBox"
                                   type = 'text'
                                   component={this.renderField}
                            />

                            {/* Hall Owner - firstname */}
                            <label>First Name</label>
                            <Field name="owner_firstname"
                                   className="form-control form-control-lg registration-form-firstname"
                                   id="FirstNameBox"
                                   type = 'text'
                                   component={this.renderField}
                            />
                            {/* Hall Owner -lastname */}
                            <label>Last Name</label>
                            <Field name="owner_lastname"
                                   className="form-control form-control-lg registration-form-lastname"
                                   id="LastNameBox"
                                   type = 'text'
                                   component={this.renderField}
                            />
                            {/* Hall Owner -emailID */}
                            <label>Email-ID</label>
                            <Field name="owner_email"
                                   className="form-control form-control-lg registration-form-email"
                                   id="EMailBox"
                                   type = 'text'
                                   component={this.renderField}
                            />
                            <div className="form-group">
                                <button id="registration-form-submit" className="btn-cta full-width vip-join-now" >
                                    <span className="post-project-btn-font">ADD MOVIE HALL</span>
                                </button>
                            </div>




                        </div>


                    </form>



                </div></div>


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

    if (!values.city){
        errors.city = "Please enter a valid City Name\n";
    }

    if (!values.owner_firstname) {
        errors.owner_firstname = 'First Name is empty\n';
    }
    if (!values.owner_email) {
        errors.owner_email = 'EMail-ID is empty\n';
    }
    if (!values.owner_lastname){
        errors.owner_lastname = 'Last Name is empty\n';
    }
    if (!values.state){
        errors.state = 'Select a State\n';
    }


    //if errors is empty , the form is fine to submit
    //if errors has *any* properties, redux form assumes that form is invalid
    return errors;
}

function mapStateToProps(state) {
    return {

        movieStatus: state.addmoviehall.addMoviesAdmin

    }
}

function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators({

        },dispatch)
    }
}


export default reduxForm({
    validate,
    form: 'movieHall'
})
(connect(null,{addMovieHallAdmin})(AddMovieHallAdmin));