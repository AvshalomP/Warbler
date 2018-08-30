import React, { Component } from 'react';


class AuthForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            profileImgUrl: ""
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const authType = this.props.signUp ? "signup" : "signin";
        this.props.onAuth(authType, this.state)
            .then(() => {
                console.log("Logged in successfully");
                this.props.history.push("/");
            })
            .catch( err => {
                console.log("Log in FAILED");
                return;
            });
    };

    render(){
        const {email, username, password, profileImgUrl} = this.state;
        const {buttonText, heading, signUp, errors, history, removeError } = this.props;

        //removing previous error messages
        history.listen(() => {
            removeError();
        });

        return (
            <div id="container">
                <div className="row justify-content-md-center text-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit} >
                            <h2>{heading}</h2>
                            { errors.message &&
                                <div className="alert alert-danger">{errors.message}</div>
                            }
                            <label htmlFor="email">Email:</label>
                            <input type="text" className="form-control" id="email" name="email"
                                   onChange={this.handleChange} value={email}/>
                            <label htmlFor="password">Password:</label>
                            <input type="password" className="form-control" id="password" name="password"
                                   onChange={this.handleChange}/>
                            {/* conditional inputs - if we are in /signup path, show the extra inputs */}
                            { signUp && (
                                <div>
                                    <label htmlFor="username">Username:</label>
                                    <input type="text" className="form-control" id="username" name="username"
                                           onChange={this.handleChange} value={username}/>
                                    <label htmlFor="profileImgUrl">Image URL:</label>
                                    <input type="text" className="form-control" id="profileImgUrl" name="profileImgUrl"
                                           value={profileImgUrl} onChange={this.handleChange}/>
                                </div>
                            )}
                            <button type="submit" className="btn btn-primary btn-block btn-lg">{buttonText}</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}



export default AuthForm;