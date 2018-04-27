import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import moment from 'moment';
import Seat from 'material-ui/svg-icons/notification/airline-seat-flat-angled';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class CheckOut extends Component {
    state={
        totalSum:0,
        ticketValue:0,
        tax:0,
        noOfTickets:0

    }


    // componentDidMount(){
    //     this.props.getMoviesInHomePageCarousel()
    // }

    render() {

        console.log(this.props.location.state)
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
                            <div className="col-md-7 background-white m-2">
                                <br/>
                                <hr/>
                                <h4 className="font-condensed-bold color-darkgray">HOW MANY TICKETS?</h4>
                                <hr/>
                                <br/>
                                <div className="form-group font-family-roboto form-group-custom">
                                    <small className='font-weight-700 font-size-14'>Number of Tickets</small>
                                    <input
                                        className="form-control input-login"

                                        placeholder="Enter number of tickets"
                                        type="text"
                                        onChange={(event)=>{
                                            this.setState({noOfTickets:event.target.value});
                                            var ticket_price_total=parseInt(this.props.location.state.movie.TicketPrice)*parseInt(event.target.value);
                                            this.setState({ticketValue:ticket_price_total});
                                            var tax = ticket_price_total*0.1;
                                            this.setState({tax:tax});
                                            var totalSum= ticket_price_total+tax;
                                            this.setState({totalSum:totalSum})
                                            console.log(this.state);


                                }}
                                    />
                                    <small className='font-weight-700 font-size-14 align-right'>Ticket Value : {this.state.ticketValue}</small><br/>
                                    <small className='font-weight-700 font-size-14 align-right'>Tax : {this.state.tax}</small><br/>
                                    <small className='font-weight-700 font-size-14 align-right'> Total: {this.state.totalSum}</small><br/>

                                </div>
                                <button className="btn font-size-13 align-right my-2"
                                onClick={()=> {console.log(this.props)
                                    this.props.history.push({
                                        pathname: '/check-out-payment',
                                        state: {movie : this.props.location.state.movie, showtime : this.props.location.state.showtime, total: this.state}
                                    })}
                                }>
                                    Continue to Payment
                                </button>
                                <br/>
                                <br/>
                                <hr/>


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

export default connect(null, null)(CheckOut);
