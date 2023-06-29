import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import "./ListCard.css";
import {deleteUser} from "../../actions/satishActions"


class ListCard extends Component {
    constructor(props) {
        super(props);

    }

    state = {
        moviename: "Gurdians of Galaxy",
        poster_path: "",
        displayname: "Rishith",
        email: this.props.user.email,
        movietime: "3:30 PM",
        cost: '12$',
        theatername: 'Town Three Hall',
        transactionid: 'XXXX323425',
        screenno: '33'
    };

    deleteUserAccount() {
        this.props.deleteUser(this.state.email);
    }

    render() {
        console.log(this.props);
        return (
            <div className='max-width-70 margin-left style-container-name'>
                <div className='row'>

                    <div className='col-md-4'>
                        <p className='List-user-name font-condensed-bold'>{this.props.user.firstname}</p>
                        {this.props.user.email}
                    </div>

                    <div className='col-md-2'>
                        <button className="btn "
                                onClick={() => {
                                    console.log(this.props.user)
                                    this.props.history.push({
                                        pathname: '/AdminUserEdit',
                                        state: {user: this.props.user, test: "test"}
                                    })
                                }
                                }>
                            Edit
                        </button>
                    </div>
                    <div className='col-md-2'>
                        <button className="btn " onClick={this.deleteUserAccount.bind(this)}>Delete</button>
                    </div>

                </div>
            </div>
        )
    }
}

function mapStateToProps() {
    return ({});
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({deleteUser}, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ListCard)
