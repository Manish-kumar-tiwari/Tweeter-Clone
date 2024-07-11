import React from "react";
import Search from "./Search";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowRoundBack } from "react-icons/io";
import { setSelectedUser } from "../redux/userSlice";

const MessageContainer = () => {
  const { selectedUser, user, onlineUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const goBackHandler = () => {
    dispatch(setSelectedUser(null));
  };

  const isOnline = onlineUser?.includes(selectedUser?._id);

  return (
    <>
      {selectedUser && (
        <div className=" max-[800px]:w-[100%] w-[70%] h-svh max-[800px]:px-0  px-4">
          <div className="w-full px-4 py-1  max-[800px]:px-0  bg-slate-600 h-20  rounded-md flex items-center mt-7 ">
            <IoIosArrowRoundBack
              onClick={goBackHandler}
              size={"44px"}
              className="hover:bg-slate-500 rounded-full mr-2   min-[800px]:hidden"
            />

            <div className="flex gap-2 items-center  rounded-r-md  ">
              <div
                className={`avatar ${
                  isOnline && "online"
                }  w-12 h-12 rounded-full `}
              >
                <img
                  src={selectedUser?.avatar}
                  alt="profile-pic"
                  className="w-12 h-12 rounded-full"
                />
              </div>

              <div>
                <h1 className="text-2xl text-white font-semmibold">
                  {selectedUser?.name}
                </h1>
              </div>
            </div>

            <div className="divider text-black"></div>
          </div>

          <Messages />
          <div className="max-[800px]:w-[100%] max-[800px]:ml-0 absolute w-[65%] bottom-1 ml-8">
            <Search />
          </div>
        </div>
      )}
      {!selectedUser && (
        <div className="flex max-[800px]:hidden flex-col justify-center items-center w-full">
          <h1 className="font-bold text-6xl text-white">Hii, {user?.name}</h1>
          <h1 className="text-3xl font-semibold text-gray-500">
            Let's start Conversation
          </h1>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
