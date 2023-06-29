import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class UtilityFooter extends Component {

    constructor(props) {
        super(props);

    }


    render(){
        return(

            <div className="footer-utility">
                <div className="row">
                    <div className="medium-6 columns footer-utility-group">
                        <h4 className="heading-style-2 heading-size-s">Get Updates On All Things Movies:</h4>
                        <div className="fanmail-module">
                            <label className="fanmail-label" htmlFor="e">Sign up for FanMail</label>
                            <input id="footer-fanmail-email" className="fanmail-email" type="email"
                                   placeholder="Enter Email Address"/>
                                <a id="footer-fanmail-submit" className="btn">Submit</a>

                        </div>
                        <h3 id="fanmail-module-success" className="hide">
                            THANKS FOR SIGNING UP!
                        </h3>
                    </div>
                    <div className="medium-3 columns footer-utility-group">
                        <h4 className="heading-style-2 heading-size-s">Follow Us</h4>
                        <span itemScope="" itemType="http://schema.org/Organization">
				<link itemProp="url" href="#"/>
				<a itemProp="sameAs" href="#" target="_blank"
                   className="icon-social icon-facebook" rel="nofollow">Facebook</a>
				<a itemProp="sameAs" href="#" target="_blank"
                   className="icon-social icon-twitter" rel="nofollow">Twitter</a>
				<a itemProp="sameAs" href="#" target="_blank"
                   className="icon-social icon-instagram" rel="nofollow">Instagram</a>
				<a itemProp="sameAs" href="#" target="_blank"
                   className="icon-social icon-googleplus" rel="nofollow">Google+</a>
				<a itemProp="sameAs" href="#" target="_blank"
                   className="icon-social icon-tumblr" rel="nofollow">Tumblr</a>
				<a itemProp="sameAs" href="#" target="_blank"
                   className="icon-social icon-youtube" rel="nofollow">Youtube</a>
			</span>
                    </div>
                    <div className="medium-3 columns footer-utility-group">
                        <h4 className="heading-style-2 heading-size-s">Get Fandango Apps</h4>
                        <a href="#"
                           className="icon-app-store icon-apple-store"
                           onClick="s.linkTrackVars='events';s.linkTrackEvents='event41';s.events='event41';s.tl(this,'o','Apple App Store');"
                           rel="nofollow">Apple App Store</a>
                        <a href="#"                     className="icon-app-store icon-google-play"
                           onClick="s.linkTrackVars='events';s.linkTrackEvents='event41';s.events='event41';s.tl(this,'o','Google Play');"
                           rel="nofollow">Google Play</a>
                    </div>
                    <div className="medium-12columns footer-utility-group">
                        <p className="site-narrative">
                            Guarantee the perfect movie night with tickets from Fandango.
                            Find theater movie times, watch trailers, read reviews and buy movie tickets in advance.
                        </p>
                    </div>
                </div>
            </div>
        )
    }



}

// function mapStateToProps(store) {
//     return ({});
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         ...bindActionCreators({}, dispatch)
//     }
// }


export default UtilityFooter;
