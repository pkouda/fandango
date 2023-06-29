import React, {Component} from 'react';
import BrandBar from './home/brandBar'
import MegaDropDownHeader from './home/megaDropDownHeader';
import UnderBrand from './home/underBrand';
import Carousel from './home/carousel';
import {connect} from "react-redux";
import {getMoviesInHomePageCarousel} from "../actions/vishalActions";
var axios = require('axios');

class Home extends Component {



    componentDidMount() {
        this.props.getMoviesInHomePageCarousel()
        
        if(this.props.user.isLoggedIn==true)
         {
            console.log("User Email............",this.props.user.user.email);
            var values={username:this.props.user.user.email, status:"open", pagename:"Home", time:new Date()};

            const request =axios.post('http://localhost:3001/movietheatres/usertrack',values)
            .then(response => {
                console.log("sucessss",response.data)
            }).catch(error => {
                console.log("usertracking error",error);
            });

            var values1 = {Page: "Home"};

            const request1 = axios.post('http://localhost:3001/movietheatres/pageclicks', values1)
                .then(response => {
                    console.log("sucessss", response.data)
                }).catch(error => {
                    console.log("usertracking error", error);
                });    

        }
    }

    render() {
        return (
            <div>
                <BrandBar/>
                <MegaDropDownHeader history = {this.props.history}/>
                <UnderBrand/>
                <Carousel home={this.props.home}/>
                <img src="http://localhost:3000/home_dog.jpg" className="width-100"/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {home: state.home,
         user:state.getUser}
}

export default connect(mapStateToProps, {getMoviesInHomePageCarousel})(Home);
