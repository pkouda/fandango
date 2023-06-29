import React, {Component} from 'react';
import BrandBar from './home/brandBar'
import UnderBrand from './home/underBrand';
import {connect} from "react-redux";
import {demo} from "../actions/vishalActions";
import {searchGenre} from "../actions/rishithActions";
import {bindActionCreators} from 'redux';


class SecretPage extends Component {



    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onSubmit(value){
        this.props.searchGenre(value);
    }

    state={
        action:'Action',
        adventure:'Adventure',
        animation:'Animation',
        comedy:'Comedy'
    };



    render() {
        console.log("Movie Genre Search Data: ", this.props.movieGenreData);
        return (
            <div>
                <BrandBar/>
                <UnderBrand/>
                <button onClick={() => this.props.demo()}>Load Movies</button>
                {/*<button onClick={()=>(this.onSubmit('Action'))}> Action</button>*/}
                {/*<button onClick={()=>(this.onSubmit('Animation'))}> Animation</button>*/}
                {/*<button onClick={()=>(this.onSubmit('Comedy'))}> Comedy</button>*/}
                {/*<button onClick={()=>(this.onSubmit('Adventure'))}> Adventure</button>*/}



            </div>
        )
    }
}

function mapStateToProps(store) {
    return ({
        movieGenreData:store.genreSearchMovies.movieGenreData,
        message:store.genreSearchMovies.message
    });
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({searchGenre}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SecretPage);
