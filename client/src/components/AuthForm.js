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

    /**
     * Add Loading Animation
     */
    addLoading = (button) => {
        const addLoader = document.createElement("div");

        addLoader.classList.add("btn-loader");
        button.appendChild(addLoader);
        button.classList.add("is-loading");
        button.setAttribute("disabled", "disabled");
    };

    /**
     * Remove Loading Animation
     */
    removeLoading = (button) => {
        const loader = button.querySelector(".btn-loader");

        if(loader) {
            button.classList.remove("is-loading");
            loader.remove();
            button.removeAttribute("disabled");
        }
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const button = event.target.querySelector('button');
        this.addLoading(button); //switch button to loading animation

        const authType = this.props.signUp ? "signup" : "signin";
        this.props.onAuth(authType, this.state)
            .then(() => {
                this.removeLoading(button); //remove loading animation
                this.props.history.push("/");
            })
            .catch( err => {
                this.removeLoading(button); //remove loading animation
                return;
            });
    };

    render(){
        const {email, username, profileImgUrl} = this.state;
        const {buttonText, heading, signUp, errors, history, removeError } = this.props;

        //removing previous error messages
        history.listen(() => {
            removeError();
        });

        return (
            <div>
                <div className="row justify-content-md-center text-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit} >
                            <h2 className="title-gen-style">{heading}</h2>
                            { errors.message &&
                                <div className="alert alert-danger">{errors.message}</div>
                            }
                            <label htmlFor="email">Email:</label>
                            <input type="text" className="form-control" id="email" name="email"
                                   onChange={this.handleChange} value={email} required/>
                            <label htmlFor="password">Password:</label>
                            <input type="password" className="form-control" id="password" name="password"
                                   onChange={this.handleChange} required/>
                            {/* conditional inputs - if we are in /signup path, show the extra inputs */}
                            { signUp && (
                                <div>
                                    <label htmlFor="username">Username:</label>
                                    <input type="text" className="form-control" id="username" name="username"
                                           onChange={this.handleChange} value={username} required/>
                                    <label htmlFor="profileImgUrl">Image URL:</label>
                                    <input type="text" className="form-control" id="profileImgUrl" name="profileImgUrl"
                                           value={profileImgUrl} onChange={this.handleChange}/>
                                </div>
                            )}
                            <button type="submit" className="btn btn-md btn-form-style btn-load"><span className='btn-load__content'>{buttonText}</span></button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}



export default AuthForm;