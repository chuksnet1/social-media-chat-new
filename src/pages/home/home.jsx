import React from "react";
import "./home.css";
import ProfileSide from "../../component/ProfileSide/profileSide";
import PostSide from "../../component/PostSide/PostSide";
import RightSide from "../../component/RightSide/RightSIde";

const Home = () => {
  return (
    <div className="Home">
      <ProfileSide/>
      <PostSide/>
      <RightSide/>
    </div>
  );
};

export default Home;
