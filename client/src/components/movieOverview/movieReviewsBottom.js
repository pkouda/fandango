import React, {Component} from 'react';
import {connect} from "react-redux";
import moment from "moment";
import ReactStars from 'react-stars';
import {Link} from 'react-router-dom';
import _ from 'lodash';
var axios = require('axios');

class MovieReview extends Component {

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


    renderReviews() {
        return (_.map(this.props.reviews.slice(0,8), review => {
            return (
                <div className="col-md-3 extra-review-class">
                    <ReactStars
                        edit={false}
                        count={5}
                        size={24}
                        half={false}
                        value={review.stars}
                        color2={'#FFA358'}
                    />
                    <h3 className="font-condensed-bold color-darkgray">{review.title}</h3>
                    <p className="font-family-roboto font-size-14">{review.body}</p>
                    <p className="font-family-roboto font-size-14 text-uppercase">By {review.userFirstName}</p>
                    <p className="font-family-roboto font-size-14">{review.userEmail}</p>
                </div>
            )
        }))
    }


    render() {

        console.log(this.props.reviews)
        return (
            <div ref ='reviewsTest'>
                <br/>
                <div className="fandango-container">
                    <div className="row">
                        {this.props.reviews ? this.renderReviews() : ''}
                    </div>
                </div>
                <br/>
                <br/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {home: state.home,
         user:state.getUser}
}

export default connect(mapStateToProps, null)(MovieReview);
