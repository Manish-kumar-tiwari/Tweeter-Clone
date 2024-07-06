import React from "react";
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import { useSelector } from "react-redux";
import useGetRealTimeMessages from "../hooks/useGetRealTimeMessage";

const Messages = () => {
  useGetRealTimeMessages();
  useGetMessages();

  const { messages } = useSelector((store) => store.message);
  if (!messages) {
    return;
  }
  return (
    <div className="p-3 w-full h-[80%] overflow-auto">
      {messages &&
        messages?.map((message, idx) => {
          return <Message message={message} key={idx} />;
        })}
    </div>
  );
};

export default Messages;
