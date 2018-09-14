/* For our routing logic */
import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
// we need {Switch, Route, withRouter, Redirect}, to make sure we are correctly
//-> pass to our components that we can use the react router and so we can
//-> specify the current Route that we are on as well as Redirect when we need to
import { connect } from 'react-redux';
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import withAuth from "../hocs/withAuth";
import MessageForm from "./MessageForm";


const Main = props => {
    const { authUser, errors, removeError, currentUser } = props;
    return (
        <div className="container">
            <Switch>
                {/* INDEX - homepage*/}
                <Route exact path="/" render={ props => <Homepage currentUser={currentUser} { ...props } /> } />
                {/* Signin page*/}
                <Route exact path="/signin" render={ props => {
                        return (<AuthForm   removeError={removeError} errors={errors}
                                            onAuth={authUser} buttonText="Log in"
                                            heading="Welcome Back." { ...props } />)
                    }
                }/>
                {/* Signun page*/}
                <Route exact path="/signup" render={ props => {
                        return (<AuthForm   removeError={removeError} errors={errors}
                                            onAuth={authUser} signUp buttonText="Sign me up!"
                                            heading="Join Warbler today." { ...props } />)
                    }
                }/>
                {/* New message page*/}
                <Route path="/users/:id/messages/new"
                       component={withAuth(MessageForm)}
                />
            </Switch>
        </div>
    )
};

function mapStateToProps(state){
    return {
        currentUser: state.currentUser,
        errors: state.errors
    }
}

export default withRouter(connect(mapStateToProps, { authUser, removeError })(Main));