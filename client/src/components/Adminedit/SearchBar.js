import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field,reduxForm} from "redux-form";
import {bindActionCreators} from "redux";
import Slider from "react-slick";
import _ from 'lodash';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {searchUsers, searchMoviehallUsers} from "../../actions/satishActions";

class SearchBar extends Component {
    constructor(props){
        super(props);

    }


    renderField(field){
        const { meta:{touched,error}} = field;
        const cname = `form-bar ${touched && error? 'has-danger' : ''} `;

        return(
            <div className= {cname}>
                {/*<label>{field.label}</label>*/}
                <input {...field.input} {...field}
                />
                <div className="text-help">
                    {touched ? error: ''}
                </div>
            </div>
        )
    }

    onSubmit(values) {
        console.log(values.user);
        if(this.props.user==='user'){
            this.props.searchUsers(values.user);
        }
        else{
            this.props.searchMoviehallUsers(values.user);
        }

    }
    render() {
        console.log("this user",this.props.user);
        const {handleSubmit} = this.props;
        return (
            <div>
                <div className="background-fandango">
                    <div className="fandango-container">
                        <nav className="navbar navbar-expand-lg navbar-dark">
                            {/*<Link to="/home">*/}
                            <img className="megaDropDown-brand mt-1"
                                 src="https://images.fandango.com/mobile/web/img/assets/logo-fandango.svg"/>

                            {/*</Link>*/}
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <form className="form-inline ml-5 my-lg-0" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                    <Field name="user" className="form-control font-size-14  mr-sm-2 header-form-input"
                                           type="search"
                                           placeholder="Search for Movie hall"
                                           aria-label="Search"
                                           component={this.renderField}
                                    />
                                    <button
                                        className="my-2 my-sm-0 header-button-go"
                                        type="submit">GO
                                    </button>
                                </form>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}



function mapDispatchToProps(dispatch){
    return {...bindActionCreators({
        searchUsers, searchMoviehallUsers
    }, dispatch)

    };
}



export default reduxForm({
    form: 'SignUpForm'
}) (connect(null,mapDispatchToProps)(SearchBar));


