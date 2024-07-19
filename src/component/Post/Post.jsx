import React, { useEffect } from "react";
import "./Post.css";
//import { PostData } from "../Data/PostData";
import PostItem from "../PostItem/PostItem";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePost } from "../../actions/postAction";
import { useParams } from "react-router-dom";

const Post = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  const params = useParams()


  //this really does not do much from what i have seen
  useEffect(() => {
    dispatch(getTimelinePost(user._id));
  }, []);


  if(!posts) return "no posts";
  if(params.id) posts = posts.filter((post)=> post.UserId === params.id) 
  return (
    <div className="Post">
      {loading
        ? "Fetching..."
        : posts.map((post, id) => {
            return <PostItem data={post} id={id} />;
          })}
    </div>
  );
};

export default Post;
