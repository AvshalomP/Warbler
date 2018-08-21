import React from 'react';
import { Link } from 'react-router-dom';
import MessageTimeline from "./MessageTimeline";


const Homepage = ({ currentUser }) => {
    //if user is not authenticated, show welcome page
    if(!currentUser.isAuthenticated) {
        return (
            <div className="home-hero">
                <h1>What's Happening?</h1>
                <h4>New To Warbler?</h4>
                <Link to="/signup" className="btn btn-primary">
                    Sign up here
                </Link>
            </div>
        );
    }
    // if auth, show message list page
    return (
        <div>
            <MessageTimeline />
        </div>
    );
};


export default Homepage;