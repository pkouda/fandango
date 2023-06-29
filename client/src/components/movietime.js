import React, {Component} from 'react';
import BrandBar from './home/brandBar'
import MegaDropDownHeader from './home/megaDropDownHeader';
import MovieTopSection from './movietime/movieTimeTheatre';
import {connect} from "react-redux";
import {demo} from "../actions/vishalActions";
import axios from 'axios';


class Movietime extends Component {


    componentWillMount() {
        console.log("hello", this.props.user);

        if (this.props.user.isLoggedIn == true) {
            console.log("Usertracking............");
            var values = {username: this.props.user.user.email, status: "open", pagename: "Movietime", time:new Date()};

            const request = axios.post('http://localhost:3001/movietheatres/usertrack', values)
                .then(response => {
                    console.log("sucessss", response.data)
                }).catch(error => {
                    console.log("usertracking error", error);
                });

            var values1 = {Page: "Movietime"};

            const request1 = axios.post('http://localhost:3001/movietheatres/pageclicks', values1)
                .then(response => {
                    console.log("sucessss", response.data)
                }).catch(error => {
                    console.log("usertracking error", error);
                });    

            console.log("after ttasildjfksdfh")
        }
    }

    render() {
        return (
            <div>
                <BrandBar/>
                <MegaDropDownHeader/>
                <MovieTopSection history={this.props.history}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        home: state.home,
        user: state.getUser
    }
}

export default connect(null, null)(Movietime);

