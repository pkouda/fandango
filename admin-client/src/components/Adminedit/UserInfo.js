import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import {Field, reduxForm, initialize} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {editUserAccount} from "../../actions/satishActions";
import "./userProfile.css";


class UserInfo extends Component {

    renderField(field) {
        const {meta: {touched, error}} = field;
        const cname = `form-bar ${touched && error ? 'has-danger' : ''} `;

        return (
            <div className={cname}>
                {/*<label>{field.label}</label>*/}
                <input {...field.input} {...field}
                />
                <div className="error-message">
                    {touched ? error : ''}
                </div>
            </div>
        )

    }
    componentWillMount() {
        this.insertValues();
        console.log(this.props.location.state.user)
    }

    insertValues() {
        console.log(this.props.user)
        const data = {
            "firstname": this.props.location.state.user.firstname,
            "lastname": this.props.location.state.user.lastname,
            "displayname": this.props.location.state.user.displayname,
            "mobile": this.props.location.state.user.mobile,
            "address": this.props.location.state.user.address,
            "email": this.props.location.state.user.email,
             // "password": this.props.location.state.user.password,
        }

        this.props.initialize(data);
    }

    /* Passing Values from form-1: Basic Information  */
    onSubmit_basic_info(values) {
        values.oldemail = this.props.location.state.user.email;
        values.oldpassword=this.props.location.state.user.password;
        console.log(values);

        this.props.editUserAccount(values)
    }

    render() {
        const {handleSubmit, load, pristine, reset, submitting} = this.props;
        console.log(this.props)


        let src = 'https://images.fandango.com/r1.0.431/redesign/areas/profile/img/no-image-account-profile.png';
        if (this.props.image) {
            src = 'http://localhost:3001/images/' + this.props.profile.userDetails.image;
        }
        return (
            <div className='row max-width-70 margin-auto'>
                <div className="medium-9 columns">
                    {/*Basic Information*/}

                        <div className="panel-group">
                            <div className="panel accordion-body " id="basic-info-form">
                                <div className="row">
                                    <form onSubmit={handleSubmit(this.onSubmit_basic_info.bind(this))}
                                          className="update-form">
                                        <div className="medium-5 columns" id='basic-information'>

                                            <label className="font-condensed-bold">First Name</label>
                                            <Field name="firstname"
                                                   className="form-control form-control-lg update-form-firstname"
                                                   id="FirstNameBox"
                                                   type='text'
                                                   component={this.renderField}
                                            />
                                        </div>
                                        <div className="medium-5 columns">

                                            <label className='font-condensed-bold'>Last Name</label>
                                            <Field name="lastname"
                                                   className="form-control form-control-lg update-form-lastname"
                                                   id="LastNameBox"
                                                   type='text'
                                                   component={this.renderField}
                                            />
                                        </div>
                                        <div className="medium-5 columns">
                                            <label className="font-condensed-bold" htmlFor="">Display Name</label>
                                            <div className="special-note"><small>This name will appear publicly when you
                                                rate and
                                                review movies.</small>
                                            </div>
                                            <Field name="displayname"
                                                   className="form-control form-control-lg update-form-displayname"
                                                   id="DisplayName"
                                                   type='text'
                                                   component={this.renderField}
                                            />
                                        </div>
                                        <div className="medium-5 columns">

                                            <label className='font-condensed-bold'>Phone Number</label>

                                            <Field name="mobile"
                                                   className="form-control form-control-lg update-form-mobile"
                                                   id="MobileBox"
                                                   type='text'
                                                   component={this.renderField}
                                            />
                                        </div>

                                        <div className="medium-10 columns">
                                            <label className='font-condensed-bold'>Address</label>
                                            <Field name="address"
                                                   className="form-control form-control-lg update-form-address"
                                                   id="AddressBox"
                                                   type='textarea'
                                                   component={this.renderField}
                                            />
                                        </div>

                                        <div className="medium-6  columns">
                                                <label className='font-condensed-bold'>New Email</label>
                                                <Field name="email"
                                                       className="form-control form-control-lg update-form-newemail"
                                                       id="NewEmailBox"
                                                       type='email'
                                                       component={this.renderField}
                                                />
                                        </div>

                                        <div className="medium-6  columns">
                                            <label className='font-condensed-bold'>Change Password</label>
                                            <Field name="password"
                                                   className="form-control form-control-lg update-form-newemail"
                                                   id="NewEmailBox"
                                                   type='password'
                                                   component={this.renderField}
                                            />
                                        </div>

                                        <div className="medium-7 columns right-40">
                                            <button id="save-basic" className="btn save-button">Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}


function validate(values) {

    const errors = {};

    // console.log(values)

    if(!values.email){
        errors.email = 'Email Cant be empty'
    }


    if (values.mobile) {
        if (isNaN(values.mobile)) {
            errors.mobile = "Please Enter a valid phone number"
        }

        if (values.mobile.length !== 10) {
            errors.mobile = "Phone Number must be 10 digits"
        }
    }

    return errors;
}


export default reduxForm({
    validate,
    form: 'basicInfo'
})(
    connect(null,{editUserAccount})(UserInfo)
);