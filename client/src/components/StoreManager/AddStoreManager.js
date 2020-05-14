import React, {useState} from "react";
import Axios from "axios";

function AddStoreManagerPage(props) {

    const [smFNameValue, setSMFNameValue] = useState("");
    const [smLNameValue, setSMLNameValue] = useState("");
    const [smEmailValue, setSMEmailValue] = useState("");
    const [smPhoneNoValue, setSMPhoneNoValue] = useState("");
    const [smPasswordValue, setSMPasswordValue] = useState("");

    const onsmFNameChange = (e) => {
        setSMFNameValue(e.currentTarget.value);
    };
    const onsmLNameChange = (e) => {
        setSMLNameValue(e.currentTarget.value);
    };
    const onsmEmailChange = (e) => {
        setSMEmailValue(e.currentTarget.value);
    };
    const onsmPhoneNoChange = (e) => {
        setSMPhoneNoValue(e.currentTarget.value);
    };
    const onsmPasswordChange = (e) => {
        setSMPasswordValue(e.currentTarget.value);
    };
    const onSubmit = (e) => {
        e.preventDefault();

        if (!smFNameValue || !smLNameValue || !smEmailValue || !smPhoneNoValue || !smPasswordValue) {
            return alert('Fill all the relevant first !');
        }

        const storeManagerObj = {
            smFName: smFNameValue,
            smLName: smLNameValue,
            smEmail: smEmailValue,
            smPhoneNo: smPhoneNoValue,
            smPassword: smPasswordValue,
        };

        console.log(storeManagerObj)

        Axios.post('http://localhost:5000/api/storemanagers/add', storeManagerObj)
            .then(res => {
                alert(res.data);
                props.history.push('/storeManager/upload');
            })
            .catch(err => {
                alert('Error from client: ' + err);
            });

    };

    return(
        <div className="container pt-3 mt-3 mb-5" >
            <div className="card card-body my-0 bg-light">
                <form onSubmit={onSubmit}>
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <h2 className="text-capitalize text-center mt-3 mb-2">Add Store Manager</h2>
                            <br/>
                            <br/>
                            <label>First Name : </label>
                            <input id="smFName" type="text" className="form-control text-capitalize"
                                   maxLength="30"
                                   onChange={onsmFNameChange}
                                   value={smFNameValue}/>
                            <br/>
                            <label>Last Name : </label>
                            <input id="smLName" type="text" className="form-control text-capitalize"
                                   maxLength="30"
                                   onChange={onsmLNameChange}
                                   value={smLNameValue}/>
                            <br/>
                            <label>Email Address : </label>
                            <input id="smEmail" type="text" className="form-control"
                                   maxLength="100"
                                   onChange={onsmEmailChange}
                                   value={smEmailValue} />
                            <br />
                            <label>Contact No : </label>
                            <input id="smPhoneNo" type="text" className="form-control"
                                   maxLength="10"
                                   onChange={onsmPhoneNoChange}
                                   value={smPhoneNoValue} />
                            <br />
                            <label>Suggested Password: </label>
                            <input id="smPassword" type="password" className="form-control"
                                   maxLength="30"
                                   onChange={onsmPasswordChange}
                                   value={smPasswordValue} />
                            <br />
                    </div>
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
                </form>
            </div>
        </div>
    );

}

export default AddStoreManagerPage