import React from "react";
import Avatar from "react-avatar";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGetProfile from "./hooks/useGetProfile";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { message } from "antd";
import { setRefresh } from "./redux/tweetSlice";
import { setOpen, setProfile, setSelectedUser } from "./redux/userSlice";
import EditProfile from "./EditProfile";
import useGetProfileTweets from "./hooks/useGetProfileTweets";
import Tweet from "./Tweet";
import { AiOutlineMessage } from "react-icons/ai";

const Profile = () => {
  
  const { open } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const { allTweets, followingTweets } = useSelector((store) => store.tweet);

  const { user } = useSelector((store) => store.user);

  useGetProfile(id);
  useGetProfileTweets(id);

  const { profile } = useSelector((store) => store.user);
  const { profileTweets } = useSelector((store) => store.tweet);

  if (!profile) {
    return;
  }

  document.title = `${profile.name} (@${profile.username}) / X`

  const goBackHandler=()=>{
    dispatch(setProfile(null))
  }

  const editProfileHandler = async () => {
    dispatch(setOpen(true));
  };

  const followHandler = async () => {
    if (user?.followings?.includes(id)) {
      try {
        const res = await axios.put(`/api/v1/user/unFollow/${id}`, { token });
        message.success(res.data.msg);
        dispatch(setRefresh());
      } catch (error) {
        message.error(error.response.data.msg);
      }
    } else {
      try {
        const res = await axios.put(`/api/v1/user/follow/${id}`, { token });
        message.success(res.data.msg);
        dispatch(setRefresh());
      } catch (error) {
        message.error(error.response.data.msg);
      }
    }
  };

  const messageHandler = () => {
    dispatch(setSelectedUser(profile));
    navigate("/chat");
  };

  return (
    <div className="w-[50%] border border-gray-900 ml-14 max-[800px]:ml-0 max-[800px]:w-[100%] ">
      <div className="flex items-center">
        <Link to={"/"} onClick={goBackHandler} className="p-2 hover:bg-gray-900 rounded-full">
          <IoMdArrowBack color="white" size={"34px"} />
        </Link>

        <div className="m-2 p-4">
          <h1 className="font-bold text-xl text-white">{profile?.name}</h1>
          <p className="text-gray-200">{`${
            allTweets.length - followingTweets.length
          } Posts`}</p>
        </div>
      </div>

      <div>
        <div className="h-80 w-full">
          <img className="h-80 w-full" src={profile?.banner} alt="banner" />
        </div>

        <div className="absolute top-80 ml-2 border-4 border-white rounded-full">
          <Avatar src={profile?.avatar} size="140" round={true} />
        </div>

        {open && <EditProfile />}

        <div className="text-right m-4 p-2">
          {user?._id === id && (
            <button
              onClick={editProfileHandler}
              className="text-lg bg-black text-white font-bold justify-end border   hover:bg-gray-900  border-white px-3 py-2 rounded-full"
            >
              Edit Profile
            </button>
          )}

          {user?._id !== id && (
            <div className="flex justify-end items-center gap-2">
              <AiOutlineMessage
                onClick={messageHandler}
                color="white"
                size={"34px"}
                className="cursor-pointer"
              />

              <button
                onClick={followHandler}
                className="text-lg bg-black text-white font-bold justify-end border   hover:bg-gray-900  border-white px-3 py-2 rounded-full"
              >
                {user?.followings?.includes(id) ? "Unfollow" : "Follow"}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="">
        <div className="ml-3 mt-2 ">
          <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
          <p className="text-gray-500 text-lg ">{`@${profile.username}`}</p>
        </div>
        <div className="flex px-4">
          <div className="flex items-center">
            <p className="text-white text-xl font-bold ">
              {profile.followings.length}
            </p>
            <Link
              to={`/followFollowing/${id}`}
              className="text-gray-500 text-xl font-bold hover:text-blue-600"
            >
              Following
            </Link>
          </div>
          <div className="flex p-4 ml-2">
            <p className="text-white text-xl font-bold ">
              {profile.followers.length}
            </p>
            <Link
              to={`/followFollowing/${id}`}
              className="text-gray-500 text-xl font-bold hover:text-blue-600"
            >
              Followers
            </Link>
          </div>
        </div>
        <div className="p-2 m-2">
          <p className="text-lg text-white">{profile?.bio}</p>
        </div>

        <div>
          <div className="border-b-4 border-gray-400 flex justify-around">
            <h1 className="text-white text-6xl font-bold">Post</h1>
          </div>

          <div>
            {profileTweets?.map((tweet, idx) => {
              return <Tweet key={idx} tweet={tweet} />;
            })}
            {profileTweets?.length === 0 && (
              <div className="flex justify-center p-6">
                <h1 className="text-6xl font-bold text-gray-700">
                  No post yet!
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
