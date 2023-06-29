import React, {Component} from 'react';
import {Router, Route, Redirect, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {fetchUser} from "./actions/satishActions"
import createBrowserHistory from 'history/createBrowserHistory';
import PrivateRoute from "./components/PrivateRoute";
import Signin from "./components/signin";
import SignUp from "./components/signUp";
import UserProfile from "./components/userProfile/userProfile";
import Dashboard from "./components/dashboard/dashboard";
import Home from './components/home';
import MovieTime from './components/movietime';
import AddMovie from './components/addMovie';
import AdminLogin from './components/admin/adminLogin';
import MovieDetail from './components/movieOverview';
import MovieRating from './components/movieRating';
import SecretPage from './components/secretPage';
import CheckOut from './components/payment/checkout';
import CheckOutPayment from './components/payment/checkoutPayment';
import AdminMovieSearch from './components/admin/adminMovieSearch';
import AdminMovieEdit from './components/admin/adminMovieSearch/movieEdit';
import AddMovieHallAdmin from './components/admin/addMovieHall';
import EditMovieHallListing from './components/editMovieHallListing';
import EditMovieHall from './components/editmovie';
import Error from './components/404Error';
import checkFS from './components/adminTrial/checkFS';
import MovieHallSiginin from "./components/moviehallSignin";
import EditMovieHallAdmin from "./components/admin/editMovieHallAdmin"

import FindUsers from "./components/Adminedit/FindUsers";
import PurchaseHistory from "./components/purchases/purchases";
import AdminHome from './components/admin/adminHome';
import MovieAdminHome from './components/movieHallSignIn/movieHallAdminHome';
import AdminUserEdit from './components/Adminedit/AdminUserEdit';
import PrivateRouteMovieHallAdmin from './components/PrivateRouteMovieHall';
import ConditionalRouteMovieHall from './components/ConditionalRouteMovieHall';
import ConditionalRouteUser from './components/ConditionalRouteUser';
import CancelUserBooking from "./components/cancelBooking"
import AddMovieHall from './components/addMovieHall'

import GetMovieRevenue from "./components/moviehallUser/GetMovieRevenue";
import MovieBillAttribute from './components/adminBillsAnalysis/billAttributes';
import SearchMovies from './components/home/listSearchMovies';
import FilterMovies from './components/home/listFilterMovies';
import EditUserForm from './components/userbookingEdit'



export const history = createBrowserHistory();

class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchUser();
    }

    // requireAuth(){
    //     console.log("hgfdg")
    //     this.props.fetchUser();
    // }

    render() {
        //var logStat = this.props.user.isLoggedIn;
        var logStat = this.props.user.isLoggedIn;
        //  console.log(this.props.user.isLoggedIn);

        console.log(this.props)

        if (this.props.user.isLoggingIn) {
            return (
                <div>
                    Loading
                </div>
            )
        }

        return (
            <div className="App">

                <Router history={history}>
                    <Switch>
                        <div>
                            <Switch>



                                <Route path='/admin-analysis' component={MovieBillAttribute}/>
                                <ConditionalRouteUser path="/signin" component={Signin}/>
                                <PrivateRoute path="/movietime" component={MovieTime} props={logStat}/>
                                <PrivateRoute path="/checkfs" component={checkFS}/>
                                <PrivateRoute path="/secret" component={SecretPage} props={logStat}/>
                                <PrivateRoute path="/dashboard" component={Dashboard}/>
                                <PrivateRoute path="/check-out" component={CheckOut}/>
                                <PrivateRoute path="/check-out-payment" component={CheckOutPayment} props={logStat}/>
                                <Route path="/movie-overview/:tmdbid" component={MovieDetail}/>
                                <Route path="/home" component={Home}/>
                                <Route path='/search-movies' component={SearchMovies}/>
                                <Route path='/filter-movies' component={FilterMovies}/>
                                <Route path='/edituserform' component={EditUserForm}/>
                                <Route path="/editMoviehallAdmin" component={EditMovieHallAdmin}/>

                                <PrivateRoute path="/movie-review/:tmdbid" component={MovieRating} props={logStat}/>


                                <ConditionalRouteMovieHall path="/moviehallSignin" component={MovieHallSiginin}/>
                                <PrivateRouteMovieHallAdmin path="/addmovie" component={AddMovie}/>
                                <PrivateRouteMovieHallAdmin path="/editmoviehall" component={EditMovieHall}/>
                                <Route path="/movieHall-home" component={MovieAdminHome}/>
                                <PrivateRouteMovieHallAdmin path="/editmoviehalllisting"
                                                            component={EditMovieHallListing}/>

                                <PrivateRouteMovieHallAdmin path="/getMovieRevenue"
                                                            component={GetMovieRevenue}/>

                                <PrivateRouteMovieHallAdmin path="/cancelbooking"
                                                            component={CancelUserBooking}/>
                                <Route path="/admin-movies" component={AdminMovieSearch}/>
                                <Route path="/admin-movie-edit/:tmdbid" component={AdminMovieEdit}/>
                                <Route path="/admin-login" component={AdminLogin}/>
                                <Route path="/secret" component={SecretPage}/>
                                <Route path="/findUsers" component={FindUsers}/>{/*satish*/}
                                <Route path="/purchaseHistory" component={PurchaseHistory}/>{/*satish*/}
                                <Route path="/admin-home" component={AdminHome}/>{/*satish*/}
                                <Route path="/admin-useredit" component={AdminUserEdit}/>{/*satish*/}
                                <Route path="/addmovieHallAdmin" component={AddMovieHallAdmin}/>
                                <ConditionalRouteUser exact path="/signup" component={SignUp}/>
                                <PrivateRoute exact path='/userprofile' component={UserProfile} props={logStat}/>
                                <Route path="*" component={Error}/>
                            </Switch>
                        </div>

                    </Switch>
                </Router>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({user: state.getUser});
}

export default connect(mapStateToProps, {fetchUser})(App);