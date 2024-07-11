import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChatHomepage = () => {
  document.title = "Message / X"
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  useGetOtherUsers();

  return (
    <div className="w-full h-svh flex items-center justify-center">
      <div className="flex  w-[100%]  bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 p-3 max-[800px]:p-1 px-5 ">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};

export default ChatHomepage;
