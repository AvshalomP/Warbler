import React from 'react';
import MessageList from "../containers/MessageList";
import UserAside from "./UserAside";


const MessageTimeline = props => {
    return (
        <div className="row">
            <UserAside profileImageUrl={props.profileImgUrl} username={props.username}/>
            <MessageList />
        </div>
    )
};

export default MessageTimeline;