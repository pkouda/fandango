import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import "./signin.css";
import SigninForm from "./signinForm";
var axios = require('axios');

class SigninBody extends Component{

    /*componentWillMount(){

         if(this.props.user.isLoggedIn==true)
         {
            console.log("User Email............",this.props.user.user.email);
            var values={username:this.props.user.user.email, status:"open", pagename:"Movietime"};

            const request =axios.post('http://localhost:3001/movietheatres/usertrack',values)
            .then(response => {
                console.log("sucessss",response.data)
            }).catch(error => {
                console.log("usertracking error",error);
            });

         }
     }*/


    render(){

        return(
            <div className="page registration " role="main">
                <div className="row">

                    <div className="double-type large-8 medium-10 small-12 large-centered medium-centered small-centered columns">
                        <div className="panel-group row">
                            <div className="panel intercept-container large-6 medium-6 small-12 columns">
                                <div className="action-details small-12 columns">
                                    <div className="vip-perks vip-perks--authentication">
                                        <div className="perks__header">
                                            Level up your movie life with Fandango VIP:
                                        </div>
                                        <div className="perks__list">
                                            <div className="perk perk--vip-plus" id="my-fandango">
                                                <div className="perk__header">
                                                    New! Earn Points, Get Movies
                                                </div>
                                            </div>
                                            <div className="perk perk--rope" id="insider-perks">
                                                <div className="perk__header">
                                                    Insider Perks
                                                </div>
                                            </div>
                                            <div className="perk perk--popcorn" id="theater-rewards">
                                                <div className="perk__header">
                                                    Partner Rewards
                                                </div>
                                            </div>
                                            <div className="perk perk--ticket" id="worry-free-tickets">
                                                <div className="perk__header">
                                                    Refunds &amp; Exchanges
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                <div className="registration-promo-unit hide-for-small-only">
                                    <img src="//images.fandango.com/cms/assets/aced1350-33b7-11e8-8eca-fd26e4965c58--vip-registration-banner.png" alt=""/>
                                </div>

                            </div>
                            <SigninForm/>
                        </div>
                    </div>

                </div>
            </div>


        )

    }
}

function mapStateToProps(state) {
    return {home: state.home,
         user:state.getUser}
}

export default connect(mapStateToProps, null)(SigninBody)

//export default SigninBody;