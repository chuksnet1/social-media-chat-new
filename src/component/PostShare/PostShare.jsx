import React, { useState, useRef } from "react";
import "./PostShare.css";
import ProfilImage from "../../img/profileImg.jpg";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useSelector, useDispatch } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/uploadAction.js";

const PostShare = () => {
  const loading = useSelector((state) => state.postReducer.uploading); //we get it from postReducer
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef();
  const dispatch = useDispatch(); //useDispatch allow component to dispatch action to the redux store
  const { user } = useSelector((state) => state.authReducer.authData); //we get the current user that is logged in using the useSelector
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      //console.log(img);
      setImage(img);
    }
  };
  //image: URL.createObjectURL.img


  const reset=()=>{
    setImage(null);
    desc.current.value = ""
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //we folow a post according to define by our Model(DB)
    const newPost = {
      UserId: user._id,
      desc: desc.current.value, //takes the current value fro the reference
    };

    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename; //here the image is added to the mongo DB
      console.log(newPost);

      try {
        //we sending the data to the redux store through dispatch
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(uploadPost(newPost));
    reset()
  };

  

  return (
    <div className="Post-Share">
      <img src={user.coverPicture? serverPublic + user.profilePicture : serverPublic + "defaultProfile.png"} alt="" />
      <div>
        <input
          ref={desc}
          required
          type="text"
          placeholder="what's happening"
        ></input>
        <div className="Post-Option">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: "var(--schedule)" }}>
            <UilSchedule />
            Schedule
          </div>
          <button
            className="button ps-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "loading..." : "Share"}
          </button>
          {/* here is the dialog box that pops when we click photo */}
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            ></input>
          </div>
        </div>
        {/* here we say if image exist or is true, then do this */}
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            {/* image.image is image from useState and the second from object */}
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
