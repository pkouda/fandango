import React,{Component} from 'react';
// import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import SigninNavbar from './Signin/signinNavbar';
import SigninBody from "./Signin/signinBody";
import {fetchUser} from "../actions/satishActions";
import swal from "sweetalert";

class Signin extends Component{
    componentDidMount(){
    //  this.props.fetchUser();
    }
    render(){
        return(
            <div className="site-wrap signin vipsignin">
                <SigninNavbar/>
                <SigninBody/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return({
        user: state.getUser
    })
}
export default connect(mapStateToProps,{fetchUser})(Signin);