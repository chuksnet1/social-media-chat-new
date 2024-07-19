import React from "react";
import "./ProfileCard.css";
import Cover from "../../img/cover.jpg";
import ProfileImg from "../../img/profileImg.jpg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileCard = ({location}) => {
  const post = useSelector((state)=>state.postReducer.posts)
  const {user} = useSelector((state)=>state.authReducer.authData)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER


  const ProfilePage = false;

  return (
    <div className="profile-card">
      <div className="Profile-Image">
        <img src={user.coverPicture? serverPublic + user.coverPicture : serverPublic + "defaultCover.jpg"} alt="" />
        <img src={user.profilePicture? serverPublic + user.profilePicture : serverPublic + "defaultProfile.png"} alt="" />
      </div>
      <div className="ProfileName">
        <span>{user.firstname} {user.lastname}</span>
        <span> {user.work? user.work : "write about yourself"}</span>
      </div>
      <div className="follow-sttus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.followings.length}</span>
            <span>following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>followers</span>
          </div>

          {location === 'profilePage' && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{post.filter((post)=>post.UserId === user._id).length}</span>
                {console.log(post)}
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === 'profilePage' ? "" : <span>
        <Link style={{textDecoration: "none", color: "inherit"}} to={`/profile/${user._id}`}>My Profile</Link>
        </span>}
    </div>
  );
};

export default ProfileCard;
