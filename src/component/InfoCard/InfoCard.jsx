import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequest";
import { logOut } from "../../actions/AuthAction";

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const dispatch = useDispatch();
  const params = useParams(); //returns vlue from the current url

  const profileUserId = params.id;
  const [profileUser, setprofileUser] = useState({});

  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setprofileUser(user);
        console.log(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setprofileUser(profileUser);
        console.log(profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);

  const handlelogOut=()=>{
    dispatch(logOut())
  }


  return (
    <div className="InfoCard">
      <div className="Info-Head">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => {
                setModalOpened(true);
                console.log("we clicked it");
              }}
            />
            {modalOpened ? (
            <ProfileModal
            //   modalOpened={modalOpened}
            //   setModalOpened={setModalOpened}
            data={user}
            />
          ) : null}
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="info">
        <span>
          <b>Status </b>
          <span>{profileUser.relationship}</span>
        </span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
          <span>{profileUser.livesin}</span>
        </span>
      </div>
      <div className="info">
        <span>
          <b>Works </b>
          <span>{profileUser.worksAt}</span>
        </span>
      </div>

      <button className="button logout-button" onClick={handlelogOut}>Logout</button>
    </div>
  );
};

export default InfoCard;
