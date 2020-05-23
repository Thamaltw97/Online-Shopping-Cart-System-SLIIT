import React from "react";
import Axios from "axios";

class EditComment extends React.Component{

    constructor(props) {
        super(props);

        this.onCommentChange = this.onCommentChange.bind(this);
        this.onSuggestionsChange = this.onSuggestionsChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);

        this.state = {
            comment: '',
            suggestions: '',
            productId: ''
        }
    }

    componentDidMount() {
        Axios.get('https://onlineshoppingcartsystemsliit.herokuapp.com/api/comments/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    comment: response.data.comments.comment,
                    suggestions: response.data.comments.suggestions,
                    productId: response.data.comments.productId
                });
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    onCommentChange(e) {
        this.setState({
            comment: e.target.value
        });
    }

    onSuggestionsChange(e) {
        this.setState({
            suggestions: e.target.value
        });
    }


    onUpdate(e) {
        e.preventDefault();
        const obj = {
            comment: this.state.comment,
            suggestions: this.state.suggestions,
        };
        Axios.put('https://onlineshoppingcartsystemsliit.herokuapp.com/api/comments/update/' + this.props.match.params.id, obj)
            .then(res => {
                if (res.data.success){
                    alert(res.data.successMsg);
                    this.props.history.push('/comment/' + this.state.productId);
                } else {
                    alert('Error from server: '+ res.data.err);
                }
            })
            .catch(err => {console.log('Error from client: ' + err)});


    }

    onDelete(e) {
        e.preventDefault();
        Axios.delete('https://onlineshoppingcartsystemsliit.herokuapp.com/api/comments/delete/' + this.props.match.params.id)
            .then(res => {
                if (res.data.success) {
                    alert(res.data.delSuccessMsg);
                } else {
                    alert('Error from server: ' + res.data.err);
                }
            })
            .catch(err => {
                alert('Error from client: ' + err)
            });

        this.props.history.push('/comment/' + this.state.productId);
    }


    render() {
        return (
            <>

                <div className="container pt-3 mt-3 mb-5" >
                    <div className="card card-body my-0 bg-light">
                        <form onSubmit={this.onUpdate}>

                            <div className="row">
                                <div className="col-md-1"></div>
                                <div className="col-md-10">
                                    <label>Comment : </label>
                                    <textarea id="comment" className="form-control"
                                              maxLength="200"
                                              placeholder="Enter comment"
                                              onChange={this.onCommentChange}
                                              value={this.state.comment}
                                    />
                                    <br />
                                    <label>Suggestions : </label>
                                    <textarea id="suggestions" className="form-control"
                                              maxLength="200"
                                              placeholder="Enter your suggestions"
                                              onChange={this.onSuggestionsChange}
                                              value={this.state.suggestions}
                                    />
                                    <br />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-1"></div>
                                <div className="col-md-5">
                                    <button type="submit" className="btn btn-block btn-success mt-3"
                                            id="btnUpdateComment"
                                            onClick={this.onUpdate}
                                    >Update</button>
                                </div>
                                <div className="col-md-5">
                                    <button type="submit" className="btn btn-block btn-danger mt-3"
                                            id="btnDeleteComment"
                                            onClick={this.onDelete}
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

export default EditComment;
