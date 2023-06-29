import React, {Component} from 'react';
import {connect} from "react-redux";

class Rating extends Component {

    render() {

        return (
            <div className="rating">
                <div class="rating-row">
                    <h2>Star Rating | 5 Stars</h2>

                    <fieldset class="rate">
                        <input id="rate1-star5" type="radio" name="rate1" value="5" />
                        <label for="rate1-star5" title="Excellent">5</label>

                        <input id="rate1-star4" type="radio" name="rate1" value="4" />
                        <label for="rate1-star4" title="Good">4</label>

                        <input id="rate1-star3" type="radio" name="rate1" value="3" />
                        <label for="rate1-star3" title="Satisfactory">3</label>

                        <input id="rate1-star2" type="radio" name="rate1" value="2" />
                        <label for="rate1-star2" title="Bad">2</label>

                        <input id="rate1-star1" type="radio" name="rate1" value="1" />
                        <label for="rate1-star1" title="Very bad">1</label>
                    </fieldset>
                </div>

            </div>
        )
    }
}


export default connect(null, null)(Rating);