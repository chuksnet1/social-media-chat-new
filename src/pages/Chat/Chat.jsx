import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import LogoSearch from "../../component/LogoSearch/LogoSearch";
import { useSelector } from "react-redux";
import { userChats } from "../../api/ChatRequests";
import Conversation from "../../component/Conversation/Conversation";
import { Link } from "react-router-dom";
import { UilSetting } from "@iconscout/react-unicons";
import Home from "../../img/home.png";
import Noti from "../../img/home.png";
import Comment from "../../img/comment.png";
import ChatBox from "../../component/ChatBox/ChatBox";
import { io } from "socket.io-client";

const Chat = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  //console.log(user);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const socket = useRef();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMesaage, setReceiveMesaage] = useState(null);

  //send message to the socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);



  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);


  //get message from the socket server
  useEffect(()=>{
    socket.current.on("receive-message", (data)=>{
      setReceiveMesaage(data);
    })
  },[])

  console.log(currentChat, "this is the chat");
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
        console.log(data, "from the data side");
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user]);

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => {
              return (
                <div
                  onClick={() => {
                    setCurrentChat(chat);
                    console.log("we clicked it now");
                  }}
                >
                  <Conversation data={chat} currentUserId={user._id} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="Right-side-chat">
        {/* width: "20rem", alignSelf: "flex-end"  */}
        <div style={{}}>
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
        </div>
        {/* chat body */}
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMesaage}
        />
      </div>
    </div>
  );
};

export default Chat;
