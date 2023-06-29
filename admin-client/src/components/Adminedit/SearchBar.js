import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from "redux-form";
import {bindActionCreators} from "redux";
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {searchUsers, searchMoviehallUsers} from "../../actions/satishActions";
import "./SearchBar.css";

class SearchBar extends Component {
    constructor(props) {
        super(props);

    }

    renderField(field) {
        const {meta: {touched, error}} = field;
        const cname = `form-bar ${touched && error ? 'has-danger' : ''} `;

        return (
            <div className={cname}>
                {/*<label>{field.label}</label>*/}
                <input {...field.input} {...field}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    onSubmit(values) {
        console.log(values.user);
        if (this.props.user === 'user') {
            this.props.searchUsers(values.user);
        }
        else {
            this.props.searchMoviehallUsers(values.user);
        }

    }

    render() {
        console.log("this user", this.props.user);
        const {handleSubmit} = this.props;
        return (
            <div>
                <div className="background-fandango margin-left">
                    <div>
                        <div>
                            <form className="form-inline ml-5 my-lg-0"
                                  onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                <br/>
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

                    </div>
                </div>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({
            searchUsers, searchMoviehallUsers
        }, dispatch)

    };
}


export default reduxForm({
    form: 'SignUpForm'
})(connect(null, mapDispatchToProps)(SearchBar));


