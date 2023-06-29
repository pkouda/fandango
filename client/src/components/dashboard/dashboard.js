import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BrandBar from '../home/brandBar';
import MegaDropDownHeader from '../home/megaDropDownHeader';
import FandangoVIPHeader from '../userProfile/fandangoVIPHeader';
import {getUserDetails} from "../../actions/satishActions";
import UtilityFooter from '../userProfile/utilityFooter';
import './dashboard.css';
import Footer from '../userProfile/footer';
import {deleteSelfUser} from "../../actions/satishActions";

var axios = require("axios");


class Dashboard extends Component {
    componentWillMount(){
        this.props.getUserDetails();
         // if(this.props.user.isLoggedIn==true)
         // {
         //    console.log("User Email............",this.props.user.user.email);
         //    var values={username:this.props.user.user.email, status:"open", pagename:"Dashboard"};
         //
         //    const request =axios.post('http://localhost:3001/movietheatres/usertrack',values)
         //    .then(response => {
         //        console.log("sucessss",response.data)
         //    }).catch(error => {
         //        console.log("usertracking error",error);
         //    });
         //
         // }
     }

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onSubmit = ()=> {

        console.log("Delete");
        //this.props.doDelete();

    };

    deleteUserAccount() {
        this.props.deleteSelfUser(this.props.user.user.email);
    }

    render() {
        console.log('Inside Dashboard: ',this.props.user);
        return (

            <div>
                <BrandBar/>
                <MegaDropDownHeader/>
                <FandangoVIPHeader name='dashboard'/>
                <div className="row">
                    <div className="large-9 columns dashboard-conatiner">
                        <header className="my-account-summary-container">
                            <div className='well'>
                                <div className="Profile cards">
                                    <div className="vip-content">
                                        <img id="AvatarImage" className="user-avatar-thumb"
                                             src={"http://localhost:3001/images/" + this.props.user.user.image}/>{/* Write Image Source*/}

                                        <h3 className="font-condensed-bold">First Name: {this.props.user.user.firstname}<br/><br/> Last
                                            Name: {this.props.user.user.lastname}</h3>
                                        <br/><p
                                        className="font-condensed-bold">Address: {this.props.user.user.address}</p>
                                        <p className="font-condensed-bold">Email-ID: {this.props.user.user.email} </p>
                                        <p className="font-condensed-bold">Mobile No:{this.props.user.user.mobile} </p>

                                        <br/>
                                        <br/>
                                        <br/>
                                        <button id='delete' className="font-family-roboto btn-danger" onClick={() => {
                                            this.onSubmit()
                                        }}>Delete Account

                                        </button>

                                    </div>

                                </div>
                            </div>

                        </header>

                        <div className="row insider-perks">
                            <div className="large-12 columns">
                                <h2 className="mt-4 section-header inline">My Insider Perks</h2>

                                <div className="panel">
                                    <section className="module-standard offers-module">

                                        <div className="insider-perk-container">
                                            <div className="large-4 medium-4 small-6 columns insider-perk">
                                                <article>
                                                    <img
                                                        id="MainImage"
                                                        src="http://images.fandango.com/images/homepage/content/FD_Deadpool2_300x150_offerstrip_v1.png"
                                                        alt="'Deadpool 2' Gift with Purchase"
                                                        // style="height:150px;width:300px;"
                                                    />
                                                    <h4 className="content-title"><b>'Deadpool 2' Gift with
                                                        Purchase</b></h4>

                                                    <p>Receive a FREE* exclusive 'Deadpool 2' poster with ticket
                                                        purchase (*shipping &amp; handling not included).
                                                        <br/>
                                                        <a id="CtaLink"
                                                           href="https://www.fandango.com/deadpool-2-200520/movie-times?intcmp=IMA_Deadpool2GWP_perks">
                                                                  <span
                                                                      className="content-call-to-action">BUY TICKETS</span>
                                                        </a>
                                                    </p>
                                                </article>
                                            </div>


                                            <div className="large-4 medium-4 small-6 columns insider-perk">
                                                <article>
                                                    <a id="ImageLink"
                                                       href="https://www.fandango.com/avengers-infinity-war-199925/movie-times?intcmp=IMA_InfinityWarGWP_perks"><img
                                                        id="MainImage"
                                                        src="http://images.fandango.com/images/homepage/content/FD_Avengers_300x150_offerstrip_v1.png"
                                                        alt="'Avengers: Infinity War' Gift with Purchase"
                                                        // style="height:150px;width:300px;"
                                                    />
                                                        <h4 className="content-title"><b>'Avengers: Infinity War' Gift
                                                            with Purchase</b></h4>
                                                    </a>
                                                    <p>Choose 1 of 5 FREE* exclusive posters with ticket purchase
                                                        (*shipping &amp; handling not included).
                                                        <br/>
                                                        <a id="CtaLink"
                                                           href="https://www.fandango.com/avengers-infinity-war-199925/movie-times?intcmp=IMA_InfinityWarGWP_perks">
                                                                  <span
                                                                      className="content-call-to-action">BUY TICKETS</span>
                                                        </a>
                                                    </p>
                                                </article>
                                            </div>


                                            <div className="large-4 medium-4 small-6 columns insider-perk">
                                                <article>
                                                    <a id="ImageLink"
                                                       href="https://www.fandango.com/ready-player-one-204139/movie-times?intcmp=IMA_RPOGWP_perks"><img
                                                        id="MainImage"
                                                        src="http://images.fandango.com/images/homepage/content/FD_ReadyPlayerOne_300x150_offerstrip_v1.png"
                                                        alt="'Ready Player One' Gift With Purchase"

                                                    />
                                                        <h4 className="content-title"><b>'Ready Player One' Gift With
                                                            Purchase</b></h4>
                                                    </a>
                                                    <p>Receive a FREE* exclusive 'Ready Player One' poster with ticket
                                                        purchase (*shipping &amp; handling not included).
                                                        <br/>
                                                    </p>
                                                </article>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<Footer/>*/}
                {/*<UtilityFooter/>*/}
            </div>
        )
    }

}



function mapStateToProps(state) {
    return {home: state.home,
         user:state.userProfile}
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({deleteSelfUser,getUserDetails}, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
