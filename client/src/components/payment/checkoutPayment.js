import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import CreditCard from './creditCard';
import Seat from 'material-ui/svg-icons/notification/airline-seat-flat-angled';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import moment from "moment/moment";

class CheckOutPayment extends Component {


    render() {
        console.log(this.props.location.state);
        return (
            <div>
                <div className="background-fandango-checkout">
                    <div className="checkOut-container">

                        <Link to="/home">
                            <img className="megaDropDown-brand mt-1"
                                 src="https://images.fandango.com/mobile/web/img/assets/logo-fandango.svg"/>
                        </Link>
                        <br/>

                        <div className="row mt-3">

                            <div className="col-md-3">
                                <h2 className="font-condensed-bold color-darkgray">CHECKOUT</h2>
                            </div>

                            <div className="col-md-8">
                                {/*<ul class="breadcrumb">*/}
                                {/*<li class="tickets complete"><i class="icon"></i>Tickets</li>*/}
                                {/*<li class="payment "><i class="icon"></i>Payment</li>*/}
                                {/*<li class="confirmation "><i class="icon"></i>Confirmation</li>*/}
                                {/*</ul>*/}
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-md-7 background-white m-2 p-4">
                                <br/>
                                <hr/>
                                <h4 className="font-condensed-bold color-darkgray">PAYMENT</h4>
                                <h5 className='font-weight-700 font-size-14 align-right'> Total: {this.props.location.state.total.totalSum}</h5>
                                <h5 className='font-weight-700 font-size-14'> Number of Tickets: {this.props.location.state.total.noOfTickets}</h5><br/>
                                <h5 className="font-condensed-bold color-darkgray">USE CREDIT OR DEBIT CARD</h5>

                                <CreditCard history={this.props.history} movie={this.props.location.state.movie} total={this.props.location.state.total} showtime={this.props.location.state.showtime}/>
                                <hr/>
                                <br/>


                                <h4 className="font-condensed-bold color-darkgray">FOR FANDANGO VIPS</h4>
                                <p className="font-size-14 color-darkgray">This feature is not yet open</p>
                            </div>

                            <div className="col-md-4 background-white m-2">

                                <hr/>


                                <div className="row">
                                    <div className="col-md-5">

                                        <img className="width-100"
                                             src={`http://image.tmdb.org/t/p/w200${this.props.location.state.movie.movie.poster_path}`}
                                        />

                                    </div>

                                    <div className="col-md-6">

                                        <h3 className="font-condensed-bold color-darkgray">{this.props.location.state.movie.movie.MovieName}</h3>

                                        <br/>

                                        <h6 className="font-size-14 font-family-roboto font-weight-700 color-darkgray">{moment(this.props.location.state.movie.Date).format("dddd")},
                                            <br/>
                                            {moment(this.props.location.state.movie.Date).format("MMMM")}  {moment(this.props.location.state.movie.Date).format("Do")}<br/>
                                            {this.props.location.state.showtime}</h6>


                                        {/*<MuiThemeProvider>*/}
                                        {/*<Seat/>*/}
                                        {/*</MuiThemeProvider>*/}


                                    </div>

                                </div>
                                <br/>

                                <div className="theatre-info">
                                    <span
                                        className="font-family-roboto font-weight-700">{this.props.location.state.movie.theatreName}</span>
                                    <br/>
                                    <span className="font-size-13 font-family-roboto">{this.props.location.state.movie.theatreCity}</span>
                                    <br/>
                                    <span className="font-size-13 font-family-roboto">{this.props.location.state.movie.theatreState}, {this.props.location.state.movie.theatreZip}</span>
                                    <br/>
                                    <br/>
                                    <span className="font-size-13 font-family-roboto">
                                        Screen Number {this.props.location.state.movie.ScreenNo}
                                    </span>
                                </div>

                                <br/>
                                <hr/>

                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

// function mapStateToProps(state) {
//     return {home: state.home}
// }

export default connect(null, null)(CheckOutPayment);
