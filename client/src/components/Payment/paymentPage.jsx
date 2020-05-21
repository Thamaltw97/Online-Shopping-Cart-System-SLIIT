
import React, {useState} from "react";
// import ImgUpload from './ImageUpload';
// import './StylesProduct.css';
import Axios from "axios";
import './paymentPage.css';




function Payment(props) {

    const [FullNameValue, setFullNameValue] = useState("");
    const [EmailValue, setEmailValue] = useState("");
    const [AddressValue, setAddressValue] = useState("");
    const [CityValue, setCityValue] = useState("");
    const [CountryValue, setCountryValue] = useState("");
    const [ZipValue, setZipValue] = useState("");
    const [NameOnCardValue, setNameOnCardValue] = useState("");
    const [CardNoValue, setCardNoValue] = useState("");
    const [ExpMonthValue, setExpMonthValue] = useState("");
    const [ExpYearValue, setExpYearValue] = useState("");
    const [CvvValue, setCvveValue] = useState("");


    const onFullNameChange = (e) => {
        setFullNameValue(e.currentTarget.value);
    };

    const onEmailChange = (e) => {
        setEmailValue(e.currentTarget.value);
    };

    const onAddressChange = (e) => {
        setAddressValue(e.currentTarget.value);
    };

    const onCityChange = (e) => {
        setCityValue(e.currentTarget.value);
    };

    const onCountryChange = (e) => {
        setCountryValue(e.currentTarget.value);
    };

    const onZipChange = (e) => {
        setZipValue(e.currentTarget.value);
    };

    const onNameOnCardChange = (e) => {
        setNameOnCardValue(e.currentTarget.value);
    };

    const onCardNoChange = (e) => {
        setCardNoValue(e.currentTarget.value);
    };

    const onExpMonthChange = (e) => {
        setExpMonthValue(e.currentTarget.value);
    };

    const onExpYearChange = (e) => {
        setExpYearValue(e.currentTarget.value);
    };

    const onCvvChange = (e) => {
        setCvveValue(e.currentTarget.value);
    };




    const onCheckout = async (e) => {
        e.preventDefault();

        if (!FullNameValue || !EmailValue || !AddressValue || !CityValue ||!CountryValue ||!ZipValue) {
            return alert('Fill all required fields first !');
        }


        if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(EmailValue))){
            return alert('Please Check you Email Adsress');
        }




        const paymentObj = {
            fullName:FullNameValue,
            email: EmailValue,
            address:AddressValue,
            city:CityValue,
            country:CountryValue,
            zip:ZipValue,
            nameOncard:NameOnCardValue,
            cardNo:CardNoValue,
            expMonth:ExpMonthValue,
            expYear:ExpYearValue,
            cvv:CvvValue


        };

        Axios.post('http://localhost:5000/api/payments/add', paymentObj)
            .then(res => {
                // alert(res.data.msg);
                alert("Successfully Added Payment Details! ");
                props.history.push('/home');
                //console.log(res.data)
            })
            .catch(err => {
                // alert('Error from client: ' + err);
                alert("Sorry!, Please check your inserted data... TRY AGAIN!");
            });

    };

    const onCancel = (e) =>{
        props.history.push('/cart');
    };


    //render() {
    return (
        <div>
            <div className="row">
                <div className="col-75">
                    <div className="container-payment">
                        <form >

                            <div className="row">
                                <div className="col-50">
                                    <h3>Billing Address</h3>
                                    <label htmlFor="fname"><i className="fa fa-user"/> Full Name</label>
                                    <input type="text" id="fname" name="firstname" placeholder="Maleesha Perera"
                                           onChange={onFullNameChange}
                                           value={FullNameValue}/>

                                    <label htmlFor="email"><i className="fa fa-envelope"/> Email</label>
                                    <input type="text" id="email" name="email" placeholder="maleesha97@gmail.com"
                                           onChange={onEmailChange}
                                           value={EmailValue}/>

                                    <label htmlFor="adr"><i className="fa fa-address-card-o"/> Address</label>
                                    <input type="text" id="adr" name="address" placeholder="542 . 15th Street"
                                           onChange={onAddressChange}
                                           value={AddressValue}/>

                                    <label htmlFor="city"><i className="fa fa-institution"/> City</label>
                                    <input type="text" id="city" name="city" placeholder="Colombo"
                                           onChange={onCityChange}
                                           value={CityValue}/>

                                    <div className="row">
                                        <div className="col-50">
                                            <label htmlFor="country">Country</label>
                                            <input type="text" id="country" name="state" placeholder="Sri Lanka"
                                                   onChange={onCountryChange}
                                                   value={CountryValue}/>
                                        </div>
                                        <div className="col-50">
                                            <label htmlFor="zip">Zip</label>
                                            <input type="text" id="zip" name="zip" placeholder="10115"
                                                   onChange={onZipChange}
                                                   value={ZipValue}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-50">
                                    <h3>Payment</h3>
                                    <label htmlFor="fname">Accepted Cards</label>
                                    <div className="icon-container">
                                        <i className="fa fa-cc-visa visa" />
                                        <i className="fa fa-cc-amex amex" />
                                        <i className="fa fa-cc-mastercard mastercard"/>
                                        <i className="fa fa-cc-discover discover"/>
                                    </div>
                                    <label htmlFor="cname">Name on Card</label>
                                    <input type="text" id="cname" name="cardname" placeholder="Maleesha
                                        perera"
                                           onChange={onNameOnCardChange}
                                           value={NameOnCardValue}/>

                                    <label htmlFor="ccnum">Credit card number</label>
                                    <input type="text" id="ccnum" name="cardnumber"
                                           placeholder="1111-2222-3333-4444"
                                           onChange={onCardNoChange}
                                           value={CardNoValue}/>

                                    <label htmlFor="expmonth">Exp Month</label>
                                    <input type="text" id="expmonth" name="expmonth" placeholder="January"
                                           onChange={onExpMonthChange}
                                           value={ExpMonthValue}/>

                                    <div className="row">
                                        <div className="col-50">
                                            <label htmlFor="expyear">Exp Year</label>
                                            <input type="text" id="expyear" name="expyear"
                                                   placeholder="2020"
                                                   onChange={onExpYearChange}
                                                   value={ExpYearValue}/>
                                        </div>
                                        <div className="col-50">
                                            <label htmlFor="cvv">CVV</label>
                                            <input type="text" id="cvv" name="cvv" placeholder="352"
                                                   onChange={onCvvChange}
                                                   value={CvvValue}/>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <label>
                                <input type="checkbox" checked="checked" name="sameadr"/> Shipping address same as
                                billing
                            </label>
                            <div>
                                {/*<input type="submit" value="Cancel" className="btn-cancel"/>*/}
                                {/*<input type="submit" value="Continue to CHECKOUT" className="btn-continueCheckout"/>*/}

                                <button type="submit" className="btn btn-block btn-danger mt-3 btn-cancel"
                                        id="btnSubmit"
                                        onClick={onCancel}
                                >Cancel</button>
                                <button type="submit" className="btn btn-block btn-success mt-3 btn-continueCheckout"
                                        id="btnSubmit"
                                        onClick={onCheckout}
                                >Continue to CHECKOUT</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
    //}

}

