import React from "react";
import {Link} from "react-router-dom";
import Axios from "axios";

const AllComment = props => (
    <tr>
        <td>{props.allComment.comment}</td>
        <td>{props.allComment.suggestions}</td>
    </tr>
);

const MyComment = props => (
    <tr>
        <td>{props.myComment.comment}</td>
        <td>{props.myComment.suggestions}</td>
        <td>
            <Link to={"/comment/edit/"+props.myComment._id}>Edit</Link>
        </td>
    </tr>
);

class ViewComments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allComments: [],
            myComments: []
        };
    }



    componentDidMount() {
        Axios.get('https://onlineshoppingcartsystemsliit.herokuapp.com/api/comments/allcomments/' + this.props.match.params.id)
            .then(response => {
                this.setState({allComments: response.data.comments});
                //console.log(this.state.allComments)
            })
            .catch(function (err) {
                console.log(err);
            })

        Axios.post('https://onlineshoppingcartsystemsliit.herokuapp.com/api/comments/mycomments/' + this.props.match.params.id, {userId: localStorage.getItem('user-id')})
            .then(response => {
                this.setState({myComments: response.data.comments});
                //console.log(this.state.myComments)
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.componentDidMount()
    }


    AllComments() {
        return this.state.allComments.map(function(currentAllComment, index){
            return <AllComment allComment={currentAllComment} key={index} />
        })
    }

    MyComments() {
        return this.state.myComments.map(function(currentMyComment, index){
            return <MyComment myComment={currentMyComment} key={index} />
        })
    }

    render() {
        return(
            <div style={{ width: '95%', margin: '3rem auto' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2>Comments Section</h2>
                </div>
                <br />
                <br />
                <div className="row">
                    <div className="col-md-3">
                        <h3>All Comments</h3>
                    </div>
                    <table className="table table-striped tableComment" style={{ marginTop: 20 }}>
                        <thead>
                        <tr className="bg-info">
                            <th>Comment</th>
                            <th>Suggestions</th>
                        </tr>
                        </thead>
                        <tbody>
                        { this.AllComments() }
                        </tbody>
                    </table>
                </div>
                <br />
                <br />

                <div className="row">
                    <div className="col-md-3">
                        <h3>My Comments</h3>
                    </div>
                    <table className="table table-striped tableComment" style={{ marginTop: 20 }}>
                        <thead>
                        <tr className="bg-info">
                            <th>Comment</th>
                            <th>Suggestions</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        { this.MyComments() }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ViewComments;
