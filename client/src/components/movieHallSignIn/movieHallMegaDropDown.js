import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {signoutMovieHall} from '../../actions/satishActions';


class MovieHallMegaDropDownHeader extends Component {


    handleSignout() {
        this.props.signoutMovieHall()
    }

    render() {

        return (
            <div className="background-fandango">
                <div className="fandango-container">
                    <nav className="navbar navbar-expand-lg navbar-dark">


                        <Link to="/movieHall-home">
                            <img className="megaDropDown-brand"
                                 src="https://images.fandango.com/mobile/web/img/assets/logo-fandango.svg"/>
                        </Link>
                        <h3><span className="page-header-emphasis font-weight-bold">MOVIE HALL ADMIN</span></h3>

                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>


                        <div className="collapse navbar-collapse" id="navbarSupportedContent">


                            <ul className="navbar-nav ml-auto font-size-14">

                                <li className="nav-item dropdown">
                                    {/*<a className="nav-link dropdown-toggle active" href="#" id="navbarDropdown"*/}
                                    {/*role="button"*/}
                                    {/*data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
                                    {/*<span className="font-weight-700">SETTINGS</span>*/}
                                    {/*</a>*/}

                                    <div className="btn-group mt-2 font-family-roboto width-200px">
                                        <button type="button" className="btn btn-danger">Options</button>
                                        <button type="button"
                                                className="btn dropdown-toggle dropdown-toggle-split"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span className="sr-only">Toggle Dropdown</span>
                                        </button>
                                        <div className="dropdown-menu moviehall-admin-dropdown font-color-white">
                                            <Link to='/addmovie' className="dropdown-item" href="#">Add Movie</Link>
                                            <Link to='/editmoviehall' className="dropdown-item" href="#">Search Halls</Link>
                                            <Link to='/cancelbooking' className="dropdown-item" href="#">Movie Statistics</Link>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item"
                                               onClick={this.handleSignout.bind(this)}>Sign Out</a>
                                        </div>
                                    </div>

                                    {/*<div className="dropdown-menu align-right"*/}
                                    {/*aria-labelledby="navbarDropdown">*/}
                                    {/*<div className='p-4'>*/}
                                    {/*<span className="text-uppercase text-white">Category 1</span>*/}
                                    {/*<ul className="nav flex-column">*/}
                                    {/*<li className="nav-item">*/}
                                    {/*<a className="nav-link active" href="#">Active</a>*/}
                                    {/*</li>*/}
                                    {/*<li className="nav-item">*/}
                                    {/*<a className="nav-link" href="#">Link item</a>*/}
                                    {/*</li>*/}
                                    {/*<li className="nav-item">*/}
                                    {/*<a className="nav-link" href="#">Link item</a>*/}
                                    {/*</li>*/}
                                    {/*</ul>*/}
                                    {/*</div>*/}


                                    {/*</div>*/}
                                </li>


                            </ul>

                        </div>


                    </nav>
                </div>
            </div>
        )


    }
}

// function mapStateToProps(state) {
//     return {dashboard: state.dashboard}
// }

export default connect(null, {signoutMovieHall})(MovieHallMegaDropDownHeader);

