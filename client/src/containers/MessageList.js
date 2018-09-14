import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages, deleteMessage } from "../store/actions/messages";
import MessageItem from "../components/MessageItem";


class MessageList extends Component {
    componentDidMount(){
        //load all messages
        this.props.fetchMessages();
    }
    render(){
        const { messages, deleteMessage, currentUser } = this.props;
        let messageList = messages.map( m => (
            <MessageItem
                key={m._id}
                date={m.createdAt}
                text={m.text}
                username={m.user.username}
                profileImageUrl={m.user.profileImgUrl}
                deleteMessage={deleteMessage.bind(this, m.user._id, m._id)}
                isCorrectUser={currentUser === m.user._id}
            />
        ));
        let loading = (
                <div className="loader">
                    <h4>Fetching messages...</h4>
                    <div id="loader-4">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
        );
        return (
            <div className="row col-lg-8 col-sm-10">
                <div className="offset-1 col-sm-10">
                    <ul className="list-group" id="messages">
                        { messageList.length ?  messageList : loading }
                    </ul>
                </div>
            </div>
        );
    }
}


function mapStateToProps (state) {
    return {
        messages: state.messages,
        currentUser: state.currentUser.user.id
    };
}


export default connect(mapStateToProps, { fetchMessages, deleteMessage })(MessageList);