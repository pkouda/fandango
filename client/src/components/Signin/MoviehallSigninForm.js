import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import SigninNavbar from './signinNavbar';
import {Field, reduxForm} from "redux-form";
import "./signin.css";
import {bindActionCreators} from "redux";
import {movieHallSignin} from "../../actions/satishActions";


class MoviehallSigninForm extends Component {
    renderField(field) {
        const {input, meta: {touched, error}} = field;
        const cname = `form-group ${touched && error ? 'has-danger' : ''} `;

        return (
            <div className={cname}>
                {/*<label>{field.label}</label>*/}
                <input className="form-control large-input"
                       {...input} {...field}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    renderError() {
        console.log("herekfghj",this.props.error)
        if (this.props.error) {
            return (
                <div className="error-msg">
                    {this.props.error}
                </div>
            );
        }
    }

    onSubmit(values) {
        console.log(values);
        this.props.movieHallSignin(values);
    }

    render() {

        console.log(this.props)

        const {handleSubmit, load, pristine, reset, submitting} = this.props;
        return (
            <div className="panel sign-up-form large-6 medium-6 small-12 columns">
                <div className="sub-panel">
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <p className="join-header">FANDANGO<span className="page-header-emphasis">MOVIEHALLADMIN</span>
                            <span className="registration-caption hide-for-small-only"></span>
                            <span className="registration-caption show-for-small-only"></span>
                        </p>
                        <div className="registration-promo-unit show-for-small-only">
                            <img
                                src="//images.fandango.com/cms/assets/aced1350-33b7-11e8-8eca-fd26e4965c58--vip-registration-banner.png"
                                alt=""/>
                        </div>
                        <div id="ErrorMessageWrapper">
                            <div id="signin-error">{this.renderError()}</div>
                        </div>
                        <label htmlFor="UsernameBox">Email Address</label>
                        <Field name="email" type="text" id="UsernameBox" component={this.renderField}/>
                        <label htmlFor="PasswordBox">Password</label>
                        <Field name="password" type="password" maxLength="40" id="PasswordBox"
                               component={this.renderField}/>

                        <input type="hidden" name="ctl00$GlobalBody$SignOnControl$CaptchEnabledField"
                               id="GlobalBody_SignOnControl_CaptchEnabledField"/>
                        <a id="ForgotPasswordLink" href="#" className="secondary-cta disabled">Forgot your
                            password?</a>
                        <button type="submit" disabled={pristine || submitting} className="btn-cta full-width"
                                alternatetext="Sign In">Sign In
                        </button>
                    </form>
                </div>
                <div className="divider">
                    <hr/>
                </div>
                <div className="large-8 medium-12 columns social-signin large-centered">
                    <div id="googlePlusSignIn" className="social-login-button social-login-gplus"
                         data-gapiattached="true">Sign in with Google+
                    </div>
                    <div id="facebookSignIn" className="social-login-button social-login-facebook">Sign in with
                        Facebook
                    </div>
                    <small className="secondary-cta">We respect your privacy and will never<br/> post without your
                        permission.
                    </small>
                </div>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};
    //validate input from values

    if (!values.email) {
        errors.email = 'Please enter Username or email address\n';
    }

    if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = "Please enter a valid email address";
    }

    if (!values.password) {
        errors.password = 'Please enter password';
    }

    //if errors is empty , the form is fine to submit
    //if errors has *any* properties, redux form assumes that form is invalid
    return errors;
}


function mapStateToProps(state) {
    return ({error: state.user.message})
}


function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({
            movieHallSignin
        }, dispatch)

    };
}

export default reduxForm({
    validate,
    form: 'MovieHallSigninForm'
})(connect(mapStateToProps, mapDispatchToProps)(MoviehallSigninForm));