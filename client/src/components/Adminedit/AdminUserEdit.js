import React, {Component} from 'react';
import BrandBar from '../home/brandBar'
import {connect} from "react-redux";
import {editUserAccount} from "../../actions/satishActions";
import UserInfo from "./UserInfo"

class AdminUserEdit extends Component {


    render() {
        console.log(this.props.user);
        return (
            <div>

                <UserInfo location={this.props.location}/>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {user: state.searchUsers}
}



export default connect(mapStateToProps, {editUserAccount})(AdminUserEdit);
