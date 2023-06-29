import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import Seat from 'material-ui/svg-icons/notification/airline-seat-flat-angled';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AdminLoginForm from './adminLoginForm';

class AdminLogin extends Component {


    // componentDidMount(){
    //     this.props.getMoviesInHomePageCarousel()
    // }

    render() {
        return (
            <div className="admin-form">
                <div className="background-fandango-checkout">
                    <div className="container">

                        <Link to="/home">
                            <img className="megaDropDown-brand mt-1"
                                 src="https://images.fandango.com/mobile/web/img/assets/logo-fandango.svg"/>
                        </Link>
                        <br/>

                        <AdminLoginForm/>
                    </div>
                </div>

            </div>
        )
    }
}

// function mapStateToProps(state) {
//     return {home: state.home}
// }

export default connect(null, null)(AdminLogin);
