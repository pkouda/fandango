import React, {Component,} from 'react';
import {Field, reduxForm, FormSection} from 'redux-form';
import _ from 'lodash'
import {connect} from 'react-redux';
// import Error from './notFound'
import swal from 'sweetalert'
import creditCardType, {types as CardType} from 'credit-card-type';
import images from '../../creditCardImages';
import {savePaymentData} from '../../actions/pranithActions'
// import {makePayment} from "../actions";

const supportedCards = [
    {
        name: CardType.VISA,
        image: images.visa
    },
    {
        name: CardType.MASTERCARD,
        image: images['master-card']
    },
    {
        name: CardType.AMERICAN_EXPRESS,
        image: images['american-express']
    },
    {
        name: CardType.DINERS_CLUB,
        image: images['diners-club']
    },
    {
        name: CardType.DISCOVER,
        image: images['discover']
    },
    {
        name: CardType.JCB,
        image: images['jcb']
    },
    {
        name: CardType.UNIONPAY,
        image: images['unionpay']
    },
    {
        name: CardType.MAESTRO,
        image: images['maestro']
    }
];

const generateNumberArray = (lowEnd, highEnd) => {
    const list = [];
    let i;
    for (i = lowEnd; i <= highEnd; i++) {
        list.push(i);
    }
    return list;
};

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

const expiryYears = generateNumberArray(new Date().getFullYear(), 2031);

const getDetectedCard = (detectedCreditCard) => {
    if (detectedCreditCard.length === 1) {
        return detectedCreditCard[0]
    }
};

const isRequired = (value) => {
    if (!value) {
        return 'Required';
    }
};

const validateCreditCard = (value, acceptedCards) => {
    if (!value) {
        return 'Required';
    }
    const detectedCreditCard = getDetectedCard(creditCardType(value), acceptedCards);

    if (!detectedCreditCard) {
        return 'Please enter a valid credit card number.';
    }

    if (_.has(detectedCreditCard, 'lengths') && detectedCreditCard.lengths.indexOf(value.length) === -1) {
        return 'Credit card number contains invalid number of characters.';
    }
};

const validateSecurityCode = (value, securityCodeLength) => {
    if (!value) {
        return 'Required';
    }

    if (_.get(value, 'length') !== securityCodeLength || _.get(value, 'length') === 0) {
        return 'Security code length not matched'
    }

    if (isNaN(value)) {
        return 'Must only contain numbers'
    }
};

const validate = (values, props) => {
    const getPaymentSectionValue = (fieldName) => _.get(values, `payment.${fieldName}`);

    // console.log(getPaymentSectionValue())
    const detectedCreditCard = creditCardType(getPaymentSectionValue('cardNumber'));

    // console.log(detectedCreditCard)
    const securityCodeLength = _.get(getDetectedCard(detectedCreditCard, supportedCards), 'code.size');
    // console.log(securityCodeLength)

    return {
        payment: {
            cardNumber: validateCreditCard(getPaymentSectionValue('cardNumber'), props.acceptedCards),
            nameOnCard: isRequired(getPaymentSectionValue('nameOnCard')),
            expiryMonth: isRequired(getPaymentSectionValue('expiryMonth')),
            expiryYear: isRequired(getPaymentSectionValue('expiryYear')),
            securityCode: validateSecurityCode(getPaymentSectionValue('securityCode'), securityCodeLength)
        }
    };
};

const renderCreditCardPictures = (supportedCards, cardTypeName) => supportedCards.map((creditCard, index) => (cardTypeName === creditCard.name &&
    <img key={index} width="40" height="30" src={creditCard.image} alt={cardTypeName}/>));

const renderCreditCardField = ({input, label, type, meta: {touched, error, warning}, acceptedCards}) => {
    const detectedCreditCard = getDetectedCard(creditCardType(input.value), acceptedCards);
    const cardTypeName = _.get(detectedCreditCard, 'type');
    const cardNiceType = _.get(detectedCreditCard, 'niceType');

    return (
        <div className={`form-group ${touched && error && `has-error`}`}>
            <label htmlFor={label} className="control-label">{label}</label>

            <div className="row">
                <div className="col-lg-10">
                    <input {...input} placeholder={label} type={type}
                           className={` ${touched && error ? 'has-error border-red form-control' : 'form-control'}`}
                           id={label}/>
                    {touched && ((error != '' &&
                        <span className="error-message font-size-14">{error}</span>) || (warning &&
                        <span>{warning}</span>))}
                </div>
                <div className="col-lg-2 reg-card-number">
                    <div className={`reg-card-number__content ${cardTypeName}`}>
                        {renderCreditCardPictures(supportedCards, cardTypeName)}
                        {/*<small>{cardNiceType}</small>*/}
                    </div>
                </div>
            </div>
        </div>
    )
};

