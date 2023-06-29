import React, {Component} from 'react';

import {connect} from "react-redux";
import SearchBar from "../Adminedit/SearchBar";
import {searchMoviehallUsers} from "../../actions/satishActions";
import ListCard from "./ListCard";
import _ from 'lodash';
import * as API from "../../api/API";

class FindMoviehallUsers extends Component {

    componentWillMount() {
        API.fetchUser()
            .then((res) => {
                console.log(res);

                if (!res.user) {
                    this.props.history.push('/login')
                }


            });
    }

    componentDidMount() {
        this.props.searchMoviehallUsers();
    }

    render() {
        console.log("tusers",this.props.users);
        return (
            <div>
                <SearchBar user="MoviehallUser"/>
                <h3 className='margin-left'>MovieHall Owner Accounts</h3>
                {
                    _.map(this.props.users, User => {
                        console.log("user",User)
                        return  <ListCard user={User} history={this.props.history}/> ;
                    })
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {users: state.searchUsers.users}
}

export default connect(mapStateToProps, {searchMoviehallUsers})(FindMoviehallUsers);
