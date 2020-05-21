// import React from "react";
//
// export default function Register() {
//     return(
//         <div>
//             Register
//         </div>
//     )
// }

import React, {useState} from "react";
// import ImgUpload from './ImageUpload';
// import './StylesProduct.css';
import Axios from "axios";
import './Register.css';




function Register(props) {

    const [EmailValue, setEmailValue] = useState("");
    const [PasswordValue, setPasswordValue] = useState("");
    const [PasswordCheckValue, setPasswordCheckValue] = useState("");
    const [DisplayNameValue, setDisplayNameValue] = useState("");


    const onEmailChange = (e) => {
        setEmailValue(e.currentTarget.value);
    };

    const onPasswordChange = (e) => {
        setPasswordValue(e.currentTarget.value);
    };

    const onPasswordCheckChange = (e) => {
        setPasswordCheckValue(e.currentTarget.value);
    };

    const onDisplayNameChange = (e) => {
        setDisplayNameValue(e.currentTarget.value);
    };


    const onSubmit = async (e) => {
        e.preventDefault();

        if (!EmailValue || !PasswordValue || !PasswordCheckValue || !DisplayNameValue) {
            return alert('Fill all the fields first !');
        }


        if (PasswordValue.length < 5)
            return alert('Password needs to be at least 5 character long');

        if (PasswordValue !== PasswordCheckValue)
            return alert('Please Check your password');

        if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(EmailValue))){
            return alert('Please Check you Email Adsress');
        }




            const userObj = {
            email: EmailValue,
            password: PasswordValue,
            passwordCheck: PasswordCheckValue,
            displayName: DisplayNameValue

        };

        Axios.post('http://localhost:5000/api/users/register', userObj)
            .then(res => {
                // alert(res.data.msg);
                alert("Successfully Registered!");
                props.history.push('/login');
                //console.log(res.data)
            })
            .catch(err => {
                // alert('Error from client: ' + err);
                alert("Sorry!, Please check your inserted data... TRY AGAIN!");
            });

    };


    //render() {
    return (
        <div className="container pt-3 mt-3 mb-5 " >
            <div className="card card-body my-0 div-register">
                <form onSubmit={onSubmit}>

                    <div className="row">
                        <div className="col-md-2"/>
                        <div className="col-md-8">
                            <h2 className="text-capitalize text-center mt-3 mb-2">Register</h2>
                            <br/>
                            <p className="p-1">Please fill in this form to create an account.</p>
                            <br />



                            <label className="lable-form">Your Email : </label>
                            <input id="email" type="email" className="form-control "
                                   maxLength="50"
                                   placeholder="Enter your Email"
                                   onChange={onEmailChange}
                                   value={EmailValue} />
                            <br/>
                            <label className="lable-form">Password : </label>
                            <input id="password" type="password" className="form-control "
                                   maxLength="20"
                                   placeholder="Enter Password"
                                   onChange={onPasswordChange}
                                   value={PasswordValue} />
                            <br />

                            <label className="lable-form">Confirm Password : </label>
                            <input id="passwordCheck" type="password" className="form-control "
                                   maxLength="20"
                                   placeholder="Re-Enter Password"
                                   onChange={onPasswordCheckChange}
                                   value={PasswordCheckValue} />
                            <br />

                            <label className="lable-form">Your Name : </label>
                            <input id="displayName" type="text" className="form-control text-capitalize"
                                   maxLength="30"
                                   placeholder="Enter your Name"
                                   onChange={onDisplayNameChange}
                                   value={DisplayNameValue} />
                            <br />
                            <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>


                            <div className="row">
                                <div className="col-md-2"/>
                                <div className="col-md-8">
                                    <button type="submit" className="btn btn-block btn-primary mt-3 btn-signup"
                                            id="btnSubmit"
                                            onClick={onSubmit}
                                    >REGISTER NOW</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
    //}

}

export default Register