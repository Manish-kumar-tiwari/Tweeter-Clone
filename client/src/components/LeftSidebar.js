import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { IoMdLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineMessage } from "react-icons/ai";
import { RiHome4Line } from "react-icons/ri";
import { BiSolidSearch } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import {
  setBookmarkTweets,
  setFollowerUser,
  setFollowingUser,
  setOpen,
  setOtherUsers,
  setPost,
  setProfile,
  setUser,
} from "./redux/userSlice";
import {
  setAllTweets,
  setComment,
  setFollowing,
  setFollowingTweets,
  setRefresh,
  setSingleTweets,
  setTotalTweets,
  setprofileTweets,
} from "./redux/tweetSlice";
import CreatePostDialog from "./CreatePostDialog";
import Avatar from "react-avatar";

const LeftSidebar = () => {
  const [bar, setBar] = useState("home");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post } = useSelector((store) => store.user);
  const logoutHandler = () => {
    dispatch(setUser(null));
    dispatch(setOtherUsers(null));
    dispatch(setProfile(null));
    dispatch(setBookmarkTweets(null));
    dispatch(setOpen(false));
    dispatch(setFollowingUser([]));
    dispatch(setFollowerUser([]));
    dispatch(setAllTweets([]));
    dispatch(setFollowingTweets([]));
    dispatch(setRefresh(true));
    dispatch(setFollowing(false));
    dispatch(setComment(false));
    dispatch(setSingleTweets([]));
    dispatch(setTotalTweets([]));
    dispatch(setprofileTweets([]));

    localStorage.removeItem("token");
    navigate("/login");
  };

  const postHandler = () => {
    dispatch(setPost(true));
  };
  const { user } = useSelector((store) => store.user);
  return (
    <div
      className="w-[20%] absolute left-10  mt-2"
      style={{ position: "fixed" }}
    >
      <div className="mx-2 max-[800px]:mx-1">
        <img
          width={"40px"}
          src="https://freelogopng.com/images/all_img/1690643591twitter-x-logo-png.png"
          alt="twitter-logo"
        />
      </div>

      <div className="my-4">
        <Link
          onClick={() => setBar("home")}
          to={"/"}
          className="flex items-center my-4 p-2 cursor-pointer hover:bg-gray-900 rounded-full  max-[800px]:p-1 max-[800px]:w-12"
        >
          {bar === "home" && <AiFillHome color="white" className="text-3xl" />}
          {bar !== "home" && <RiHome4Line color="white" className="text-3xl" />}
          <h1 className="text-2xl text-white font-bold ml-4 max-[800px]:hidden">
            Home
          </h1>
        </Link>

        <Link
          onClick={() => setBar("chat")}
          to={"/chat"}
          className="flex items-center my-4 p-2 cursor-pointer hover:bg-gray-900 rounded-full max-[800px]:p-1 max-[800px]:w-12"
        >
          {bar === "chat" && <AiFillHome color="white" className="text-3xl" />}
          {bar !== "chat" && (
            <AiOutlineMessage color="white" className="text-3xl" />
          )}

          <h1 className="text-2xl text-white font-bold ml-4 max-[800px]:hidden">
            Messages
          </h1>
        </Link>

        <Link
          onClick={() => setBar("explore")}
          to={"/explore"}
          className="flex items-center my-4 p-2 cursor-pointer hover:bg-gray-900 rounded-full max-[800px]:p-1 max-[800px]:w-12"
        >
          {bar === "explore" && (
            <BiSolidSearch color="white" className="text-3xl" />
          )}
          {bar !== "explore" && <IoSearch color="white" className="text-3xl" />}

          <h1 className="text-2xl text-white font-bold ml-4 max-[800px]:hidden">
            Explore
          </h1>
        </Link>

        <Link
          onClick={() => setBar("notification")}
          to={"/notification"}
          className="flex items-center my-4 p-2 cursor-pointer  hover:bg-gray-900 rounded-full max-[800px]:p-1 max-[800px]:w-12"
        >
          {bar === "notification" && (
            <IoIosNotifications color="white" className="text-3xl" />
          )}
          {bar !== "notification" && (
            <IoNotificationsOutline color="white" className="text-3xl" />
          )}

          <h1 className="text-2xl  text-white font-bold ml-4 max-[800px]:hidden">
            Notifications
          </h1>
        </Link>

        <Link
          onClick={() => setBar("profile")}
          to={`/profile/${user?._id}`}
          className="flex items-center my-4 p-2 cursor-pointer  hover:bg-gray-900 rounded-full max-[800px]:p-1 max-[800px]:w-12"
        >
          {bar === "profile" && <FaUser color="white" className="text-3xl" />}
          {bar !== "profile" && <CiUser color="white" className="text-3xl" />}

          <h1 className="text-2xl text-white font-bold ml-4 max-[800px]:hidden ">
            Profile
          </h1>
        </Link>

        <Link
          onClick={() => setBar("bookmark")}
          to={"/bookmark"}
          className="flex items-center my-4 p-2 cursor-pointer  hover:bg-gray-900 rounded-full max-[800px]:p-1 max-[800px]:w-12"
        >
          {bar === "bookmark" && (
            <FaBookmark color="white" className="text-3xl" />
          )}
          {bar !== "bookmark" && (
            <CiBookmark color="white" className="text-3xl" />
          )}

          <h1 className="text-2xl  text-white font-bold ml-4 max-[800px]:hidden ">
            BookMarks
          </h1>
        </Link>

        <div
          onClick={logoutHandler}
          className="flex items-center my-4 p-2 cursor-pointer  hover:bg-gray-900 rounded-full max-[800px]:p-1 max-[800px]:w-12"
        >
          <IoMdLogOut color="white" className="text-3xl  " />
          <h1 className="text-2xl text-white font-bold ml-4 max-[800px]:hidden ">
            Logout
          </h1>
        </div>

        <div className="max-[800px]:hidden">
          <button
            onClick={postHandler}
            className="py-3 my-2 bg-[#1D9BF0] hover:bg-[#2a353b] font-bold text-white text-xl w-full border-none 
          rounded-full"
          >
            Post
          </button>
          {post && <CreatePostDialog />}
        </div>

        <div className="relative flex cursor-pointer items-center mt-[5%] rounded-full min-[800px]:hover:bg-slate-800  ">
          <div className="p-3 max-[800px]:p-1 max-[800px]:w-5">
            <Avatar src={user?.avatar} size="54px" round={true} />
          </div>
          <div className="p-3 max-[800px]:hidden ">
            <h1 className="font-semibold text-2xl text-white">{user?.name}</h1>
            <p className="text-lg  text-gray-600">{`@${user?.username}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
