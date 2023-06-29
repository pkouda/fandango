import React, {Component} from 'react';
import {connect} from "react-redux";
import {searchUsers} from "../../actions/satishActions";
import SearchBar from "./SearchBar";
import ListCard from "./ListCard";
import _ from "lodash";
import * as API from "../../api/API";

class FindUsers extends Component {

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
        this.props.searchUsers();
    }

    render() {
        console.log("user", this.props.users);
        return (
            <div>
                <SearchBar user="user"/>
                <h3 className='margin-left'>User Accounts</h3>
                {
                    _.map(this.props.users, User => {
                        console.log("user", User)
                        return <ListCard user={User} history={this.props.history}/>;
                    })
                }

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {users: state.searchUsers.users}
}

export default connect(mapStateToProps, {searchUsers})(FindUsers);
