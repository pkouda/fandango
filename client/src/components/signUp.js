/* Done by Rishith*/
import React, {Component} from 'react';
import {doSignUp} from '../actions/rishithActions';
import {Route, withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Field, reduxForm } from 'redux-form'
import './Signin/signup.css';
import logo from './Signin/fandango-logo.svg';
import offer from './Signin/offers.png'
import {fetchUser} from "../actions/satishActions";


class SignUp extends Component {
    componentWillMount(){
        //    this.props.fetchUser();
    }
    /* Passing Values into action */
    onSubmit(values){
        console.log(values);
        this.props.doSignUp(values)
    }

    /* Form Validations and Error Messages */

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

    /* Render using Redux-Form */
    render(){
        var logStat= this.props.user.isLoggedIn;
        var checkedin = this.props.user.isCheckedIn;
        console.log("Inside Signup");
        const { handleSubmit, load, pristine, reset, submitting } = this.props;
        return(
            <div>
                <div>
                    <header id="registration-header" className="registration-header" role="banner">
                        <nav role="navigation" className="nav-bar">
                            <div className="row">
                                <div className="large-11 large-centered columns">
                                    <ul className="inline-items">
                                        <li className="site-logo">
                                            <a className="fandango-logo" href="http://www.fandango.com/">
                                                <img
                                                    src={logo}
                                                    alt="Fandango Logo" className="brand-img"/>
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="registration-mode right">


                                        <span>Already have a Fandango VIP Account?</span> &nbsp;<Link
                                        to="/signin" className="cta">Sign
                                        In</Link>

                                    </div>
                                </div>
                            </div>
                        </nav>
                    </header>
                    <div className="page registration">
                        <div className='row'>
                            <div className='double-type medium-10 medium-centered columns'>
                                <div className='panel-group row'>


                                    <div className="panel intercept-container  medium-6  columns">
                                        <div className="action-details small-12 columns">
                                            <div className="vip-perks vip-perks--authentication">
                                                <div className="perks__header">
                                                    Level up your movie life with Fandango VIP:
                                                </div>

                                                <div className="perks__list">
                                                    <div className="perk perk--vip-plus" id="my-fandango">
                                                        <div className="perk__header">
                                                            New! Earn Points, Get Movies
                                                        </div>

                                                    </div>
                                                    <div className="perk perk--rope" id="insider-perks">
                                                        <div className="perk__header">
                                                            Insider Perks
                                                        </div>

                                                    </div>
                                                    <div className="perk perk--popcorn" id="theater-rewards">
                                                        <div className="perk__header">
                                                            Partner Rewards
                                                        </div>

                                                    </div>
                                                    <div className="perk perk--ticket" id="worry-free-tickets">
                                                        <div className="perk__header">
                                                            Refunds &amp; Exchanges
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>

                                        </div>


                                        <div className="registration-promo-unit hide-for-small-only">
                                            <img
                                                src="//images.fandango.com/cms/assets/aced1350-33b7-11e8-8eca-fd26e4965c58--vip-registration-banner.png"
                                                alt="Introducing FandangoVIP+ -- Join now and get started."/>
                                        </div>

                                    </div>

                                    <div className='panel sign-up-form medium-6 columns'>
                                        <div className='sub-panel'><
                                            form className="registration-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>  {/*Handle Submit missing*/}
                                            <p className="join-header">JOIN FANDANGO<span
                                                className="page-header-emphasis">VIP</span>

                                                <span className="registration-caption hide-for-small-only text-danger">{this.props.error}</span>




                                            </p>
                                            <div className='form-group'>

                                                {/* First Name */}
                                                <label>First Name</label>
                                                <Field name="firstname"
                                                       className="form-control form-control-lg registration-form-firstname"
                                                       id="FirstNameBox"
                                                       type = 'text'
                                                       component={this.renderField}
                                                />

                                                {/* Email - ID */}
                                                <label>Email-ID</label>
                                                <Field name="email"
                                                       className="form-control form-control-lg registration-form-email"
                                                       id="EmailAddressBox"
                                                       type = 'text'
                                                       component={this.renderField}
                                                />

                                                {/* Password */}
                                                <label>Password</label>
                                                <Field name="password"
                                                       className="form-control form-control-lg registration-form-password"
                                                       id="PasswordBox"
                                                       type = 'password'
                                                       component={this.renderField}
                                                />
                                                <small className="password-instruction">Use 8 or more characters
                                                    with a letter and a number or symbol. No more than 3 of the same
                                                    character in a row.
                                                </small>
                                                {/* Confirm Password */}
                                                <Field name="confirm_password"
                                                       className="form-control form-control-lg registration-form-confirm-password"
                                                       id="ConfirmPasswordBox"
                                                       type = 'password'
                                                       component={this.renderField}
                                                />
                                                <div className="form-group">
                                                    <button id="registration-form-submit" className="btn-cta full-width vip-join-now" >
                                                        <span className="post-project-btn-font">JOIN NOW FOR FREE</span>
                                                    </button>
                                                </div>
                                                <small>
                                                    By creating an account, you agree to the <a
                                                    className="footer_links_bottom" rel="nofollow"
                                                    href="http://www.fandango.com/PrivacyPolicy"
                                                    name="&amp;lid=Footer&amp;lpos=Footer">Privacy Policy</a> and
                                                    the <a className="footer_links_bottom" rel="nofollow"
                                                           href="http://www.fandango.com/terms-and-policies"
                                                           name="&amp;lid=Footer&amp;lpos=Footer">Terms and
                                                    Policies</a>, and to receive email from Fandango.
                                                </small>
                                                <div className="divider">
                                                    <hr/>
                                                </div>
                                                <div
                                                    className=" medium-12 columns social-signin large-centered">
                                                    <div id="googlePlusSignIn"
                                                         className="social-login-button social-login-gplus"
                                                         data-gapiattached="true"><Link to = '#'>Join with Google+</Link>
                                                    </div>
                                                    <div id="facebookSignIn"
                                                         className="social-login-button social-login-facebook"><Link to='#'>Join
                                                        with Facebook</Link>
                                                    </div>
                                                    <small className="secondary-cta">We respect your privacy and
                                                        will never<br/> post without your permission.</small>
                                                </div>

                                            </div>
                                        </form></div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </div>

        );

    };
}

// function mapStateToProps(store) {
//     return ({});
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         ...bindActionCreators({}, dispatch)
//     }
// }


// export default connect(mapStateToProps, mapDispatchToProps)(signUp)
function validate(values) {
    const errors = {};

    let regEx_email = "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i";
    //validate input from values


    if (!values.firstname) {
        errors.firstname = "Please enter username of min 5 characters\n ";
    }


    if (!values.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Please enter a valid Email-ID\n ";
    }

    if (!values.password){
        errors.password = "Please enter a valid password\n";
    }

    if (!values.confirm_password) {
        errors.confirm_password = 'Confirm Password is empty\n';
    }
    if (values.password !==values.confirm_password){
        errors.confirm_password = 'Passwords doesn\'t match\n';
    }

    //if errors is empty , the form is fine to submit
    //if errors has *any* properties, redux form assumes that form is invalid
    return errors;
}

function mapStateToProps(state){
    return ({
        user: state.getUser,
        error:state.user.message
    })
}


function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators({
            doSignUp, fetchUser
        },dispatch)
    }
}

export default reduxForm({
    validate,
    form: 'SignUpForm'
}) (connect(mapStateToProps,mapDispatchToProps)(SignUp));
