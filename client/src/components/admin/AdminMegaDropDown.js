import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


class AdminMegaDropDownHeader extends Component {

    render() {

        return (
            <div className="background-fandango">
                <div className="fandango-container">
                    <nav className="navbar navbar-expand-lg navbar-dark">
                        <Link to="/admin-home">
                            <img className="megaDropDown-brand mt-1"
                                 src="https://images.fandango.com/mobile/web/img/assets/logo-fandango.svg"/>
                        </Link>
                        <h3><span className="page-header-emphasis">ADMIN</span></h3>

                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                    </nav>
                </div>
            </div>
        )


    }
}

// function mapStateToProps(state) {
//     return {dashboard: state.dashboard}
// }

export default connect(null, null)(AdminMegaDropDownHeader);

