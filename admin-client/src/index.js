import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './App.js';

import { HashRouter, Route, Switch } from "react-router-dom";

// import indexRoutes from "routes/index.jsx";
// import Dashboard from "layouts/Dashboard/Dashboard.jsx";
// import Adminlogin from "./admin/adminLogin"
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";


const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);
export const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));
