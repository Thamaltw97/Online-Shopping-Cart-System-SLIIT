import React, {useState} from "react";
import Axios from "axios";

function AddStoreManagerPage(props) {

    const [smNameValue, setSMNameValue] = useState("");
    const [smEmailValue, setSMEmailValue] = useState("");
    const [smPasswordValue, setSMPasswordValue] = useState("");
    const [smPasswordCheckValue, setSMPasswordCheckValue] = useState("");

    const onsmNameChange = (e) => {
        setSMNameValue(e.currentTarget.value);
    };
    const onsmEmailChange = (e) => {
        setSMEmailValue(e.currentTarget.value);
    };
    const onsmPasswordChange = (e) => {
        setSMPasswordValue(e.currentTarget.value);
    };
    const onsmPasswordCheckChange = (e) => {
        setSMPasswordCheckValue(e.currentTarget.value);
    };
    const onSubmit = (e) => {
        e.preventDefault();

        if (!smNameValue || !smEmailValue || !smPasswordValue || !smPasswordCheckValue) {
            return alert('Fill all the relevant fields first !');
        }
        if (smPasswordValue.length < 5) {
            return alert("Password needs to be at least 5 character long");
        }
        if (smPasswordValue !== smPasswordCheckValue){
            return alert('Enter the same password !');
        }

        const storeManagerObj = {
            email: smEmailValue,
            password: smPasswordValue,
            passwordCheck: smPasswordCheckValue,
            displayName: smNameValue,
            userRole: 'storeManager'
        };

        //console.log(storeManagerObj)

        Axios.post('https://onlineshoppingcartsystemsliit.herokuapp.com/api/users/register', storeManagerObj)
            .then(res => {
                alert('Successfully added to Store Managers');
                props.history.push('/admin/storeManagerHome');
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
                            <label>Name : </label>
                            <input id="smName" type="text" className="form-control text-capitalize"
                                   maxLength="30"
                                   onChange={onsmNameChange}
                                   value={smNameValue}/>
                            <br/>
                            <label>Email Address : </label>
                            <input id="smEmail" type="text" className="form-control"
                                   maxLength="100"
                                   onChange={onsmEmailChange}
                                   value={smEmailValue} />
                            <br />
                            <label>Suggested Password: </label>
                            <input id="smPassword" type="password" className="form-control"
                                   maxLength="30"
                                   onChange={onsmPasswordChange}
                                   value={smPasswordValue} />
                            <br />
                            <label>Confirm Suggested Password: </label>
                            <input id="smPasswordCheck" type="password" className="form-control"
                                   maxLength="30"
                                   onChange={onsmPasswordCheckChange}
                                   value={smPasswordCheckValue} />
                            <br />
                    </div>
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
                </form>
            </div>
        </div>
    );
}

export default AddStoreManagerPage