import React from 'react';
import { Link } from 'react-router-dom';
import MessageTimeline from "./MessageTimeline";


const Homepage = ({ currentUser }) => {
    //if user is not authenticated, show welcome page
    if(!currentUser.isAuthenticated) {
        return (
            <div className="home-hero">
                <div className="welcome-signup-message">
                    <h1>What's <br/> Happening?</h1>
                    <h4>New To Warbler?</h4>
                    <Link to="/signup" className="btn">
                        Sign up here
                    </Link>
                </div>
            </div>
        );
    }
    // if auth, show message list page
    return (
        <div>
            <MessageTimeline
                profileImageUrl={currentUser.user.profileImgUrl}
                username={currentUser.user.username}
            />
        </div>
    );
};


export default Homepage;