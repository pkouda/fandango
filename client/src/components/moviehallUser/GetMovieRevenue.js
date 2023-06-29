import React ,{Component} from 'react';
import {connect} from 'react-redux';
import MovieHallMegaDropDownHeader from "../movieHallSignIn/movieHallMegaDropDown";
import {getmovieRevenue} from "../../actions/satishActions";
import _ from 'lodash';
import "./getRevenue.css";
import SimpleBarChart from "./SimpleBarChart";
import MoviehallHeader from "./MoviehallHeader";


class GetMovieRevenue extends Component{
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.getmovieRevenue();
    }
    movieDetails(movie){
        return (
            <div className= "list-group">
                <div className="list-group-item">
                    <div className="movie-list-details ">
                        Movie Name: <span className="Movie-Name">{movie.moviename}</span>
                    </div>
                    <div className="movie-list-details">
                        Theatre: <span className="Movie-Name">{movie.moviehall}</span>
                    </div>
                    <div className="movie-list-details ">
                        TotalAmount: <span className="Movie-Name">{movie.TotalAmount}</span>
                    </div>
                    <SimpleBarChart movie={movie}/>
                </div>
            </div>
        )
    }
    render(){
        console.log("revenue",this.props.movierevenue);
        var movies = groupBy(this.props.movierevenue,"moviename")
        function groupBy(arr, key) {
            var newArr = [],
                types = {},
                newItem, i, j, cur;
            for (i = 0, j = arr.length; i < j; i++) {
                cur = arr[i];
                if (!(cur[key] in types)) {
                    types[cur[key]] = {type: cur[key], data: []};
                    newArr.push(types[cur[key]]);
                }
                types[cur[key]].data.push(cur);
            }
            return newArr;
        }
        console.log(movies);

        return(
            <div>
                <MovieHallMegaDropDownHeader/>
                <MoviehallHeader/>
                <div id="list-movie-heading">
                {
                    _.map(this.props.movierevenue, movie => {
                        if(movie.data){
                            _.map(movie.data,dataArry => {
                            this.movieDetails(dataArry);
                            });
                        }
                        else{
                            this.movieDetails(movie);
                            }
                        }
                    )
                }
                </div>

            </div>
        );
    }
}


function mapStateToProps(state){
    return {movierevenue:state.movieRevenue.movies}
}

export default connect(mapStateToProps,{getmovieRevenue}) (GetMovieRevenue);