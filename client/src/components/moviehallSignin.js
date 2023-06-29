import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import MovieHallSigninForm from "./Signin/MoviehallSigninForm";
import {fetchUser} from "../actions/satishActions";

class MovieHallSignin extends Component {
    componentDidMount() {
        //  this.props.fetchUser();
    }

    render() {

        return (
            <div className="site-wrap signin vipsignin">

                <header id="registration-header" className="registration-header" role="banner">
                    <nav className="nav-bar">
                        <div className="large-11 large-centered columns">
                            <div className="nav-list">
                                <ul className="inline-items">
                                    <li className="site-logo">

                                        <Link to='/home'>
                                            <img
                                                src="https://images.fandango.com/r1.0.431/redesign/static/img/fandango-logo.svg"
                                                className="brand-img"/>
                                        </Link>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </nav>
                </header>


                <div className="page registration" role="main">
                    <div className="row">
                        <div
                            className="double-type large-8 medium-10 small-12 large-centered medium-centered small-centered columns">
                            <div className="panel-group row">
                                <MovieHallSigninForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return ({
        user: state.getUser
    })
}

export default connect(mapStateToProps, {fetchUser})(MovieHallSignin);