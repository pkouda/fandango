import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './transactionCard.css';
var axios = require('axios');


class TransactionCard extends Component {

    /*componentWillMount(){

         if(this.props.user.isLoggedIn==true)
         {
            console.log("User Email............",this.props.user.user.email);
            var values={username:this.props.user.user.email, status:"open", pagename:"Movietime"};

            const request =axios.post('http://localhost:3001/movietheatres/usertrack',values)
            .then(response => {
                console.log("sucessss",response.data)
            }).catch(error => {
                console.log("usertracking error",error);
            });

         }
     }*/


    constructor(props) {
        super(props);

    }
    state={
        moviename: this.props.purchase,            //"Gurdians of Galaxy",
        poster_path:"",
        username:"Rishith",
        movietime:"3:30 PM",
        cost:'12$',
        theatername:'Town Three Hall',
        transactionid:'XXXX323425',
        screenno:'33'
    };
    render(){
        console.log("purchase",this.props.purchase);
        return(
            <div>
                <div className='row'>
                    <div className='medium-7 columns'><div className='Purchase-container card container'>
                    <div id='purchase-card' className='row'>
                        <div className='Purchase-item medium-10 columns'>
                            <div className='row'>
                                <div className='medium-3 columns'>
                                    <img id = 'purchase-image' src={`http://image.tmdb.org/t/p/w200${this.props.purchase.image}`}>
                                    </img>
                                </div>
                                <div className='Purchase-item medium-9 columns '>

                                      <div className='row'>
                                          <div id='card-heading' className='Purchase-movie-name'>{this.props.purchase.moviename}</div>

                                          </div>
                                    <div className='row'>
                                        <div id='card-user' className='Purchase-user-name'>Name: {this.props.purchase.displayname}</div>
                                    </div>
                                      <div id = 'card-movie' className='Purchase-movie-time'>
                                         <p id = 'timings' >Movie time: <div className='movie-time'>{this.props.purchase.movietime}</div></p>
                                     </div>
                                    <div className='Purchase-movie-theater'>
                                        <p>Movie Theater:
                                            <div id='theater-name'>{this.props.purchase.moviehall} - Screen No: {this.props.purchase.screenno}
                                            </div>
                                        </p>
                                    </div>


                                </div>

                            </div>
                            <div>
                            </div>
                        </div>

                        <div className='Purchase-item medium-2 columns'>
                            <div id = 'transaction-div' className='row'>
                                <div>Transaction ID: <div id='transaction-id'>{this.props.purchase.transactionid}</div></div>
                            </div>

                            <div id='ticket-div'  className='row'>
                                <div>Amount: <div id='ticket-cost'  >${this.props.purchase.Amount}</div></div>
                            </div>

                            <div id = 'tax-div' className='row'>
                                <div>Tax: ${this.props.purchase.tax}</div>
                            </div>
                        </div>
                    </div>

                </div></div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
        return {home: state.home,
         user:state.getUser}
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({}, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TransactionCard)