const renderDateFieldFull = ({input, label, type, meta: {touched, error, warning}, options, valueInterceptor}) => {
    return (
        <div>
            <label htmlFor={label} className="control-label">{label}</label>
            <div className="row">
                <div className="col-lg-10">
                    <select
                        className={` ${touched && error ? 'has-error border-red form-control' : 'form-control'}`} {...input}>
                        <option/>
                        {
                            options.map((option, index) => <option key={index}
                                                                   value={valueInterceptor(index)}>{option}</option>)
                        }
                    </select>
                    {touched && ((error && <span className="error-message font-size-14">{error}</span>) || (warning &&
                        <span>{warning}</span>))}
                </div>
            </div>
        </div>
    );
};

const renderTextField = ({input, label, type, meta: {touched, error, warning}, fieldGridSize}) => (
    <div>
        <label htmlFor={label} className="control-label">{label}</label>
        <div className="row">
            <div className="col-lg-10">
                <input {...input} placeholder={label} type={type}
                       className={` ${touched && error ? 'has-error border-red form-control' : 'form-control'}`}
                       id={label}/>
                {touched && ((error &&
                    <span className="help-block error-message font-size-14">{error}</span>) || (warning &&
                    <span>{warning}</span>))}
            </div>
        </div>
    </div>
);

class Transaction extends Component {

    onSubmit(data) {
        console.log(data);
        console.log(this.props.user);
        console.log(this.props.movie);
        console.log(this.props.showtime)
        console.log(this.props.total);


     var   paymentData={
            creditCard:data,
            movies: this.props.movie,
            showtime:this.props.showtime,
            total:this.props.total,
            user:this.props.user.user
     }
        this.props.savePaymentData(paymentData);
        // console.log(data)
        // console.log(data.payment.cardNumber)
        // console.log(data.payment.nameOnCard)
        // console.log(data.payment.securityCode)
        //
        // console.log(this.props.location.state.owner)
        // console.log(this.props.location.state.bidder)
        // console.log(this.props.location.state.bidAmount)
/*

        var body = new FormData();

        body.append('cardNumber', data.payment.cardNumber)
        body.append('nameOnCard', data.payment.nameOnCard)
        body.append('securityCode', data.payment.securityCode)
        body.append('owner', this.props.location.state.owner)
        body.append('bidder', this.props.location.state.bidder)
        body.append('bidAmount', this.props.location.state.bidAmount)
        body.append('projectid', this.props.location.state.projectid)
*/

        // this.props.makePayment(body)
  //swal("Payment Successful");
    //    this.props.history.push('/home')
    }

    render() {
        const {handleSubmit} = this.props;

        // if (this.props.state) {
        //     console.log(this.props.state)
        // }
        // else {
        //     return (
        //         <div>
        //             {/*<Error/>*/}
        //         </div>
        //     )
        // }
console.log(this.props.savePayments);
console.log(this.props);
        console.log(this.props.user);
if(this.props.savePayments.booking===true)
{
    swal("movie booked")
    this.props.history.push("/home");
}
else if(this.props.savePayments.booking===false)
{
    swal("Boooking not completed");
   this.props.history.push("/home");
}
        return (
            <div>


                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="form-horizontal redux-payment-form">
                    <fieldset>
                        <br/>
                        <FormSection name="payment">
                            <Field name="cardNumber" type="text" label="Card Number" acceptedCards={supportedCards}
                                   component={renderCreditCardField}/>

                            <Field name="nameOnCard" type="text" label="Name on card" component={renderTextField}/>

                            <br/>

                            <div className="max-width-40">
                                <Field name="expiryMonth" type="text" label="Expiry Month" options={monthNames}
                                       valueInterceptor={(index) => index + 1} component={renderDateFieldFull}/>
                            </div>

                            <div className="max-width-20">
                                <Field name="expiryYear" type="text" label="Year" options={expiryYears}
                                       valueInterceptor={(index) => index} component={renderDateFieldFull}/>
                            </div>
                            <div className="max-width-20">
                                <Field name="securityCode" type="text"
                                       label={'CVV'}
                                       component={renderTextField}/>
                            </div>
                        </FormSection>
                    </fieldset>

                    <br/>

                    <hr/>

                    <div className="text-center mr-5">
                        <button className="btn btn-success p-2 " type="submit">Submit Payment</button>
                    </div>
                </form>
            </div>
        );
    }
}


 function mapStateToProps(state) {
     return {home: state.home,
         savePayments:state.savePayments,
     user:state.getUser}
}


export default reduxForm({
    validate,
    form: 'payment-form',
})(
    connect(mapStateToProps, {savePaymentData})(Transaction)
);

