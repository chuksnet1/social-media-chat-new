import React, { useState } from "react";
import "./PostItem.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { useSelector } from "react-redux";
import {likePost} from '../../api/postRequest'
//import { likePost } from "../../../server/Controller/PostController";
//import car from '../../../server/public/images/car.jpeg'



const PostItem = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)

  const handleLike=()=>{
    setLiked((prev)=>!prev)
    //sending data.id which the id of post and id of user who have like the post
    likePost(data._id, user._id)
    liked? setLikes((prev)=> prev -1) : setLikes((prev)=> prev +1)

  }

  return (
    <div className="post-item">
      <img
      //{data.img ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />
      {/* {console.log(process.env.REACT_APP_PUBLIC_FOLDER + data.image )} */}
      {/* {console.log(data.image)} */}
      <div className="react-image">
        <img src={liked ? Heart : NotLike} alt="" style={{cursor: "pointer"}} onClick={handleLike}/>
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>

      <div className="detail">
        <span>
          <b>{data.name}</b>
        </span>
        <span>{data.desc}</span>
      </div>
    </div>
  );
};

export default PostItem;
