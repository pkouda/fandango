import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './userProfile.css';

class Footer extends Component {

    constructor(props) {
        super(props);

    }


    render(){
        return(

            <div className="footer-nav">
                <div className="row footer-elements">
                    <div className="large-3 medium-3 small-6 columns">
                        <h3 className="footer-nav-header">Experience + Explore</h3>
                        <ul className="footer-nav-list">
                            <li><a className="light" href="#">Movies In
                                Theaters</a></li>
                            <li><a className="light" href="#">Movie
                                Actors and Actresses</a></li>
                            <li><a className="light" href="#">Mobile</a></li>
                            <li><a className="light" href="#">New DVD
                                Releases</a></li>
                            <li><a className="light" href="#">Special Offers</a>
                            </li>
                            <li><a className="light" href="#">Gift Cards</a>
                            </li>
                        </ul>
                    </div>
                    <div className="large-3 medium-3 small-6 columns">
                        <h3 className="footer-nav-header">Features + Guides</h3>
                        <ul className="footer-nav-list">

                            <li><a className="light" href="#">Indie Movie Guide</a>
                            </li>

                            <li><a className="light" href="#">Summer Movie Guide</a>
                            </li>

                            <li><a className="light" href="#">Family Guide</a></li>

                            <li><a className="light" href="#">Movie News</a></li>

                        </ul>
                    </div>
                    <div className="large-3 medium-3 small-6 columns">
                        <h3 className="footer-nav-header">Videos</h3>
                        <ul className="footer-nav-list">

                            <li><a className="light" href="#">Movie Trailers</a>
                            </li>

                            <li><a className="light" href="#">Weekend
                                Ticket</a></li>

                            <li><a className="light"
                                   href="#">Frontrunners</a></li>

                            <li><a className="light" href="#">Mom's
                                Movie Minute</a></li>

                        </ul>
                    </div>
                    <div className="large-3 medium-3 small-6 columns">
                        <h3 className="footer-nav-header">Photos</h3>
                        <ul className="footer-nav-list">

                            <li><a className="light"
                                   href="#">Red Carpet
                                Premieres</a></li>

                            <li><a className="light"
                                   href="#">April
                                Celebrity Birthdays</a></li>

                            <li><a className="light"
                                   href="#">Award Shows
                                Red Carpets</a></li>

                        </ul>
                    </div>
                </div>
            </div>
        )
    }








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


export default Footer;
