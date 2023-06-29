import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import './userProfile.css';
import BrandBar from '../home/brandBar';
import MegaDropDownHeader from '../home/megaDropDownHeader';
import FandangoVIPHeader from './fandangoVIPHeader'
import {
    changePassword,
    changeEmail,
    changeBasicInfo,
    getUserDetails,
    savePaymentMethod,
    changeImage
} from "../../actions/satishActions";

import Image from './image';
import BasicInfo from './basicInfo';
import ChangeEmail from './changeEmail';
import ChangePassword from './changePassword';
import PaymentMethod from './paymentMethod';

class UserProfile extends Component {
    componentWMount(){
        if(this.props.user.isLoggedIn==true)
        {
            console.log("User Email............",this.props.user.user.email);
            var values={username:this.props.user.user.email, status:"open", pagename:"Movietime"};

            const request =axios.post('http://localhost:3001/movietheatres/usertrack',values)
                .then(response => {
                    console.log("sucessss",response.data)
                }).catch(error => {
                    console.log("usertracking error",error);
                });

        }
    }

    constructor(props) {
        super(props);
        this.onSubmit_change_image = this.onSubmit_change_image.bind(this)
    }

    componentDidMount() {
        this.props.getUserDetails();
    }

    /* Passing Values from form-0: Change Image  */
    onSubmit_change_image(values) {
        this.props.changeImage(values)
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

    render() {
        console.log("Inside Signup");
        console.log("props", this.props.userProfile);
        const {handleSubmit, load, pristine, reset, submitting} = this.props;

        if (this.props.user.user) {
            if (!this.props.user.user.email) {
                console.log(this.props)
                return (<div></div>)
            }
        }

        return (
            <div>
                <BrandBar/>
                <MegaDropDownHeader/>
                <FandangoVIPHeader name='account'/>
                {/*Profile Component - Dropdown*/}
                <div className='row'>
                    <div id='profile_block' className="columns">
                        {this.props.userProfile.user.email ? <Image location={this.props.location} image={this.props.userProfile.user.image}/> : ''}
                        {this.props.userProfile.user.email ? < BasicInfo user={this.props.userProfile.user}/> : ''}
                        {this.props.userProfile.user.email ? <ChangeEmail user={this.props.userProfile.user}/> : ''}
                        {this.props.userProfile.user.email ? <ChangePassword user={this.props.userProfile.user}/> : ''}
                        {this.props.userProfile.user.email ? <PaymentMethod user={this.props.userProfile.user}/> : ''}

                    </div>
                </div>
                {/*/!*Footer*!/*/}
                {/*<Footer/>*/}
                {/*/!*Utility Footer*!/*/}
                {/*<UtilityFooter/>*/}
            </div>
        )
    }


}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({
            changeEmail, changePassword, changeBasicInfo,
            savePaymentMethod, changeImage,
            getUserDetails
        }, dispatch)
    }
}

function mapStateToProps(state) {
    return ({user: state.user,
        userProfile: state.userProfile})
}

export default reduxForm({
    // validate,
    form: 'userForms'
})(connect(mapStateToProps, mapDispatchToProps)(UserProfile));
