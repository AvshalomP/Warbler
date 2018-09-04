import React from 'react';
import DefaultProfileImg from "../images/default-profile-image.png";


const UserAside = ({profileImgUrl, username}) => (
    <aside className="row col-sm-2 justify-content-center">
        <div className="panel panel-default">
            <div className="panel-body">
                <img src={profileImgUrl || DefaultProfileImg} alt={username}
                     width="200" height="200" className="img-thumbnail"
                />
            </div>
        </div>
    </aside>
);

export default UserAside;