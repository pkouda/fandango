import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Field, reduxForm, initialize} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {DropDownMenu} from 'material-ui'
import UnderBrand from '../home/underBrand';
import Collapsible from 'react-collapsible';
import './userProfile.css';
import Footer from './footer'
import UtilityFooter from './utilityFooter';
import BrandBar from '../home/brandBar';
import MegaDropDownHeader from '../home/megaDropDownHeader';
import FandangoVIPHeader from './fandangoVIPHeader'
import {
    changePassword,
    changeEmail,
    changeBasicInfo,
    getUserDetails,
    savePaymentMethod,
    changeImage,
    uploadImage
} from "../../actions/satishActions";

// export const email = this.props.user.email;

class ChangeEmail extends Component {

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

    componentWillMount() {
        console.log("yes")
        this.insertValues();
        console.log(this.props.user)
    }

    insertValues() {

        console.log(this.props.user)
        const data = {
            "oldemail": this.props.user.email
        }

        this.props.initialize(data);
    }


    /* Passing Values from form-2: Email Change  */
    onSubmit_email(values) {
        console.log(values);
        this.props.changeEmail(values)

    }


    render() {

        const {handleSubmit, load, pristine, reset, submitting} = this.props;

        return (


            <div className='row'>


                <div id='profile_block' className="medium-9 columns">

                    {/*E-Mail Change*/}
                    <div className='collapse-element'><Collapsible className="panel accordion-head well"
                                                                   trigger="CHANGE EMAIL">


                        <div className="panel-group">


                            <div className="panel accordion-body " id="email-info-form">
                                <div className="row">
                                    <form onSubmit={handleSubmit(this.onSubmit_email.bind(this))}
                                          className="email-form">
                                        <div className='row'>
                                            <div className="medium-12 columns">

                                                <label className='font-condensed-bold'>Current Email</label>
                                                {/*<div className='email-form-oldemail'><p>{this.props.user.email}</p>*/}

                                                <Field name="oldemail"
                                                       className="form-control form-control-lg update-form-newemail"
                                                       id="OldEmailBox"
                                                       type='email'
                                                       component={this.renderField}
                                                       disabled
                                                />

                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className="medium-12 columns">

                                                <label className='font-condensed-bold'>New Email</label>
                                                <Field name="newemail"
                                                       className="form-control form-control-lg update-form-newemail"
                                                       id="NewEmailBox"
                                                       type='email'
                                                       component={this.renderField}
                                                />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className="medium-12 columns">
                                                <label className='font-condensed-bold' htmlFor="">Confirm Email</label>
                                                {/*<div className="special-note">This name will appear publicly when you rate and*/}
                                                {/*review movies.*/}
                                                {/*</div>*/}
                                                <Field name="confirmemail"
                                                       className="form-control form-control-lg update-form-confirmemail"
                                                       id="ConfirmEmailBox"
                                                       type='email'
                                                       component={this.renderField}
                                                />
                                            </div>


                                            <div className="medium-7 columns right-40">
                                                <button id="save-email" className="btn save-button">Save</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Collapsible></div>

                </div>

            </div>

        )
    }


}


function validate(values) {

    //object that returns errors, if errors is empty the form will be submitted, else it wont be submitted
    //if errors has any properties, redux from assumes that form is invalid
    const errors = {};

    console.log(values)
    //names are associated to fields in the redux form names
    if (!values.newemail) {
        errors.newemail = "Field Can't be Empty";
    }

    if (!values.confirmemail) {
        errors.confirmemail = "Field Can't be Empty"
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.newemail)) {
        errors.newemail = "Please enter a valid email address";
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.confirmemail)) {
        errors.confirmemail = "Please enter a valid email address";
    }

    console.log(values.oldemail)
    if (values.newemail == values.oldemail) {
        errors.newemail = "Email cannot be same as old"
    }

    if (values.newemail != values.confirmemail) {
        errors.confirmemail = "Both the email should be equal";
    }

    return errors;
}


export default reduxForm({
    validate,
    form: 'changeEmail'
})(
    connect(null, {changeEmail})(ChangeEmail)
);