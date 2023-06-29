import React, {Component} from 'react';
// import BrandBar from './home/brandBar'
// import MegaDropDownHeader from './home/megaDropDownHeader';
// import MovieTopSection from './movieOverview/movieTopSection';
// import CastCrewCarousel from './movieOverview/castCrewCarousel';
import {connect} from "react-redux";
// import {getSearchedMoviesAdmin} from "../../actions/vishalActions";
import MovieSearchList from '../../admin/adminMovieSearch/moviesSearchList';
// import swal from 'sweetalert';
import * as API from '../../api/API';
import {Card} from "components/Card/Card.jsx";
import {FormInputs} from "components/FormInputs/FormInputs.jsx";
import {UserCard} from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";


class Searchmovie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            term: '',
            searchmovies: []
        };
    }


    componentWillMount() {
        API.fetchUser()
            .then((res) => {
                console.log(res);

                if (!res.user) {
                    this.props.history.push('/login')
                }


            });
    }


    handleSubmit = (evt) => {
        evt.preventDefault();
        API.getSearchedMoviesAdmin(this.state.term)
            .then((res) => {
                console.log("resa----->" + JSON.stringify(res));
                if (res.length == 0) {
                    this.setState({
                        searchmovies: undefined
                    })
                }
                else {
                    this.setState({
                        searchmovies: res
                    });
                }

            });
        //
        // function getSearchedMoviesAdmin(term) {
        //     return (dispatch) => {
        //         const response = axios.get(`${ROOT_URL}/admin/movieSearch?term=${term}`)
        //             .then(response => {
        //                 console.log(response.data)
        //                 dispatch(adminMovies(response.data))
        //             }).catch(error => {
        //                 console.log(error);
        //             });
        //     }
        // }
    }

    render() {

        return (
            <div>



                <form onSubmit={this.handleSubmit.bind(this)} className='margin-left'>
                    <input value={this.state.term} onChange={(e) => this.setState({term: e.target.value})}/>
                    <button type="submit" className="btn btn-primary ">Go</button>
                </form>

                {this.state.searchmovies ? '' : 'No Movies'}

                {this.state.searchmovies ? this.state.searchmovies.length > 0 ?
                    <MovieSearchList history={this.props.history} movies={this.state.searchmovies}/> : '' : ''}
            </div>
        )
    }
}

// function mapStateToProps(state) {
//     return {moviesSearchList: state.moviesSearchList}
// }

export default (Searchmovie);
