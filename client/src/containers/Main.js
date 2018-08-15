/* For our routing logic */
import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
// we need {Switch, Route, withRouter, Redirect}, to make sure we are correctly
//-> pass to our components that we can use the react router and so we can
//-> specify the current Route that we are on as well as Redirect when we need to
import { connect } from 'react-redux';
import Homepage from '../components/Homepage';


const Main = props => {
    return (
        <div className="container">
            <Switch>
                <Route exact path="/" render={ props => <Homepage { ...props } /> } />
            </Switch>
        </div>
    )
};

function mapStateToProps(state){
    return {
        currentUser: state.currentUser
    }
}

export default withRouter(connect(mapStateToProps, null)(Main));