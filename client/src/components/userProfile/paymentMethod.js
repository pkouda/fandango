import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Field, reduxForm} from 'redux-form';
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

class PaymentMethod extends Component {

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


    /* Passing Values from form-3: Payment Infomation  */
    onSubmit_payment(values) {
        console.log(values);
        this.props.savePaymentMethod(values)

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

        return (


            <div className='row'>


                <div id='profile_block' className="medium-9 columns">

                    {/*Add Payment*/}
                    <div className='collapse-element'><Collapsible className="panel accordion-head well"
                                                                   trigger="PAYMENT METHOD">


                        <div className="panel-group">


                            <div className="panel accordion-body " id="payment-info-form">
                                <div className="row">
                                    <div className="large-12 columns">
                                        <div className="credit-card-logos">
                                            <span className="visa"></span>
                                            <span className="amex"></span>
                                            <span className="mastercard"></span>
                                            <span className="discover"></span>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit(this.onSubmit_payment.bind(this))}
                                          className="payment-form">
                                        {/*<span><p>Enter your. </p></span>*/}
                                        <div className='row'>
                                            <div className="col-md-12">

                                                <label>Card Number</label>
                                                <Field name="cardnumber"
                                                       className="form-control form-control-lg password-form-oldpassword"
                                                       id="CardNumberBox"
                                                       type='password'
                                                       component={this.renderField}
                                                />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className="col-md-12 date-box">

                                                <label>Expiration Data</label>
                                                <div className='row'>
                                                    <Field name="month"
                                                           className="payment-form-month columns"
                                                           id="NewMonthBox"
                                                           component={this.renderSelect}
                                                    >
                                                        <option defaultValue="">Month</option>
                                                        <option value="1">January</option>
                                                        <option value="2">February</option>
                                                        <option value="3">March</option>
                                                        <option value="4">April</option>
                                                        <option value="5">May</option>
                                                        <option value="6">June</option>
                                                        <option value="7">July</option>
                                                        <option value="8">August</option>
                                                        <option value="9">September</option>
                                                        <option value="10">October</option>
                                                        <option value="11">November</option>
                                                        <option value="12">December</option>
                                                    </Field>


                                                    <Field name="year"
                                                           className="payment-form-year ml-2 columns"
                                                           id="YearBox"
                                                           component={this.renderSelect}>
                                                        <option value="">Year</option>
                                                        <option value="2018">2018</option>
                                                        <option value="2019">2019</option>
                                                        <option value="2020">2020</option>
                                                        <option value="2021">2021</option>
                                                        <option value="2022">2022</option>
                                                        <option value="2023">2023</option>
                                                        <option value="2024">2024</option>
                                                        <option value="2025">2025</option>
                                                        <option value="2026">2026</option>
                                                        <option value="2027">2027</option>
                                                        <option value="2028">2028</option>
                                                    </Field>


                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className="medium-6 columns">
                                                <label className="" htmlFor="">Billing ZIP code</label>
                                                {/*<div className="special-note">This name will appear publicly when you rate and*/}
                                                {/*review movies.*/}
                                                {/*</div>*/}
                                                <Field name="zipcode"
                                                       className="form-control form-control-lg update-form-zipcode"
                                                       id="ZipCodeBox"
                                                       type='text'
                                                       component={this.renderField}
                                                />
                                            </div>
                                            <div className="medium-6 columns right-40">
                                                <button id="save-payment" className="btn save-button">Save</button>
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

    //names are associated to fields in the redux form names
    if (values.cardnumber){
        if(values.cardnumber.length>16) {
            errors.newpassword = "Credit card should be 16 numbers";

         }
        return errors;
    }
}

export default reduxForm({
    validate,
    form: 'paymentform'
})(
    connect(null, {savePaymentMethod})(PaymentMethod)
);