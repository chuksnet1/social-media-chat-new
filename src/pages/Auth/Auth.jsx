import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/AuthAction";

const Auth = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state)=>state.authReducer.loading)    //to display loading when login
  const [isSignUp, setIsSignUp] = useState(false);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  console.log(data.lastname)
  const [confirmPass, setConfirmPass] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      if (data.password === data.confirmPassword) {
        dispatch(signUp(data))
      } else {
        setConfirmPass(false)
      }
      // data.password === data.confirmPassword
      //   ? dispatch(signUp(data))
      //   : setConfirmPass(false);
      console.log(data.username)
      console.log(data.password)
      console.log(data.firstname)
       console.log(data.lastname)
       console.log(data.confirmPassword)
      //if (data.password !== data.confirmPassword) {setConfirmPass(false);}else{setConfirmPass(true)}
    } else {
      //the login is from authAction
      dispatch(logIn(data));
    }
  };

  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      username: "",
    });
  };

  return (
    <div className="Auth">
      <div className="a-left">
        {/* Left Side */}
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Jero Media</h1>
          <h6>Explore the new reality in the world</h6>
        </div>
      </div>

      {/* Right Side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign up" : "Log In"}</h3>

          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              ></input>
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              ></input>
            </div>
          )}

          <div>
            <input
              className="infoInput"
              type="text"
              name="username"
              placeholder="Usernames"
              onChange={handleChange}
              value={data.username}
            />
          </div>
          <div>
            <input
              className="infoInput"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
            />

            {isSignUp && (
              <input
                className="infoInput"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                
              />
            )}
          </div>
          <span
            style={{
              display: confirmPass ? "none" : "block",
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
            }}
          >
            * Confirm Password is not same
          </span>
          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {
                setIsSignUp((prev) => !prev);
                resetForm();
              }}
            >
              {isSignUp
                ? "Already have an account. LOGIN!"
                : " Don't have an account? Sign Up"}
            </span>
          </div>
          <button className="button info-button" type="submit" disabled={loading}>
            {loading? "loading..." : isSignUp ? "Sign Up" : "Log In" }
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
