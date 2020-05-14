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


        // if (PasswordValue.length < 5)
        //     return alert('Password needs to be at least 5 character long');
        //
        // if (PasswordValue !== PasswordCheckValue)
        //     return alert('Please Check your password');




        const userObj = {
            email: EmailValue,
            password: PasswordValue,
            passwordCheck: PasswordCheckValue,
            displayName: DisplayNameValue

        };

        Axios.post('http://localhost:5000/users/register', userObj)
            .then(res => {
                alert(res.data.msg);
                //console.log(res.data)
            })
            .catch(err => {
                alert('Error from client: ' + err);
            });

    };


    //render() {
    return (
        <div className="container pt-3 mt-3 mb-5" >
            <div className="card card-body my-0 bg-light">
                <form onSubmit={onSubmit}>

                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <h2 className="text-capitalize text-center mt-3 mb-2">Register</h2>
                            <br/>
                            <br />



                            <label>Your Email : </label>
                            <input id="email" type="text" className="form-control "
                                   maxLength="50"
                                   placeholder="Enter your Email"
                                   onChange={onEmailChange}
                                   value={EmailValue} />
                            <br/>
                            <label>Password : </label>
                            <input id="password" type="password" className="form-control "
                                   maxLength="20"
                                   placeholder="Enter Password"
                                   onChange={onPasswordChange}
                                   value={PasswordValue} />
                            <br />

                            <label>Confirm Password : </label>
                            <input id="passwordCheck" type="password" className="form-control "
                                   maxLength="20"
                                   placeholder="Re-Enter Password"
                                   onChange={onPasswordCheckChange}
                                   value={PasswordCheckValue} />
                            <br />

                            <label>Your Name : </label>
                            <input id="displayName" type="text" className="form-control text-capitalize"
                                   maxLength="30"
                                   placeholder="Enter your Name"
                                   onChange={onDisplayNameChange}
                                   value={DisplayNameValue} />
                            <br />


                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <button type="submit" className="btn btn-block btn-primary mt-3"
                                    id="btnSubmit"
                                    onClick={onSubmit}
                            >Submit</button>
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