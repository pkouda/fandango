import React, {Component} from 'react';
import BrandBar from '../home/brandBar'
import MegaDropDownHeader from '../home/megaDropDownHeader';
import UnderBrand from '../home/underBrand';
import Carousel from '../home/carousel';
import {connect} from "react-redux";
import {getMoviesInHomePageCarousel} from "../../actions/vishalActions";
import SearchBar from "./SearchBar";
import {searchMoviehallUsers} from "../../actions/satishActions";

class MoviehallHome extends Component {

    componentDidMount() {
        this.props.searchMoviehallUsers();
    }

    render() {
        return (
            <div>
                <BrandBar/>
                <SearchBar user="MoviehallUser"/>
                <h2 className="List-user-heading font-condensed-bold">User Accounts</h2>
                <p></p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {users: state.searchUsers}
}

export default connect(mapStateToProps, {searchMoviehallUsers})(MoviehallHome);
