import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Error extends Component {
    render() {
        return (
            <div>
                <div className="background-fandango-checkout">
                    <div className="container">

                        <Link to="/home">
                            <img className="megaDropDown-brand mt-1"
                                 src="https://images.fandango.com/mobile/web/img/assets/logo-fandango.svg"/>
                        </Link>
                        <br/>

                    </div>
                </div>
                <img src="http://localhost:3000/Capture.PNG" className="width-100"/>
            </div>
        )
    }
}

export default Error;