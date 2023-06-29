import React, {Component} from 'react';
// import {connect} from "react-redux";
import {Link} from 'react-router-dom';
// import Seat from 'material-ui/svg-icons/notification/airline-seat-flat-angled';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AdminLoginForm from './adminLoginForm';
import * as API from '../api/API';

class AdminLogin extends Component {


    componentWillMount(){
        API.fetchUser()
            .then((res) => {
                console.log(res);

                if(res.user){
                    this.props.history.push('/dashboard')
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

    render() {
        return (
            <div className="admin-form">
                <div className="background-fandango-checkout">
                    <div className="container">

                        <br/>


                        <div className='row'>
                            <img className="megaDropDownAdmin-brand mt-1"
                                 src="https://images.fandango.com/mobile/web/img/assets/logo-fandango.svg"/>
                            <span className='font-weight-700 admin-text font-size-30 col-md-4'>ADMIN</span>
                            <br/>
                        </div>
                        <br/>
                        <div className='row'>
                            <AdminLoginForm history={this.props.history}/>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

// function mapStateToProps(state) {
//     return {home: state.home}
// }

export default AdminLogin;
