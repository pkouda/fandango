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

class Image extends Component {

    handleFileUpload = (event) => {

        const payload = new FormData();

        console.log(payload)
        payload.append('mypic', event.target.files[0]);
        console.log(event.target.files)
        console.log(event.target.files[0])
        console.log(payload.get('mypic'))

        this.props.uploadImage(payload)

    };


    render() {

        const {handleSubmit, load, pristine, reset, submitting} = this.props;
        console.log(this.props);

        let src = 'https://images.fandango.com/r1.0.431/redesign/areas/profile/img/no-image-account-profile.png';
        if (this.props.image) {
            src = 'http://localhost:3001/images/' + this.props.image;
        }

        return (


            <div className='row'>


                <div id='profile_block' className="medium-9 columns">

                    {/*Change Profile Image*/}
                    <div className='collapse-element'>
                        <Collapsible className="panel accordion-head well" trigger="CHANGE IMAGE">


                            <div className="panel-group">


                                <div className="panel accordion-body " id="change-image-form">
                                    <div className="row">
                                        <form className="image-form">

                                            <div className="profile-div-propic thumbnail">
                                                <img
                                                    // src="https://www.buira.org/assets/images/shared/default-profile.png"
                                                    alt="..." className="d-block profile-profilepic"
                                                    src={src}
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="file-upload" className="custom-file-upload">
                                                    <MuiThemeProvider>
                                                        <Edit className="icon-edit"/>
                                                    </MuiThemeProvider>
                                                    <span className="file-button">Edit Profile Picture</span>
                                                </label>
                                                <input
                                                    id="file-upload"
                                                    type="file"
                                                    name="mypic"
                                                    className="display-none"
                                                    onChange={this.handleFileUpload}
                                                    accept="image/x-png,image/gif,image/jpeg"
                                                />
                                            </div>


                                        </form>
                                    </div>
                                </div>
                            </div>
                        </Collapsible>
                    </div>
                </div>

            </div>

        )
    }


}


export default reduxForm({
    form: 'image'
})(
    connect(null, {uploadImage})(Image)
);