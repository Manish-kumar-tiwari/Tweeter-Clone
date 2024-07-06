import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from "./redux/tweetSlice";
import { MdDelete } from "react-icons/md";

const Notification = () => {
  document.title = "Notifications / X"
  const [seen, setSeen] = useState(false);
  const { user } = useSelector((store) => store.user);
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  const clearHandler = async () => {
    try {
      const res = await axios.put("/api/v1/user/clearNottfication", { token });
      message.success(res.data.msg);
      dispatch(setRefresh());
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async () => {
    try {
      const res = await axios.put("/api/v1/user/deleteNotification", { token });
      message.success(res.data.msg);
      dispatch(setRefresh());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[50%] border border-gray-900">
      <div className="border-b border-gray-700 text-center p-2">
        <h1 className="text-6xl text-white font-bold">Notification</h1>
      </div>
      <div>
        <div className="flex justify-around mt-2 border-b border-gray-700">
          <div
            onClick={() => setSeen(false)}
            className={`text-white  cursor-pointer  p-4 hover:bg-gray-700 ${
              !seen && "border-b-4 border-blue-800"
            }`}
          >
            <h1 className="text-2xl">All Notification</h1>
          </div>
          <div
            onClick={() => setSeen(true)}
            className={`text-white  cursor-pointer  hover:bg-gray-700 text-lg p-4 ${
              seen && "border-b-4 border-blue-800"
            }`}
          >
            <h1 className="text-2xl">Seen Notification</h1>
          </div>
        </div>

        <div className="p-5 w-full ">
          {!seen &&
            user?.notification?.map((noti, idx) => {
              return (
                <p
                  className="text-white text-lg p-4 border border-gray-700 w-full "
                  key={idx}
                >
                  {noti}
                </p>
              );
            })}

          {seen &&
            user?.seenNotification[0]?.map((noti, idx) => {
              return (
                <p
                  className="text-white text-lg p-4 border border-gray-700 w-full flex justify-between items-center"
                  key={idx}
                >
                  {noti}
                  <MdDelete
                    color="red"
                    size={"34px"}
                    className="cursor-pointer"
                  />
                </p>
              );
            })}
          {!seen && user?.notification.length === 0 && (
            <div>
              <h1 className="text-6xl  text-white font-bold justify-center">
                Nothing to see here — yet
              </h1>
            </div>
          )}

          {seen && user?.seenNotification.length === 0 && (
            <div>
              <h1 className="text-6xl  text-white font-bold justify-center">
                Nothing to see here — yet
              </h1>
            </div>
          )}
        </div>
        <div className="flex justify-end m-2">
          {!seen && user?.notification.length !== 0 && (
            <button
              onClick={clearHandler}
              className="text-white px-5 py-2 bg-blue-700 rounded-md text-lg font-bold"
            >
              CLEAR
            </button>
          )}
          {seen && user?.seenNotification.length !== 0 && (
            <button
              onClick={deleteHandler}
              className="text-white px-5 py-2 bg-red-700 rounded-md text-lg font-bold"
            >
              DELETE
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