export default Payment



















//
//
// import React, {Component} from "react";
//
// import './paymentPage.css'
//
//
// export default class Payment extends Component{
//     render() {
//         return(
//             <div>
//                 <div className="row">
//                     <div className="col-75">
//                         <div className="container-payment">
//                             <form >
//
//                                 <div className="row">
//                                     <div className="col-50">
//                                         <h3>Billing Address</h3>
//                                         <label htmlFor="fname"><i className="fa fa-user"/> Full Name</label>
//                                         <input type="text" id="fname" name="firstname" placeholder="Maleesha Perera"/>
//                                         <label htmlFor="email"><i className="fa fa-envelope"/> Email</label>
//                                         <input type="text" id="email" name="email" placeholder="maleesha97@gmail.com"/>
//                                         <label htmlFor="adr"><i className="fa fa-address-card-o"/> Address</label>
//                                         <input type="text" id="adr" name="address" placeholder="542 . 15th Street"/>
//                                         <label htmlFor="city"><i className="fa fa-institution"/> City</label>
//                                         <input type="text" id="city" name="city" placeholder="Colombo"/>
//
//                                         <div className="row">
//                                             <div className="col-50">
//                                                 <label htmlFor="country">Country</label>
//                                                 <input type="text" id="country" name="state" placeholder="Sri Lanka"/>
//                                             </div>
//                                             <div className="col-50">
//                                                 <label htmlFor="zip">Zip</label>
//                                                 <input type="text" id="zip" name="zip" placeholder="10115"/>
//                                             </div>
//                                         </div>
//                                     </div>
//
//                                     <div className="col-50">
//                                         <h3>Payment</h3>
//                                         <label htmlFor="fname">Accepted Cards</label>
//                                         <div className="icon-container">
//                                             <i className="fa fa-cc-visa visa" />
//                                             <i className="fa fa-cc-amex amex" />
//                                             <i className="fa fa-cc-mastercard mastercard"/>
//                                             <i className="fa fa-cc-discover discover"/>
//                                         </div>
//                                         <label htmlFor="cname">Name on Card</label>
//                                         <input type="text" id="cname" name="cardname" placeholder="Maleesha
//                                         perera"/>
//                                         <label htmlFor="ccnum">Credit card number</label>
//                                         <input type="text" id="ccnum" name="cardnumber"
//                                                placeholder="1111-2222-3333-4444"/>
//                                         <label htmlFor="expmonth">Exp Month</label>
//                                         <input type="text" id="expmonth" name="expmonth" placeholder="January"/>
//                                         <div className="row">
//                                             <div className="col-50">
//                                                 <label htmlFor="expyear">Exp Year</label>
//                                                 <input type="text" id="expyear" name="expyear"
//                                                        placeholder="2020"/>
//                                             </div>
//                                             <div className="col-50">
//                                                 <label htmlFor="cvv">CVV</label>
//                                                 <input type="text" id="cvv" name="cvv" placeholder="352"/>
//                                             </div>
//                                         </div>
//                                     </div>
//
//                                 </div>
//                                 <label>
//                                     <input type="checkbox" checked="checked" name="sameadr"/> Shipping address same as
//                                     billing
//                                 </label>
//                                 <div>
//                                     {/*<input type="submit" value="Cancel" className="btn-cancel"/>*/}
//                                     {/*<input type="submit" value="Continue to CHECKOUT" className="btn-continueCheckout"/>*/}
//                                 </div>
//
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
//
//
// }
//
