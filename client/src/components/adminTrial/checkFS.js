import React, {Component} from 'react';
import {connect} from "react-redux";
import {getSearchedMoviesAdmin} from "../../actions/vishalActions";
import swal from 'sweetalert';
import fs from 'fs';

class checkFS extends Component {


    constructor(props) {
        super(props);

        fs.readfile('../logs/logging.txt' , function(err,res){

            if(err){
                console.log("error while reading");
            }
            else{
                console.log("Data added successfully");
            }

        })



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
                <h1>Admin FS trial</h1>
            </div>
        )
    }
}

export default checkFS;
