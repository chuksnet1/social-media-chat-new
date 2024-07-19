import React from "react";
import "./RightSide.css";
import Home from "../../img/home.png";
import Noti from "../../img/home.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import TrendCard from "../TrendCard/TrendCard";
import { Link } from "react-router-dom";

const RightSide = () => {
  return (
    <div className="Right-side">
      <div className="navIcons">
        <Link to="../home">
          {" "}
          <img src={Home} alt="" />{" "}
        </Link>
        <UilSetting />
        <img src={Noti} alt="" />
        <Link to="../chat">
          <img src={Comment} alt="" />
        </Link>
      </div>

      <TrendCard />

      <button className="button r-button">Share</button>
    </div>
  );
};

export default RightSide;
