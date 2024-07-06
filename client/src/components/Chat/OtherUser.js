import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUser } = useSelector((store) => store.user);

  const isOnline = onlineUser?.includes(user._id);

  const selectedHandter = () => {
    dispatch(setSelectedUser(user));
  };

  return (
    <div
      onClick={selectedHandter}
      className={`p-2 ${
        selectedUser?._id === user?._id && "bg-slate-400"
      } cursor-pointer  hover:bg-slate-400 h-20   rounded-md flex items-center`}
    >
      <div className="flex gap-2 items-center  rounded-r-md  ">
        <div
          className={`avatar ${isOnline && "online"} w-12 h-12 rounded-full`}
        >
          <img
            src={user.avatar}
            alt="profile-pic"
            className="rounded-full w-12 h-12"
          />
        </div>

        <div>
          <h1 className="text-2xl  text-white font-semmibold">{user.name}</h1>
        </div>
        <div className="divider text-black"></div>
      </div>
    </div>
  );
};

export default OtherUser;
