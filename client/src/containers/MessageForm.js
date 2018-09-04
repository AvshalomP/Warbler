import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewMessage } from "../store/actions/messages";


class MessageForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: ""
        };
    }

    handleNewMessage = event => {
        event.preventDefault();
        this.props.postNewMessage(this.state.message);
        this.setState({
            message: ""
        });
        this.props.history.push("/");
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render(){
        return (
            <div>
                <div className="row justify-content-md-center text-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleNewMessage} >
                            {this.props.errors.message && (
                                <div className="alert alert-danger">{this.props.errors.message}</div>
                            )}
                            <h2>What's on your mind?</h2>
                            <textarea rows="4" className="form-control" id="message" name="message"
                                   value={this.state.message} onChange={this.handleChange}
                            />
                            <button type="submit" className="btn btn-success">Add my message</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        errors: state.errors
    }
}

export default connect(mapStateToProps, { postNewMessage })(MessageForm);