import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {signout} from "../../actions/satishActions";
import {fetchUser} from "../../actions/satishActions";
var axios = require('axios');


class BrandBar extends Component {
    
   /* componentWillMount(){
        console.log("hello",   this.props.user);
         
         if(this.props.user.isLoggedIn==true)
         {
            console.log("Usertracking............");
            var values={username:this.props.user.user.email, status:"open", pagename:"Movietime"};

            const request =axios.post('http://localhost:3001/movietheatres/usertrack',values)
            .then(response => {
                console.log("sucessss",response.data)
            }).catch(error => {
                console.log("usertracking error",error);
            });

            console.log("after ttasildjfksdfh")
         }
     }*/
  


    componentDidMount() {
        this.props.fetchUser();
    }

    handleSignout() {
        this.props.signout(null);

        /*const request =axios.post('http://localhost:3001/movietheatres/usertrackclose',{"username":this.props.user.user.email})
            .then(response => {
                console.log("sucessss");
            }).catch(error => {
                console.log("usertracking error");
            });*/

        var values = {username: this.props.user.user.email, status: "open", pagename: "Log Out", time:0}

        const request =axios.post('http://localhost:3001/movietheatres/usertrack',values)
            .then(response => {
                console.log("sucessss",response.data)
            }).catch(error => {
                console.log("usertracking error",error);
            });
    }

    render() {
        var isLoggedIn = window.localStorage.getItem('isLoggedIn');
        // var isLoggedIn = this.props.user.isLoggedIn;
        console.log('isloggeIn', isLoggedIn);
        console.log("user", this.props.user);

        if(this.props.user.isLoggingIn){
            return(
                <div>
                    Loading
                </div>
            )
        }

        return (
            <div>

                <div id="brand-bar">
                    <div className="fandango-container">
                        <nav className="text-right">
                            <a href="/fandango-gift-cards">Gift Cards</a> |
                            <a href="/freemovietickets"> Offers</a> |
                            {this.props.user.isLoggedIn ? (
                                <button className="show-logged-in" onClick={this.handleSignout.bind(this)}>
                                    Sign Out </button>
                            ) : (
                                <Link to="/signin" className="hide-logged-in"> Sign In</Link>
                            )}
                            {/* |<a href="/signout" className="show-logged-in"> Sign Out</a>*/}
                        </nav>
                    </div>
                </div>
            </div>
        )


    }
}

function mapStateToProps(state) {
    return ({user: state.getUser})
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({
            signout, fetchUser
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandBar);
