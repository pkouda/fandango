import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchUser} from "../../actions/satishActions";
import MovieHallMegaDropDownHeader from '../movieHallSignIn/movieHallMegaDropDown';

class MovieHallAdminHome extends Component {


    componentDidMount() {
        this.props.fetchUser()
    }

    render() {


        console.log(this.props.user)

        if (this.props.user.isLoggingIn === true) {
            return (
                <div></div>
            )
        }

        if (this.props.user.isLoggedIn == false) {
            this.props.history.push('/movieHallSignin')
        }


        return (
            <div>

                <MovieHallMegaDropDownHeader/>

                <div className='fandango-container background-white p-3'>
                    <div>
                        <div className='col-md-5'>
                            <h3 className='font-condensed-bold'>FIRST NAME : {this.props.user.user.firstname}</h3>
                            <h3 className='font-condensed-bold mt-2'>EMAIL : {this.props.user.user.email}</h3>
                        </div>
                    </div>
                </div>

                {/*<img src="http://localhost:3000/home_dog.jpg" className="width-100"/>*/}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {user: state.getUser}
}

export default connect(mapStateToProps, {fetchUser})(MovieHallAdminHome);
