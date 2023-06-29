import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getSearchedMoviesUser} from "../../actions/vishalActions";


class UnderBrand extends Component {

    render() {

        return (
            <div className="home-under-brand">
                <div className="fandango-container">
                    <p className="font-condensed under-brand-buy">BUY MOVIE TICKETS

                        <span onClick={() => this.props.getSearchedMoviesUser('')} className="mouse-pointer inside-brand-buy"> SEE ALL MOVIES</span>

                    </p>
                </div>
            </div>
        )


    }
}

// function mapStateToProps(state) {
//     return {dashboard: state.dashboard}
// }

export default connect(null, {getSearchedMoviesUser})(UnderBrand);