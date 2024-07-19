import Popup from "reactjs-popup";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/uploadAction";
import { updateUser } from "../../actions/userAction";

function ProfileModal({ data }) {

  const { password, ...other } = data; //we use this to filter out the password from others
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };


  const handleSubmit=(e)=>{
    e.preventDefault()
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage)
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error)
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage)
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error)
      }
    }
    dispatch(updateUser(param.id, UserData))
    console.log("everything posted and updated")
    console.log(UserData, "and update")
  }

  return (
    <div>
      {console.log("this is the real deal")}

      <Popup trigger={<button> Edit your profile </button>} modal nested>
        {(close) => (
          <div
            className="modal"
            style={{
              background: "red",
              width: "30rem",
              height: "35rem",
              margin: "10rem",
              padding: "2rem",
            }}
          >
            <div className="content">Welcome to GFG!!!</div>
            <form
              style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            >
              Enter the name of the man here
              <div>
                <input
                  type="text"
                  name="firstname"
                  onChange={handleInput}
                  placeholder="Enter the name here"
                  value={formData.firstname}
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  name="lastname"
                  onChange={handleInput}
                  placeholder="Enter your last name"
                  value={formData.lastname}
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  name="about"
                  onChange={handleInput}
                  placeholder="Tell about yourself"
                  value={formData.about}
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  name="livesin"
                  onChange={handleInput}
                  placeholder="Enter where you live"
                  value={formData.livesin}
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  name="worksAt"
                  onChange={handleInput}
                  placeholder="Tell us where you live"
                  value={formData.worksAt}
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  name="relationship"
                  onChange={handleInput}
                  placeholder="Relationship status"
                  value={formData.relationship}
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  name="country"
                  onChange={handleInput}
                  placeholder="What country are you from"
                  value={formData.country}
                ></input>
              </div>
              <div style={{ display: "flex" }}>
                <input type="file" name="profileImage" onClick={handleImageUpload}></input>
                <input type="file" name="coverImage" onClick={handleImageUpload}></input>
              </div>
              <button onClick={handleSubmit}>Save Update</button>
            </form>
            <div>
              <button onClick={()=>close()}>Close Modal</button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}

export default ProfileModal;
