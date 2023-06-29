import React, {Component} from 'react';
import {Router, Route, Redirect, Switch} from "react-router-dom";
import {connect} from "react-redux";
// import {fetchUser} from "./actions/satishActions"
import createBrowserHistory from 'history/createBrowserHistory';
// import PrivateRoute from "./components/PrivateRoute";
// import Signin from "./components/signin";
// import SignUp from "./components/signUp";
// import UserProfile from "./components/userProfile/userProfile";
import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import Adminlogin from "./admin/adminLogin";

export const history = createBrowserHistory();

class App extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // this.props.fetchUser();
    }

    render() {
        return (
            <div className="App">

                <Router history={history}>
                    <Switch>
                        <div>
                            <Switch>
                                <Route exact path="/login" component={Adminlogin}/>
                                <Route path='/' component={Dashboard}/>
                                <Route/>
                                {/*<Route exact path="/login" component={Adminlogin}/>*/}
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

export default App;
