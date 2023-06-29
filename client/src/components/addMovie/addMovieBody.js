import React, {Component} from 'react';
import {connect} from "react-redux";
import swal from 'sweetalert'
//import "./movieTime.css"
import {Field, reduxForm,initialize} from "redux-form";
import {getMoviesInSearchPage,GetMoviesnHalls,addMovie} from "../../actions/pranithActions";

import DropdownList from 'react-widgets/lib/DropdownList'

import Multiselect from 'react-widgets/lib/Multiselect'
import 'react-widgets/dist/css/react-widgets.css';


class AddMovieTopSection extends Component {


    componentWillMount()
    {
        console.log("calling movie halls");
        this.props.GetMoviesnHalls({email:this.props.user.user.email});

    }
    state = {
        movieSearch: "",
        userEmail:""
    }

    renderField(field) {
        const className = `form-control input-login ${field.meta.touched && field.meta.error ? 'border-red' : ''}`
        return (
            <div className="form-group form-group-custom">
                <small className='font-weight-700 font-size-14'>{field.label}</small>
                <input
                    className={className}
                    {...field.input}
                    placeholder={field.label}
                    type={field.type}
                    defaultValue={field.inpVal}
                />
                <div className="error-message">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        )
    }
    renderMultiselect = ({input, data, valueField, textField, meta,label}) => {

        const className = `${meta.touched && meta.error ? 'border-red' : ''}`
        return (
            <div>
                <small className='font-weight-700 font-size-14'>{label}</small>
                <Multiselect {...input}
                             className={className}
                             onBlur={() => input.onBlur()}
                             value={input.value || []} // requires value to be an array
                             data={data}
                             valueField={valueField}
                             textField={textField}
                             placeholder={"Select Movie times"}

                />
                <div className="error-message">
                    {meta.touched ? meta.error : ''}
                </div>
            </div>
        )
    }

    /*data={this.props.moviesDropdown.movies.movietheatre}
                                                        valueField="type"
                                                        type="DropdownList"
                                                        textField="type"
    * */




    renderDropdown = ({input, data, valueField, textField, meta,placeholder,label}) => {

        const className = `${meta.touched && meta.error ? 'border-red' : ''}`
        return (
            <div>
                <small className='font-weight-700 font-size-14'>{label}</small>
                <DropdownList {...input}
                             className={className}
                             onBlur={() => input.onBlur()}
                             //value={input.value || []} // requires value to be an array
                             data={data}
                             valueField={valueField}
                             textField={textField}
                            placeholder={placeholder}

                />
                <div className="error-message">
                    {meta.touched ? meta.error : ''}
                </div>
            </div>
        )
    }




    /*renderDropdown(field) {
       // const className = `form-control input-login ${field.meta.touched && field.meta.error ? 'border-red' : ''}`
        const className ="form-control input-login";
        return (
            <div className="form-group form-group-custom">
                <DropdownList
                    className={className}
                    {...field}



                />
                <div className="error-message">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        )
    }*/
    onSubmit(values) {
          // console.log("on submit");
         //  var d = new Date();
        //let i=0;
        //for ( i=0;i<10;i++)
        {
           // d.setDate(d.getDate() + 1);
            //values.Date=i;

            values.userEmail=this.props.user.user.email;
            console.log(values);
            this.props.addMovie(values);
        }
        //console.log(values.username);
        //console.log(this.props);
       // this.setState({editProfile: false});
      //  this.props.editProfile(values);
        // this.props.history.push("/dashboard");

    };

    renderText(field) {

        const className = `form-control ${field.meta.touched && field.meta.error ? 'border-red' : ''}`
        return (
            <div className="form-group form-group-custom">
                <textarea
                    className={className}
                    {...field.input}
                    placeholder={field.label}
                    type={field.type}
                />
                <div className="error-message">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        )
    }
    movieFilter = (filterPrice) => {
        console.log("filter email is : "+filterPrice);
        // this.setState({filterPrice: filterPrice});

        var movieFiltered = this.props.moviesDropdown.movies.movietheatre.filter(function (task) {
            console.log(task.data[0].user);
            //console.log(this.state);

            return task.data[0].user == filterPrice;
        });
        /*
        var priceFilterArray = this.state.totalHotelResults.filter(val => {return val.price < filterPrice;});
        if(priceFilterArray.length <= 0 ){
            console.log("Empty array ");
            this.setState({emptyResults: true});
        }
        else{
            this.setState({emptyResults: false});
        }
        console.log("After Filter in cars: "+priceFilterArray);
        this.setState({hotelResults: priceFilterArray});*/
        return(movieFiltered);
    };

