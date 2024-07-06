import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const { selectedUser, user } = useSelector((store) => store.user);
  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      {selectedUser && (
        <div ref={scroll}>
          <div
            className={`chat ${
                user?._id === message.senderId ? "chat-end" : "chat-start"
            } p-2`}
          >
            <div className="chat-image avatar">
              <div className="w-12 h-12 rounded-full">
                <img
                  alt="Profile picture"
                  className="w-12 h-12 rounded-full"
                  src={
                    message?.senderId === user._id
                      ? user?.avatar
                      : selectedUser?.avatar
                  }
                />
              </div>
            </div>
            <div className="chat-header ml-2">
              <time className="text-sm text-white opacity-50 ">12:45</time>
            </div>
            <div className="chat-bubble text-xl p-4 ">{message?.message}</div>
          </div>
        </div>
      )}

     
    </>
  );
};

export default Message;
