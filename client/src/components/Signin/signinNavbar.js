import React,{Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class SigninNavbar extends Component{
    render(){
        return(
            <div>
                <header id="registration-header" className="registration-header" role="banner">
                    <nav className="nav-bar">
                        <div className="large-11 large-centered columns">
                            <div className="nav-list" >
                                <ul className="inline-items">
                                    <li className = "site-logo">
                                        <Link className="fandango-logo" to="/home">
                                            <img src="https://images.fandango.com/r1.0.431/redesign/static/img/fandango-logo.svg" className="brand-img"></img>
                                        </Link>
                                    </li>
                                </ul>
                                <div className="registration-mode right">
                                    <span>Don't have a Fandango VIP Account?</span> &nbsp;<Link to="/signup" className="cta">Join now for free</Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default SigninNavbar