    render() {
        console.log(this.props.user);
       /* if(this.props.user.username!=null && this.state.userEmail=="")
        {
            this.setState({userEmail:this.props.user.username.email})
        }*/

        if(this.props.addMovies.addMovies==true)
        {
            swal("Movie Added");

        }
        else if(this.props.addMovies.addMovies=="movies not added"){

            swal("Movie not added");
        }
        // console.log(this.props);
        //console.log(this.props.movietime.moviesTheatres.moviemap);
      //  console.log(this.props.movietime.moviesTheatres.moviemap[0].type);
        const {handleSubmit, load, pristine, reset, submitting} = this.props;
        var divStyle = {
            //backgroundImage: 'url(http://image.tmdb.org/t/p/original/nIrDm42dy5PaXtUAzUfPmxM4mQm.jpg)',
            backgroundColor: "white"
        };
        //console.log(this.props.moviesDropdown.movies.moviemap);



            return (
                <div className="background-movie-top" style={divStyle}>
                    <div className="fandango-container">
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <div>
                                <div className="card profile-body-left">
                                    <div className="row inside">



                                        <div className="col-md-7">
                                            <div className="mt-4 ml-0 pl-0">
                                                <div className="form-group form-group-custom">
                                                    <Field
                                                        name="theatre"
                                                        component={this.renderDropdown}
                                                        data={this.movieFilter(this.props.user.user.email)

                                                            }
                                                        valueField="type"
                                                        type="DropdownList"
                                                        textField="type"
                                                        label="Movie Hall name"
                                                        placeholder="Select a Movie Hall "/>
                                                </div>
                                                <br/>


                                                <div className="form-group form-group-custom">
                                                    <Field
                                                    name="movie"
                                                    component={this.renderDropdown}
                                                    data={this.props.moviesDropdown.movies.moviemap}
                                                    valueField="movie"
                                                    type="DropdownList"
                                                    textField="movie"
                                                    label="Movie Name"
                                                placeholder="Select a Movie name"/>
                                                </div>
                                                <br/>



                                                <Field
                                                    name="showTimes"
                                                    component={this.renderMultiselect}
                                                    data={["9:00a","9:30a","10:00a","10:30a","11:00a","11:30a","12:00p","12:30p","1:00p","1:30p",
                                                        "2:00p","2:30p","3:00p","3:30p","4:00p","4:30p","5:00p",
                                                        "5:30p","6:00p","6:30p","7:00p","7:30p","8:00p","8:30p","9:00p","9:30p",
                                                        "10:00p","10:30p","11:00p","11:30p","12:00a"
                                                        ]}
                                                    placeholder="Select Show time"
                                                    label="Show Times"
                                                />

                                                <br/>
                                                <Field
                                                    name="screenNo"
                                                    component={this.renderDropdown}
                                                    data={["1","2","3","4"]}
                                                    placeholder="Select Screen Number for the screen"
                                                    label="Screen Number"
                                                />
                                                <br/>
                                                <Field
                                                    label="Seats"
                                                    name="noOfSeats"
                                                    component={this.renderField}
                                                    placeholder="Enter number of seats"
                                                    type="text"
                                                />
                                                <br/>
                                                <Field
                                                    label="Ticket Price"
                                                    name="tktPrice"
                                                    component={this.renderField}
                                                    placeholder="Enter the price of ticket"
                                                    type="text"
                                                />
                                                <br/>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card profile-body-right">
                                    <div className="card-header">
                                        <button className="edit-profile-button"
                                                type="submit">Add Movie
                                        </button>
                                        <br/>
                                        <br/>
                                        <hr/>

                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            )
        }


}

function validate(values) {

    //object that returns errors, if errors is empty the form will be submitted, else it wont be submitted
    //if errors has any properties, redux from assumes that form is invalid
    const errors = {};

    //names are associated to fields in the redux form names
    if (!values.theatre) {
        errors.theatre = "Theatre Movie Cant be empty";
    }
    if (!values.showTimes) {
        errors.showTimes = "Showtimes cant be empty";
    }
    if (!values.movie) {
        errors.movie = "Movie name can't be empty";
    }
    if (!values.screenNo) {
        errors.screenNo = "Screen No can't be empty";
    }
    if (!values.noOfSeats) {
        errors.noOfSeats = "Number of Seats can't be empty";
    }
    if (!values.tktPrice) {
        errors.tktPrice = "Ticket Price can't be empty";
    }
    if (!values.movie) {
        errors.movie = "Movie name can't be empty";
    }
    return errors;
}

function mapStateToProps(state) {
    return {
        movietime: state.moviesSearchPagePK,
        moviesDropdown:state.moviesDropdown,
        addMovies:state.addMovies,
        user:state.getUser}
}


export default
reduxForm({
    validate,
    form: 'AddMovie'
})(connect(mapStateToProps, {getMoviesInSearchPage,GetMoviesnHalls,addMovie})(AddMovieTopSection));
