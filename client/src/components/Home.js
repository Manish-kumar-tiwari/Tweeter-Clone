import React, { useEffect } from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import useGetOtherUsers from "./hooks/useGetOtherUsers";
import useGetUser from "./hooks/useGetUser";
import useGetAllTweets from "./hooks/useGetAllTweets";
import useGetFollowingTweets from "./hooks/useGetFollowingTweets";

const Home = () => {
  document.title = "Home / X";
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  });
  useGetUser();
  useGetOtherUsers();
  useGetAllTweets();
  useGetFollowingTweets();

  return (
    <div className="w-[90%] max-[800px]:w-[100%] h-[90%] mx-auto flex justify-center max-[800px]:p-0 p-4">
    
        <LeftSidebar />
     
        <Outlet />
      
      <div className="max-[800px]:hidden ">
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;
