import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './vipheader.css';


class FandangoVIPHeader extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        console.log(this.props.name)

        return (
            <div className="page-header-container">
                <div className="row">
                    <div className="medium-12 columns">
                        <h1 className="page-header vip-logo">
                            {/*<span className="page-header-emphasis">FANDANGO</span>*/}
                            {/*<span className="page-header-emphasis">VIP</span>*/}
                        </h1>
                        <nav className="page-navigation" role="navigation">
                            <ul className="page-navigation-list">
                                <li className="page-navigation-item">
                                    <Link
                                        className={`page-navigation-link ${this.props.name == 'dashboard' ? 'is-selected' : ''}`}
                                        to='/dashboard'>Dashboard</Link>
                                </li>

                                <li className="page-navigation-item"><Link className="page-navigation-link disabled"
                                                                           to='#'>My
                                    VIP+ Points</Link></li>

                                <li className="page-navigation-item"><Link className="page-navigation-link"
                                                                           to="#">Insider
                                    Perks</Link></li>
                                <li className="page-navigation-item">
                                    <Link className="page-navigation-link"
                                          to="/purchaseHistory">Purchase
                                        History</Link></li>
                                <li className="page-navigation-item">
                                    <Link
                                        className={`page-navigation-link ${this.props.name == 'account' ? 'is-selected' : ''}`}
                                        to="/userprofile">Account
                                        Settings</Link></li>
                                <li className="page-navigation-item">
                                    <Link
                                        className={`page-navigation-link ${this.props.name == 'account' ? 'is-selected' : ''}`}
                                        to="/userprofile">Email
                                        + Preferences</Link></li>
                                <li className="page-navigation-item">
                                    <Link
                                        className="page-navigation-link"
                                        to="#">Partner
                                        Rewards</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>);
    }
}

function mapStateToProps(store) {
    return ({});
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({}, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FandangoVIPHeader)
