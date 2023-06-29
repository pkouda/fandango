import React, {Component} from 'react';
import MovieHallMegaDropDownHeader from './movieHallSignIn/movieHallMegaDropDown';
import CancelBookingBody from './cancelMovie/cancelBookingbody';
import {connect} from "react-redux";


class CancelUserBooking extends Component {

    render() {
        return (
            <div>
                <MovieHallMegaDropDownHeader/>
                <CancelBookingBody history={this.props.history}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {home: state.home}
}

export default connect(null, null)(CancelUserBooking);
