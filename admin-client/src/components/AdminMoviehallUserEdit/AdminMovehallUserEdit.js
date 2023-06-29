import React, {Component} from 'react';
import {connect} from "react-redux";
import MoviehallUserInfo from "./MoviehallUserInfo"


class AdminMoviehallUserEdit extends Component {


    render() {
        console.log(this.props.user);
        return (
            <div>
                <MoviehallUserInfo user= {this.props.location.state.user} location={this.props.location}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {user: state.searchUsers}
}

export default connect(mapStateToProps,null)(AdminMoviehallUserEdit);
