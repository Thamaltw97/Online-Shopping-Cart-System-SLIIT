
import React, {Component} from "react";
import Axios from "axios"

class EditStoreManager extends Component{

    constructor(props) {
        super(props);

        this.onSMNameChange = this.onSMNameChange.bind(this);
        this.onSMEmailChange = this.onSMEmailChange.bind(this);
        this.onSMPasswordChange = this.onSMPasswordChange.bind(this);
        this.onSMPasswordCheckChange = this.onSMPasswordCheckChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);

        this.state = {
            smName: '',
            smEmail: '',
            smPassword: '',
            smPasswordCheck: '',
            smId: '',
        }
    }

    componentDidMount() {
        Axios.get('https://onlineshoppingcartsystemsliit.herokuapp.com/api/users/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    smName: response.data.user.displayName,
                    smEmail: response.data.user.email,
                    smPassword: response.data.user.password,
                    smPasswordCheck: response.data.user.password,
                    smId: this.props.match.params.id
                });
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    onSMNameChange(e) {
        this.setState({
            smName: e.target.value
        });
    }

    onSMEmailChange(e) {
        this.setState({
            smEmail: e.target.value
        });
    }

    onSMPasswordChange(e) {
        this.setState({
            smPassword: e.target.value
        });
    }

    onSMPasswordCheckChange(e) {
        this.setState({
            smPasswordCheck: e.target.value
        });
    }

    onUpdate(e) {
        e.preventDefault();

        if (!this.state.smName || !this.state.smEmail || !this.state.smPassword || !this.state.smPasswordCheck) {
            return alert('Fill all the relevant fields first !');
        }
        if (this.state.smPassword.length < 5) {
            return alert("Password needs to be at least 5 character long");
        }
        if (this.state.smPassword !== this.state.smPasswordCheck){
            return alert('Enter the same password !');
        }

        const obj = {
            displayName: this.state.smName,
            email: this.state.smEmail,
            password: this.state.smPassword,
            //smPasswordCheck: this.state.smPasswordCheck,
        };
        Axios.put('https://onlineshoppingcartsystemsliit.herokuapp.com/api/users/update/'+this.state.smId, obj)
            .then(res => {
                if (res.data.success){
                    alert('Successfully Updated');
                } else {
                    alert('Error from server: '+ res.data.err);
                }
            })
            .catch(err => {console.log('Error from client: ' + err)});
        //console.log(obj);
        this.props.history.push('/admin/storeManagerHome');
    }

    onDelete(e) {
        e.preventDefault();
        Axios.delete('https://onlineshoppingcartsystemsliit.herokuapp.com/api/users/delete/' + this.state.smId)
            .then(res => {
                if (res.data.success) {
                    alert('Successfully Deleted');
                } else {
                    alert('Error from server: ' + res.data.err);
                }
            })
            .catch(err => {
                console.log('Error from client: ' + err)
            });
        this.props.history.push('/admin/storeManagerHome');
    }

    render() {
        return (
            <>
                <div className="container pt-3 mt-3 mb-5" >
                    <div className="card card-body my-0 bg-light">
                        <form onSubmit={this.onUpdate}>
                            <div className="row">
                                <div className="col-md-2"></div>
                                <div className="col-md-8">
                                    <h2 className="text-capitalize text-center mt-3 mb-2">Edit Store Manager <span className= "fa fa-pencil-square-o"></span></h2>
                                    <br/>
                                    <br/>
                                    <label>Name : </label>
                                    <input id="smName" type="text" className="form-control text-capitalize"
                                           maxLength="30"
                                           onChange={this.onSMNameChange}
                                           value={this.state.smName}/>
                                    <br/>
                                    <label>Email Address : </label>
                                    <input id="smEmail" type="text" className="form-control"
                                           maxLength="100"
                                           onChange={this.onSMEmailChange}
                                           value={this.state.smEmail} />
                                    <br />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-2"></div>
                                <div className="col-md-4">
                                    <button type="submit" className="btn btn-block btn-primary mt-3"
                                            id="btnUpdate"
                                            onClick={this.onUpdate}
                                    >Update</button>
                                </div>
                                <div className="col-md-4">
                                    <button type="submit" className="btn btn-block btn-danger mt-3"
                                            id="btnDelete"
                                            onClick={this.onDelete.bind(this.state.smId)}
                                    >Delete</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}
export default EditStoreManager;