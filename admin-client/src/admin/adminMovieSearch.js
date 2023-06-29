import React, {Component} from 'react';
// import BrandBar from './home/brandBar'
// import MegaDropDownHeader from './home/megaDropDownHeader';
// import MovieTopSection from './movieOverview/movieTopSection';
// import CastCrewCarousel from './movieOverview/castCrewCarousel';
import {connect} from "react-redux";
import {getSearchedMoviesAdmin} from "../../actions/vishalActions";
import MovieSearchList from './adminMovieSearch/moviesSearchList';
import swal from 'sweetalert';

class AdminMovieSearch extends Component {


    constructor(props) {
        super(props);

        this.state = {
            term: '',
        };
    }

    handleSubmit = (evt) => {

        evt.preventDefault();
        this.props.getSearchedMoviesAdmin(this.state.term);
    }

    render() {

        return (
            <div>

                <form onSubmit={this.handleSubmit}>
                    <input className='style-date' value={this.state.term} onChange={(e) => this.setState({term: e.target.value})}/>
                    <button type="submit" className="btn btn-primary">Go</button>
                </form>

                {this.props.moviesSearchList ?
                    <MovieSearchList history={this.props.history} movies={this.props.moviesSearchList.movies}/> : ''}

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {moviesSearchList: state.moviesSearchList}
}

export default connect(mapStateToProps, {getSearchedMoviesAdmin})(AdminMovieSearch);
