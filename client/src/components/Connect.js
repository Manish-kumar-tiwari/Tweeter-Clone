import React from "react";
import Avatar from "react-avatar";

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const Connect = () => {
  const navigate = useNavigate();
  const { otherUsers } = useSelector((store) => store.user);
  if (!otherUsers) {
    return;
  }

  const backHandler = () => {
    navigate("/");
  };
  return (
    <div className="w-[50%]  border border-gray-900">
      <div className="border border-gray-900 rounded-xl mt-5 p-2 bg-black overflow-auto">
        <div className="p-4 flex items-center gap-3">
          <IoMdArrowBack
            onClick={backHandler}
            color="white "
            size={"60px"}
            className="p-3 cursor-pointer hover:bg-slate-900 rounded-full"
          />
          <h1 className="font-bold text-3xl text-white">Connect</h1>
        </div>

        {otherUsers?.map((user, idx) => {
          return (
            <div
              key={idx}
              className="flex  p-3 items-center justify-between my-2  w-full"
            >
              <div className="flex">
                <Avatar src={user?.avatar} size="54px" round={true} />
                <div className="ml-3">
                  <h1 className="font-bold text-2xl text-white">{user.name}</h1>
                  <p className="text-lg text-gray-300">{`@${user.username}`}</p>
                </div>
              </div>

              <div className="ml-[15%]">
                <Link className="ml-[10%]" to={`/profile/${user?._id}`}>
                  <button className="bg-white text-lg hover:bg-slate-300 font-semibold rounded-full text-black px-5 py-2">
                    Profile
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connect;
