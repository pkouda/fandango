import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {onComponentDidMount} from 'react-redux-lifecycle';
import {connect} from "react-redux";
import {fetchUser} from "../actions/satishActions";

class PrivateRouteMovieHall extends Component {


    componentDidMount() {
        console.log("here")
        this.props.fetchUser()
    }

    render() {

        console.log(this.props.component)
        console.log(this.props.computedMatch.params.tmdbid)

        console.log("user email", this.props.user)

        const Here = this.props.component;

        if (this.props.user.isLoggingIn) {
            return (
                <div>

                </div>
            )
        }

        return (


            <Route render={props => (
                    this.props.user.isLoggedIn && this.props.user.user.accountType === "MoviehallAdmin" ?
                    <Here tmdbid={this.props.computedMatch.params.tmdbid} {...this.props} {...props}
                          user={this.props.user}/> :
                    <Redirect to={{pathname: '/moviehallSignin', props: props, state: {from: props.location}}}/>
            )}/>


        )
    }
}


function mapStateToProps(state) {
    return ({user: state.getUser})
}

export default connect(mapStateToProps, {fetchUser})(PrivateRouteMovieHall)